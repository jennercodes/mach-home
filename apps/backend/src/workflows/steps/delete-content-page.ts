import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CMS_MODULE } from "../../modules/cms"
import CmsModuleService from "../../modules/cms/service"

export const deleteContentPageStep = createStep(
  "delete-content-page",
  async (id: string, { container }) => {
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)

    await cmsService.softDeleteContentPages(id)

    return new StepResponse(id, id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)
    await cmsService.restoreContentPages(id)
  }
)
