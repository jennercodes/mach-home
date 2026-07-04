import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createContentPageWorkflow } from "../../../workflows/create-content-page"
import { CMS_MODULE } from "../../../modules/cms"
import CmsModuleService from "../../../modules/cms/service"
import { CreateContentPageSchema } from "./middlewares"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const [pages, count] = await cmsService.listAndCountContentPages(
    {},
    { order: { slug: "ASC" } }
  )

  res.json({ content_pages: pages, count })
}

export async function POST(
  req: AuthenticatedMedusaRequest<CreateContentPageSchema>,
  res: MedusaResponse
) {
  const { result } = await createContentPageWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.status(201).json({ content_page: result })
}
