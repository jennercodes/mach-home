import { model } from "@medusajs/framework/utils"

/**
 * Key-value store for editable storefront sections (hero, marquee, footer,
 * brand assets, etc.). The value shape per key is validated in the
 * upsert workflow against the schemas in workflows/steps/site-section-schemas.
 */
const SiteSection = model.define("site_section", {
  id: model.id().primaryKey(),
  key: model.text().unique(),
  value: model.json(),
})

export default SiteSection
