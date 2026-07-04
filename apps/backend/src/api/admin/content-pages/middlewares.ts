import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework"
import { z } from "zod"

const ProseBlockSchema = z.object({
  type: z.literal("prose"),
  heading: z.string().optional(),
  paragraphs: z.array(z.string()),
})

const FaqBlockSchema = z.object({
  type: z.literal("faq"),
  items: z.array(z.object({ q: z.string(), a: z.string() })),
})

const ContactBlockSchema = z.object({
  type: z.literal("contact"),
  channels: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      href: z.string().optional(),
      note: z.string().optional(),
    })
  ),
})

const StoresBlockSchema = z.object({
  type: z.literal("stores"),
  stores: z.array(
    z.object({
      name: z.string(),
      address: z.string(),
      hours: z.string(),
    })
  ),
})

const TableBlockSchema = z.object({
  type: z.literal("table"),
  heading: z.string().optional(),
  caption: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
})

export const ContentBlockSchema = z.discriminatedUnion("type", [
  ProseBlockSchema,
  FaqBlockSchema,
  ContactBlockSchema,
  StoresBlockSchema,
  TableBlockSchema,
])

export const CreateContentPageSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "El slug solo puede tener minúsculas, números y guiones"),
  title: z.string().min(1),
  title_em: z.string().nullish(),
  eyebrow: z.string().min(1),
  intro: z.string().nullish(),
  description: z.string().min(1),
  blocks: z.array(ContentBlockSchema),
  published: z.boolean().optional(),
})

export const UpdateContentPageSchema = CreateContentPageSchema.partial()

export type CreateContentPageSchema = z.infer<typeof CreateContentPageSchema>
export type UpdateContentPageSchema = z.infer<typeof UpdateContentPageSchema>

export const contentPagesMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/content-pages",
    method: "POST",
    middlewares: [validateAndTransformBody(CreateContentPageSchema)],
  },
  {
    matcher: "/admin/content-pages/:id",
    method: "POST",
    middlewares: [validateAndTransformBody(UpdateContentPageSchema)],
  },
]
