import { z } from "zod"

/**
 * Value shape per site section key. Shapes mirror the storefront's
 * brand config so the frontend consumes them without mapping.
 */
export const SITE_SECTION_SCHEMAS: Record<string, z.ZodTypeAny> = {
  topbar: z.object({
    text: z.string().min(1),
  }),
  brand: z.object({
    logoUrl: z.string().nullable(),
    logoLightUrl: z.string().nullable(),
  }),
  hero: z.object({
    eyebrow: z.string(),
    titleStart: z.string(),
    titleEm: z.string(),
    titleEnd: z.string(),
    text: z.string(),
    cta: z.string(),
    href: z.string(),
    image: z.string(),
  }),
  marquee: z.object({
    items: z.array(z.string().min(1)).min(1),
  }),
  editorial: z.object({
    eyebrow: z.string(),
    titleStart: z.string(),
    titleEm: z.string(),
    titleEnd: z.string(),
    text: z.string(),
    cta: z.string(),
    href: z.string(),
    image: z.string(),
  }),
  sale_banner: z.object({
    eyebrow: z.string(),
    titleStart: z.string(),
    titleEm: z.string(),
    subtitle: z.string(),
    cta: z.string(),
    href: z.string(),
  }),
  social: z.object({
    eyebrow: z.string(),
    handle: z.string(),
    images: z.array(z.string()),
  }),
  footer: z.object({
    blurb: z.string(),
    newsletterTitle: z.string(),
    newsletterText: z.string(),
    payments: z.array(z.string()),
  }),
}

export const SITE_SECTION_KEYS = Object.keys(SITE_SECTION_SCHEMAS)
