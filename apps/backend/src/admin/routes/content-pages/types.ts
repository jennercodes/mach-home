export type ProseBlock = {
  type: "prose"
  heading?: string
  paragraphs: string[]
}

export type FaqBlock = {
  type: "faq"
  items: { q: string; a: string }[]
}

export type ContactBlock = {
  type: "contact"
  channels: { label: string; value: string; href?: string; note?: string }[]
}

export type StoresBlock = {
  type: "stores"
  stores: { name: string; address: string; hours: string }[]
}

export type TableBlock = {
  type: "table"
  heading?: string
  caption?: string
  columns: string[]
  rows: string[][]
}

export type ContentBlock =
  | ProseBlock
  | FaqBlock
  | ContactBlock
  | StoresBlock
  | TableBlock

export type ContentPageDTO = {
  id: string
  slug: string
  title: string
  title_em: string | null
  eyebrow: string
  intro: string | null
  description: string
  blocks: ContentBlock[]
  published: boolean
  created_at: string
  updated_at: string
}

export type ContentPageFormValues = {
  slug: string
  title: string
  title_em: string
  eyebrow: string
  intro: string
  description: string
  blocks: ContentBlock[]
  published: boolean
}

export const emptyFormValues: ContentPageFormValues = {
  slug: "",
  title: "",
  title_em: "",
  eyebrow: "",
  intro: "",
  description: "",
  blocks: [],
  published: true,
}

export const toFormValues = (page: ContentPageDTO): ContentPageFormValues => ({
  slug: page.slug,
  title: page.title,
  title_em: page.title_em ?? "",
  eyebrow: page.eyebrow,
  intro: page.intro ?? "",
  description: page.description,
  blocks: page.blocks ?? [],
  published: page.published,
})

export const toPayload = (values: ContentPageFormValues) => ({
  slug: values.slug.trim(),
  title: values.title,
  title_em: values.title_em || null,
  eyebrow: values.eyebrow,
  intro: values.intro || null,
  description: values.description,
  blocks: values.blocks,
  published: values.published,
})

export const emptyBlock = (type: ContentBlock["type"]): ContentBlock => {
  switch (type) {
    case "prose":
      return { type: "prose", heading: "", paragraphs: [""] }
    case "faq":
      return { type: "faq", items: [{ q: "", a: "" }] }
    case "contact":
      return { type: "contact", channels: [{ label: "", value: "" }] }
    case "stores":
      return { type: "stores", stores: [{ name: "", address: "", hours: "" }] }
    case "table":
      return { type: "table", heading: "", columns: ["", ""], rows: [["", ""]] }
  }
}

export const BLOCK_TYPE_LABELS: Record<ContentBlock["type"], string> = {
  prose: "Texto",
  faq: "Preguntas frecuentes",
  contact: "Canales de contacto",
  stores: "Tiendas",
  table: "Tabla",
}
