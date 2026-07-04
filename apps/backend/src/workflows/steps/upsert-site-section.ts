import { MedusaError } from "@medusajs/framework/utils"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { CMS_MODULE } from "../../modules/cms"
import CmsModuleService from "../../modules/cms/service"
import { SITE_SECTION_SCHEMAS } from "./site-section-schemas"

export type UpsertSiteSectionStepInput = {
  key: string
  value: unknown
}

type Compensation =
  | { action: "delete"; id: string }
  | { action: "restore"; id: string; value: unknown }

export const upsertSiteSectionStep = createStep(
  "upsert-site-section",
  async (input: UpsertSiteSectionStepInput, { container }) => {
    const schema = SITE_SECTION_SCHEMAS[input.key]
    if (!schema) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Sección desconocida: "${input.key}"`
      )
    }

    const parsed = schema.safeParse(input.value)
    if (!parsed.success) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Contenido inválido para "${input.key}": ${parsed.error.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; ")}`
      )
    }

    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)
    const [existing] = await cmsService.listSiteSections({ key: input.key })

    if (existing) {
      const section = await cmsService.updateSiteSections({
        id: existing.id,
        value: parsed.data as Record<string, unknown>,
      })
      return new StepResponse(section, {
        action: "restore",
        id: existing.id,
        value: existing.value,
      } satisfies Compensation)
    }

    const section = await cmsService.createSiteSections({
      key: input.key,
      value: parsed.data as Record<string, unknown>,
    })
    return new StepResponse(section, {
      action: "delete",
      id: section.id,
    } satisfies Compensation)
  },
  async (compensation: Compensation | undefined, { container }) => {
    if (!compensation) {
      return
    }
    const cmsService: CmsModuleService = container.resolve(CMS_MODULE)
    if (compensation.action === "delete") {
      await cmsService.deleteSiteSections(compensation.id)
    } else {
      await cmsService.updateSiteSections({
        id: compensation.id,
        value: compensation.value as Record<string, unknown>,
      })
    }
  }
)
