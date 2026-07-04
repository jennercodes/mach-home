import { MiddlewareRoute, validateAndTransformBody } from "@medusajs/framework"
import { z } from "zod"

// The value shape is validated per-key inside the upsert workflow step.
export const UpsertSiteSectionSchema = z.object({
  value: z.unknown(),
})

export type UpsertSiteSectionSchema = z.infer<typeof UpsertSiteSectionSchema>

export const siteSectionsMiddlewares: MiddlewareRoute[] = [
  {
    matcher: "/admin/site-sections/:key",
    method: "POST",
    middlewares: [validateAndTransformBody(UpsertSiteSectionSchema)],
  },
]
