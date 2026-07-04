import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { deleteContentPageWorkflow } from "../../../../workflows/delete-content-page"
import { updateContentPageWorkflow } from "../../../../workflows/update-content-page"
import { CMS_MODULE } from "../../../../modules/cms"
import CmsModuleService from "../../../../modules/cms/service"
import { UpdateContentPageSchema } from "../middlewares"

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const cmsService: CmsModuleService = req.scope.resolve(CMS_MODULE)

  const page = await cmsService.retrieveContentPage(req.params.id)

  res.json({ content_page: page })
}

export async function POST(
  req: AuthenticatedMedusaRequest<UpdateContentPageSchema>,
  res: MedusaResponse
) {
  const { result } = await updateContentPageWorkflow(req.scope).run({
    input: { id: req.params.id, ...req.validatedBody },
  })

  res.json({ content_page: result })
}

export async function DELETE(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  await deleteContentPageWorkflow(req.scope).run({
    input: req.params.id,
  })

  res.json({ id: req.params.id, object: "content_page", deleted: true })
}
