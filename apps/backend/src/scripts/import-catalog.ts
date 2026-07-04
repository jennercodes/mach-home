import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { CATALOG } from "./data/catalog"

/**
 * Creates the MACH HOME catalog (14 designs, one "Tamaño" option with a variant
 * per plaza) from the typed catalog data. Prices in PEN (and USD when present),
 * images already hosted on Cloudflare R2. Idempotent: skips handles that exist.
 *
 * Run with: npx medusa exec ./src/scripts/import-catalog.ts
 */
export default async function importCatalog({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const salesChannelModule = container.resolve(Modules.SALES_CHANNEL)

  const [salesChannel] =
    (await salesChannelModule.listSalesChannels(
      { name: "MACH HOME" },
      { select: ["id"], take: 1 }
    )) ?? []
  const fallbackChannel = salesChannel
    ? undefined
    : (await salesChannelModule.listSalesChannels({}, { take: 1 }))[0]
  const channel = salesChannel ?? fallbackChannel
  if (!channel) {
    logger.error("No sales channel found — run migrations first")
    return
  }

  const { data: shippingProfiles } = await query.graph({
    entity: "shipping_profile",
    fields: ["id"],
  })
  const shippingProfileId = shippingProfiles[0]?.id

  const { data: existing } = await query.graph({
    entity: "product",
    fields: ["handle"],
  })
  const existingHandles = new Set(existing.map((p) => p.handle))

  const toCreate = CATALOG.filter((p) => !existingHandles.has(p.handle))
  if (!toCreate.length) {
    logger.info("Catalog already imported, skipping")
    return
  }

  const products = toCreate.map((p) => ({
    title: p.title ?? p.handle,
    subtitle: p.subtitle,
    handle: p.handle,
    description: p.description,
    status: "published" as const,
    thumbnail: p.thumbnail ?? p.images[0],
    material: p.material,
    weight: p.weight,
    discountable: true,
    images: p.images.map((url) => ({ url })),
    shipping_profile_id: shippingProfileId,
    sales_channels: [{ id: channel.id }],
    options: [
      {
        title: p.optionTitle,
        values: p.variants.map((v) => v.optionValue),
      },
    ],
    variants: p.variants.map((v) => ({
      title: v.title,
      sku: v.sku,
      manage_inventory: true,
      allow_backorder: false,
      weight: v.weight,
      options: { [p.optionTitle]: v.optionValue },
      prices: [
        ...(v.pricePen != null
          ? [{ amount: v.pricePen, currency_code: "pen" }]
          : []),
        ...(v.priceUsd != null
          ? [{ amount: v.priceUsd, currency_code: "usd" }]
          : []),
      ],
    })),
  }))

  await createProductsWorkflow(container).run({ input: { products } })

  logger.info(
    `Imported ${products.length} products (${products.reduce(
      (n, p) => n + p.variants.length,
      0
    )} variants) ✔`
  )
}
