import { MedusaService } from "@medusajs/framework/utils"
import ContentPage from "./models/content-page"
import SiteSection from "./models/site-section"

class CmsModuleService extends MedusaService({
  ContentPage,
  SiteSection,
}) {}

export default CmsModuleService
