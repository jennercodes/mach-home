import { model } from "@medusajs/framework/utils"

const ContentPage = model
  .define("content_page", {
    id: model.id().primaryKey(),
    slug: model.text().unique(),
    title: model.text(),
    title_em: model.text().nullable(),
    eyebrow: model.text(),
    intro: model.text().nullable(),
    description: model.text(),
    blocks: model.json(),
    published: model.boolean().default(true),
  })

export default ContentPage
