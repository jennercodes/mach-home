import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { deleteContentPageStep } from "./steps/delete-content-page"

export const deleteContentPageWorkflow = createWorkflow(
  "delete-content-page",
  function (id: string) {
    const deleted = deleteContentPageStep(id)

    return new WorkflowResponse(deleted)
  }
)
