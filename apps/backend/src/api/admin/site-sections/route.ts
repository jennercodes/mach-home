import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { CMS_MODULE } from "../../../modules/cms"
import CmsModuleService from "../../../modules/cms/service"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const sections = await cmsService.listSiteSections(
    {},
    { order: { key: "ASC" } }
  )

  res.json({ site_sections: sections })
}
