import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import {
  createCollectionsWorkflow,
  createProductCategoriesWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows"

/**
 * Seeds the MACH HOME category tree and home-page collections, and assigns
 * the imported products to them. Idempotent: skips anything that already exists.
 *
 * Run with: npx medusa exec ./src/scripts/seed-taxonomy.ts
 */
export default async function seedTaxonomy({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const productModule = container.resolve(Modules.PRODUCT)

  const categoriesToCreate = [
    { name: "Ropa de Cama", handle: "ropa-de-cama", description: "Sábanas · Edredones · Fundas" },
    { name: "Pack", handle: "pack", description: "Plumón + Funda" },
    { name: "Deco", handle: "deco", description: "Cojines · Mantas" },
    { name: "Baño", handle: "bano", description: "Toallas · Albornoces" },
    { name: "Sale", handle: "sale", description: "Hasta -40%" },
  ]

  const existingCategories = await productModule.listProductCategories(
    { handle: categoriesToCreate.map((c) => c.handle) },
    { select: ["id", "handle"] }
  )
  const existingHandles = new Set(existingCategories.map((c) => c.handle))
  const missingCategories = categoriesToCreate.filter(
    (c) => !existingHandles.has(c.handle)
  )

  if (missingCategories.length) {
    await createProductCategoriesWorkflow(container).run({
      input: {
        product_categories: missingCategories.map((c) => ({
          ...c,
          is_active: true,
        })),
      },
    })
    logger.info(`Created ${missingCategories.length} categories`)
  } else {
    logger.info("Categories already exist, skipping")
  }

  const collectionsToCreate = [
    { title: "Best Sellers", handle: "best-sellers" },
    { title: "Nueva Colección", handle: "nueva-coleccion" },
  ]

  const existingCollections = await productModule.listProductCollections(
    { handle: collectionsToCreate.map((c) => c.handle) },
    { select: ["id", "handle"] }
  )
  const existingCollectionHandles = new Set(
    existingCollections.map((c) => c.handle)
  )
  const missingCollections = collectionsToCreate.filter(
    (c) => !existingCollectionHandles.has(c.handle)
  )

  if (missingCollections.length) {
    await createCollectionsWorkflow(container).run({
      input: { collections: missingCollections },
    })
    logger.info(`Created ${missingCollections.length} collections`)
  } else {
    logger.info("Collections already exist, skipping")
  }

  // Re-read for ids
  const [ropaDeCama] = await productModule.listProductCategories(
    { handle: "ropa-de-cama" },
    { select: ["id"] }
  )
  const [bestSellers] = await productModule.listProductCollections(
    { handle: "best-sellers" },
    { select: ["id"] }
  )
  const [nuevaColeccion] = await productModule.listProductCollections(
    { handle: "nueva-coleccion" },
    { select: ["id"] }
  )

  const products = await productModule.listProducts(
    {},
    { select: ["id", "title", "created_at"], take: 200 }
  )
  logger.info(`Assigning ${products.length} products`)

  const sorted = [...products].sort(
    (a, b) =>
      new Date(b.created_at as any).getTime() -
      new Date(a.created_at as any).getTime()
  )
  const newestIds = new Set(sorted.slice(0, 8).map((p) => p.id))
  const bestSellerIds = new Set(sorted.slice(8, 16).map((p) => p.id))

  await updateProductsWorkflow(container).run({
    input: {
      products: products.map((p) => ({
        id: p.id,
        category_ids: [ropaDeCama.id],
        collection_id: newestIds.has(p.id)
          ? nuevaColeccion.id
          : bestSellerIds.has(p.id)
            ? bestSellers.id
            : undefined,
      })),
    },
  })

  logger.info("Taxonomy seeded ✔")
}
