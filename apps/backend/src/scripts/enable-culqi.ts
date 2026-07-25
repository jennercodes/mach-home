import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { updateRegionsWorkflow } from "@medusajs/medusa/core-flows"

const CULQI_PROVIDER_ID = "pp_culqi_culqi"

/**
 * Enables the Culqi payment provider on every existing region. New installs get
 * it from the seed (initial-data-seed.ts); this script backfills a database that
 * was seeded before Culqi was added.
 *
 * Run with: npx medusa exec ./src/scripts/enable-culqi.ts
 */
export default async function enableCulqi({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "payment_providers.id"],
  })

  if (!regions.length) {
    logger.warn("No hay regiones. Corre el seed primero (medusa db:migrate).")
    return
  }

  for (const region of regions) {
    const current: string[] = (
      (region.payment_providers ?? []) as Array<{ id: string } | null>
    )
      .filter((p): p is { id: string } => !!p)
      .map((p) => p.id)

    if (current.includes(CULQI_PROVIDER_ID)) {
      logger.info(`Culqi ya está habilitado en la región "${region.name}".`)
      continue
    }

    // setRegionsPaymentProvidersStep replaces the list, so include the existing
    // providers alongside Culqi.
    const providers = Array.from(new Set([...current, CULQI_PROVIDER_ID]))

    await updateRegionsWorkflow(container).run({
      input: {
        selector: { id: region.id },
        update: { payment_providers: providers },
      },
    })

    logger.info(`Culqi habilitado en la región "${region.name}".`)
  }
}
