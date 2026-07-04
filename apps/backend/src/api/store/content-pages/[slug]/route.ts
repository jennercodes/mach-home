import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { CMS_MODULE } from "../../../../modules/cms"
import CmsModuleService from "../../../../modules/cms/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const [page] = await cmsService.listContentPages({
    slug: req.params.slug,
    published: true,
  })

  if (!page) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Content page "${req.params.slug}" not found`
    )
  }

  res.json({ content_page: page })
}
