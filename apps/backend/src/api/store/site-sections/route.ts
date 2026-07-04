import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CMS_MODULE } from "../../../modules/cms"
import CmsModuleService from "../../../modules/cms/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const sections = await cmsService.listSiteSections(
    {},
    { select: ["key", "value"] }
  )

  res.json({ site_sections: sections })
}
