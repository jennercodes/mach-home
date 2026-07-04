import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  createContentPageStep,
  CreateContentPageStepInput,
} from "./steps/create-content-page"

export const createContentPageWorkflow = createWorkflow(
  "create-content-page",
  function (input: CreateContentPageStepInput) {
    const page = createContentPageStep(input)

    return new WorkflowResponse(page)
  }
)
