"use server"

import { sdk } from "@lib/config"
import { getCacheOptions } from "./cookies"

/**
 * Editable site sections managed from the admin (CMS module).
 * Consumers pass a fallback (the static brand config) so the storefront
 * keeps working if the backend is unreachable or a section is missing.
 */
const getSiteSections = async (): Promise<Record<string, unknown>> => {
  const next = {
    ...(await getCacheOptions("site")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<{ site_sections: { key: string; value: unknown }[] }>(
      "/store/site-sections",
      {
        method: "GET",
        next,
      }
    )
    .then(({ site_sections }) =>
      Object.fromEntries(site_sections.map((s) => [s.key, s.value]))
    )
    .catch(() => ({}))
}

export const getSection = async <T>(key: string, fallback: T): Promise<T> => {
  const sections = await getSiteSections()
  return (sections[key] as T) ?? fallback
}
