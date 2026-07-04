import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"

/**
 * Assigns the default shipping profile to every product missing one
 * (the CSV import left "Shipping Profile Id" empty).
 *
 * Run with: npx medusa exec ./src/scripts/seed-shipping-profile.ts
 */
export default async function seedShippingProfile({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const fulfillmentModule = container.resolve(Modules.FULFILLMENT)
  const productModule = container.resolve(Modules.PRODUCT)

  const profiles = await fulfillmentModule.listShippingProfiles({}, { take: 5 })
  if (!profiles.length) {
    logger.error("No shipping profile found")
    return
  }
  const profile =
    profiles.find((p) => p.type === "default") ?? profiles[0]

  const products = await productModule.listProducts(
    {},
    { select: ["id"], take: 500 }
  )

  await updateProductsWorkflow(container).run({
    input: {
      products: products.map((p) => ({
        id: p.id,
        shipping_profile_id: profile.id,
      })),
    },
  })

  logger.info(
    `Assigned shipping profile ${profile.name} to ${products.length} products ✔`
  )
}
