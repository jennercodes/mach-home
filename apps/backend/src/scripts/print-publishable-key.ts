import { ExecArgs } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

/**
 * Prints the storefront publishable key on its own line, so a deploy script can
 * read it and wire it into the storefront build.
 *
 * Run with: npx medusa exec ./src/scripts/print-publishable-key.ts
 */
export default async function printPublishableKey({ container }: ExecArgs) {
  const apiKeyModule = container.resolve(Modules.API_KEY)
  const [key] = await apiKeyModule.listApiKeys(
    { type: "publishable" },
    { select: ["token"], take: 1 }
  )
  if (key) {
    // eslint-disable-next-line no-console
    console.log(key.token)
  }
}
