import { MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CMS_MODULE } from "../../modules/cms"
import CmsModuleService from "../../modules/cms/service"

export type CreateContentPageStepInput = {
  slug: string
  title: string
  title_em?: string | null
  eyebrow: string
  intro?: string | null
  description: string
  blocks: unknown[]
  published?: boolean
}

export const createContentPageStep = createStep(
  "create-content-page",
  async (input: CreateContentPageStepInput, { container }) => {
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)

    const existing = await cmsService.listContentPages({ slug: input.slug })
    if (existing.length) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Ya existe una página con el slug "${input.slug}"`
      )
    }

    const page = await cmsService.createContentPages({
      ...input,
      blocks: input.blocks as unknown as Record<string, unknown>,
    })

    return new StepResponse(page, page.id)
  },
  async (pageId, { container }) => {
    if (!pageId) {
      return
    }
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)
    await cmsService.deleteContentPages(pageId)
  }
)
