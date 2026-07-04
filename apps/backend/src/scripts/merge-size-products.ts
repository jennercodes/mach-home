import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
  deleteProductsWorkflow,
} from "@medusajs/medusa/core-flows"
import * as fs from "fs"
import * as path from "path"

/**
 * Merges the size-per-product catalog (one product per plaza) into one
 * product per design with a "Tamaño" option and one variant per size.
 *
 * - Groups products by handle minus the size token (…-2plz-…, …-queen-…).
 * - Writes a JSON backup of every product it touches before deleting.
 * - Releases inventory reservations (test orders) so SKUs can be reused.
 * - Recovers groups left half-migrated from previous backups.
 *
 * Run with: npx medusa exec ./src/scripts/merge-size-products.ts
 */

const SIZE_TOKEN = /-(1-5plz|2plz|1plz|queen|king)/
const SIZE_ORDER = ["1 plaza", "1.5 plz", "2 plz", "Queen", "King"]

type Member = Record<string, any>

const sizeRank = (title: string) => {
  const i = SIZE_ORDER.findIndex(
    (s) => s.toLowerCase() === title.trim().toLowerCase()
  )
  return i === -1 ? 99 : i
}

export default async function mergeSizeProducts({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const inventoryModule = container.resolve(Modules.INVENTORY)
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)

  /** Releases reservations (from test orders) held on the given SKUs. */
  const releaseReservations = async (skus: string[]) => {
    if (!skus.length) {
      return
    }
    const items = await inventoryModule.listInventoryItems(
      { sku: skus },
      { select: ["id"] }
    )
    if (!items.length) {
      return
    }
    const reservations = await inventoryModule.listReservationItems(
      { inventory_item_id: items.map((i) => i.id) },
      { select: ["id"] }
    )
    if (reservations.length) {
      await inventoryModule.deleteReservationItems(
        reservations.map((r) => r.id)
      )
      logger.info(`  liberadas ${reservations.length} reservaciones`)
    }
  }

  /** Deletes orphaned inventory items holding the given SKUs. */
  const freeSkus = async (skus: string[]) => {
    if (!skus.length) {
      return
    }
    await releaseReservations(skus)
    const orphans = await inventoryModule.listInventoryItems(
      { sku: skus },
      { select: ["id"] }
    )
    if (orphans.length) {
      await inventoryModule.deleteInventoryItems(orphans.map((o) => o.id))
    }
  }

  const createConsolidated = async (cleanHandle: string, group: Member[]) => {
    const members = [...group].sort(
      (a, b) =>
        sizeRank(a.variants?.[0]?.title ?? "") -
        sizeRank(b.variants?.[0]?.title ?? "")
    )
    const base = members[0]
    const sizes = members.map((m) => m.variants[0].title as string)

    const images = [...(base.images ?? [])]
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
      .map((i) => ({ url: i.url as string }))

    await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: base.title,
            subtitle: base.subtitle ?? undefined,
            handle: cleanHandle,
            description: base.description ?? undefined,
            status: "published" as const,
            thumbnail: base.thumbnail ?? undefined,
            material: base.material ?? undefined,
            origin_country: base.origin_country ?? undefined,
            discountable: base.discountable ?? true,
            collection_id: base.collection_id ?? undefined,
            type_id: base.type_id ?? undefined,
            metadata: base.metadata ?? undefined,
            images,
            category_ids: (base.categories ?? []).map((c: Member) => c.id),
            sales_channels: (base.sales_channels ?? []).map((s: Member) => ({
              id: s.id,
            })),
            shipping_profile_id: base.shipping_profile?.id,
            options: [{ title: "Tamaño", values: sizes }],
            variants: members.map((m) => {
              const variant = m.variants[0]
              return {
                title: variant.title,
                sku: variant.sku ?? undefined,
                barcode: variant.barcode ?? undefined,
                manage_inventory: variant.manage_inventory ?? true,
                allow_backorder: variant.allow_backorder ?? false,
                // per-size dimensions lived at product level in the old catalog
                weight: m.weight ?? undefined,
                length: m.length ?? undefined,
                width: m.width ?? undefined,
                height: m.height ?? undefined,
                options: { Tamaño: variant.title },
                prices: (variant.prices ?? []).map((p: Member) => ({
                  amount: p.amount,
                  currency_code: p.currency_code,
                })),
              }
            }),
          },
        ],
      },
    })

    return sizes
  }

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "subtitle",
      "handle",
      "description",
      "status",
      "thumbnail",
      "material",
      "origin_country",
      "weight",
      "length",
      "width",
      "height",
      "metadata",
      "discountable",
      "collection_id",
      "type_id",
      "images.url",
      "images.rank",
      "categories.id",
      "sales_channels.id",
      "shipping_profile.id",
      "variants.id",
      "variants.title",
      "variants.sku",
      "variants.barcode",
      "variants.manage_inventory",
      "variants.allow_backorder",
      "variants.prices.amount",
      "variants.prices.currency_code",
    ],
  })

  const existingHandles = new Set(products.map((p) => p.handle))

  // 1. Recover groups deleted by a previous half-finished run (from backups)
  const backupFiles = fs
    .readdirSync(process.cwd())
    .filter((f) => /^merge-backup-\d+\.json$/.test(f))
    .sort()
  for (const file of backupFiles) {
    const backup: Record<string, Member[]> = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), file), "utf8")
    )
    for (const [cleanHandle, group] of Object.entries(backup)) {
      const anyAlive =
        existingHandles.has(cleanHandle) ||
        group.some((m) => existingHandles.has(m.handle))
      if (anyAlive) {
        continue
      }
      const skus = group
        .map((m) => m.variants?.[0]?.sku)
        .filter((s): s is string => !!s)
      await freeSkus(skus)
      const sizes = await createConsolidated(cleanHandle, group)
      existingHandles.add(cleanHandle)
      logger.info(
        `↻ recuperado de backup ${cleanHandle}: [${sizes.join(", ")}]`
      )
    }
  }

  // 2. Merge the remaining per-size groups
  const groups = new Map<string, Member[]>()
  for (const product of products) {
    const key = product.handle!.replace(SIZE_TOKEN, "")
    if (!groups.has(key)) {
      groups.set(key, [])
    }
    groups.get(key)!.push(product)
  }
  const mergeGroups = [...groups.entries()].filter(([, g]) => g.length > 1)

  if (mergeGroups.length) {
    const backupPath = path.join(
      process.cwd(),
      `merge-backup-${Date.now()}.json`
    )
    fs.writeFileSync(
      backupPath,
      JSON.stringify(Object.fromEntries(mergeGroups), null, 2)
    )
    logger.info(`Backup escrito en ${backupPath}`)
  }

  for (const [cleanHandle, group] of mergeGroups) {
    const skus = group
      .map((m) => m.variants?.[0]?.sku)
      .filter((s): s is string => !!s)

    // release reservations first: deleteProductsWorkflow removes the
    // variants' inventory items and fails if any of them has reservations
    await releaseReservations(skus)
    await deleteProductsWorkflow(container).run({
      input: { ids: group.map((m) => m.id) },
    })
    await freeSkus(skus)
    const sizes = await createConsolidated(cleanHandle, group)
    logger.info(
      `✔ ${cleanHandle}: ${group.length} productos → 1 con tallas [${sizes.join(", ")}]`
    )
  }

  // 3. Stock for the new variants' inventory items
  const [location] = await stockLocationModule.listStockLocations(
    {},
    { take: 1 }
  )
  if (location) {
    const { data: items } = await query.graph({
      entity: "inventory_item",
      fields: ["id", "location_levels.location_id"],
    })
    const missing = items.filter(
      (item) =>
        !item.location_levels?.some((l: Member) => l.location_id === location.id)
    )
    if (missing.length) {
      await createInventoryLevelsWorkflow(container).run({
        input: {
          inventory_levels: missing.map((item) => ({
            inventory_item_id: item.id,
            location_id: location.id,
            stocked_quantity: 25,
          })),
        },
      })
      logger.info(`Inventario creado para ${missing.length} variantes`)
    }
  }

  logger.info("Fusión completa ✔")
}
