import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  upsertSiteSectionStep,
  UpsertSiteSectionStepInput,
} from "./steps/upsert-site-section"

export const upsertSiteSectionWorkflow = createWorkflow(
  "upsert-site-section",
  function (input: UpsertSiteSectionStepInput) {
    const section = upsertSiteSectionStep(input)

    return new WorkflowResponse(section)
  }
)
