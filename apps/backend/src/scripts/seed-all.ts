import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"
import importCatalog from "./import-catalog"
import seedTaxonomy from "./seed-taxonomy"
import seedShippingProfile from "./seed-shipping-profile"
import seedInventory from "./seed-inventory"
import seedContentPages from "./seed-content-pages"
import seedSiteSections from "./seed-site-sections"

/**
 * One-shot, idempotent content seed for a fresh database. Recreates the full
 * MACH HOME catalog and CMS from the repo — no dump / DBngin needed.
 *
 * The store base (region, channel, publishable key, shipping) is seeded by the
 * migration script src/migration-scripts/initial-data-seed.ts on db:migrate.
 *
 * Run with: npx medusa exec ./src/scripts/seed-all.ts
 */
export default async function seedAll(args: ExecArgs) {
  const { container } = args
  const logger = container.resolve("logger")

  logger.info("── seed-all: catalog ──")
  await importCatalog(args)
  logger.info("── seed-all: taxonomy ──")
  await seedTaxonomy(args)
  logger.info("── seed-all: shipping profile ──")
  await seedShippingProfile(args)
  logger.info("── seed-all: inventory ──")
  await seedInventory(args)
  logger.info("── seed-all: content pages ──")
  await seedContentPages(args)
  logger.info("── seed-all: site sections ──")
  await seedSiteSections(args)

  const apiKeyModule = container.resolve(Modules.API_KEY)
  const [key] = await apiKeyModule.listApiKeys(
    { type: "publishable" },
    { select: ["token"], take: 1 }
  )
  logger.info("── seed-all: done ✔ ──")
  if (key) {
    logger.info(`PUBLISHABLE_KEY=${key.token}`)
  }
}
