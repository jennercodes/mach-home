import { MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CMS_MODULE } from "../../modules/cms"
import CmsModuleService from "../../modules/cms/service"

export type UpdateContentPageStepInput = {
  id: string
  slug?: string
  title?: string
  title_em?: string | null
  eyebrow?: string
  intro?: string | null
  description?: string
  blocks?: unknown[]
  published?: boolean
}

export const updateContentPageStep = createStep(
  "update-content-page",
  async (input: UpdateContentPageStepInput, { container }) => {
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)

    const previous = await cmsService.retrieveContentPage(input.id)

    if (input.slug && input.slug !== previous.slug) {
      const existing = await cmsService.listContentPages({ slug: input.slug })
      if (existing.length) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Ya existe una página con el slug "${input.slug}"`
        )
      }
    }

    const { blocks, ...rest } = input
    const page = await cmsService.updateContentPages({
      ...rest,
      ...(blocks !== undefined
        ? { blocks: blocks as unknown as Record<string, unknown> }
        : {}),
    })

    return new StepResponse(page, previous)
  },
  async (previous, { container }) => {
    if (!previous) {
      return
    }
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)
    await cmsService.updateContentPages({
      id: previous.id,
      slug: previous.slug,
      title: previous.title,
      title_em: previous.title_em,
      eyebrow: previous.eyebrow,
      intro: previous.intro,
      description: previous.description,
      blocks: previous.blocks,
      published: previous.published,
    })
  }
)
