import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { createInventoryLevelsWorkflow } from "@medusajs/medusa/core-flows"

/**
 * Gives every inventory item stock (25 units) at the first stock location,
 * so the storefront can be exercised end-to-end in dev.
 *
 * Run with: npx medusa exec ./src/scripts/seed-inventory.ts
 */
export default async function seedInventory({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const stockLocationModule = container.resolve(Modules.STOCK_LOCATION)

  const locations = await stockLocationModule.listStockLocations({}, { take: 1 })
  if (!locations.length) {
    logger.error("No stock location found — create one in the admin first")
    return
  }
  const locationId = locations[0].id

  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id", "location_levels.location_id"],
  })

  const missing = inventoryItems.filter(
    (item: any) =>
      !item.location_levels?.some((l: any) => l.location_id === locationId)
  )

  if (!missing.length) {
    logger.info("All inventory items already have levels at the location")
    return
  }

  await createInventoryLevelsWorkflow(container).run({
    input: {
      inventory_levels: missing.map((item: any) => ({
        inventory_item_id: item.id,
        location_id: locationId,
        stocked_quantity: 25,
      })),
    },
  })

  logger.info(`Created ${missing.length} inventory levels at ${locationId} ✔`)
}
