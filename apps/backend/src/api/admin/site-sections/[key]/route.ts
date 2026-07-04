import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { upsertSiteSectionWorkflow } from "../../../../workflows/upsert-site-section"
import { UpsertSiteSectionSchema } from "../middlewares"

export async function POST(
  req: AuthenticatedMedusaRequest<UpsertSiteSectionSchema>,
  res: MedusaResponse
) {
  const { result } = await upsertSiteSectionWorkflow(req.scope).run({
    input: { key: req.params.key, value: req.validatedBody.value },
  })

  res.json({ site_section: result })
}
