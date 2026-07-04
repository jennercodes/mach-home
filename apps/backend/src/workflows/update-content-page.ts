import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  updateContentPageStep,
  UpdateContentPageStepInput,
} from "./steps/update-content-page"

export const updateContentPageWorkflow = createWorkflow(
  "update-content-page",
  function (input: UpdateContentPageStepInput) {
    const page = updateContentPageStep(input)

    return new WorkflowResponse(page)
  }
)
