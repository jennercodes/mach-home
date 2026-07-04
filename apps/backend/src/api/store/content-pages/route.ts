import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { CMS_MODULE } from "../../../modules/cms"
import CmsModuleService from "../../../modules/cms/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const pages = await cmsService.listContentPages(
    { published: true },
    { select: ["slug", "title", "title_em", "description"] }
  )

  res.json({ content_pages: pages })
}
