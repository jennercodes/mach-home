export type FieldSpec = {
  name: string
  label: string
  /**
   * text: input · textarea: multiline · image: URL + upload
   * lines: string[] one per line · csv: string[] comma separated
   */
  type: "text" | "textarea" | "image" | "lines" | "csv"
  hint?: string
}

export type SectionSpec = {
  key: string
  label: string
  description: string
  fields: FieldSpec[]
}

const heroFields: FieldSpec[] = [
  { name: "eyebrow", label: "Eyebrow", type: "text" },
  { name: "titleStart", label: "Título (inicio)", type: "text" },
  {
    name: "titleEm",
    label: "Título (parte en cursiva)",
    type: "text",
  },
  { name: "titleEnd", label: "Título (final)", type: "text" },
  { name: "text", label: "Texto", type: "textarea" },
  { name: "cta", label: "Texto del botón", type: "text" },
  { name: "href", label: "Link del botón", type: "text", hint: "Ej. /store" },
  { name: "image", label: "Imagen", type: "image" },
]

export const SECTION_SPECS: SectionSpec[] = [
  {
    key: "brand",
    label: "Marca y logo",
    description: "Logo del header/checkout y versión clara para fondos oscuros",
    fields: [
      {
        name: "logoUrl",
        label: "Logo (fondos claros)",
        type: "image",
        hint: "Déjalo vacío para usar el logo SVG por defecto",
      },
      {
        name: "logoLightUrl",
        label: "Logo claro (footer y menú móvil)",
        type: "image",
        hint: "Versión en color claro para fondos oscuros",
      },
    ],
  },
  {
    key: "topbar",
    label: "Barra superior",
    description: "Anuncio sobre el header en todas las páginas",
    fields: [{ name: "text", label: "Texto", type: "textarea" }],
  },
  {
    key: "hero",
    label: "Home · Hero",
    description: "Portada principal del home",
    fields: heroFields,
  },
  {
    key: "marquee",
    label: "Home · Marquee",
    description: "Cinta animada bajo el hero",
    fields: [
      {
        name: "items",
        label: "Frases (una por línea)",
        type: "lines",
      },
    ],
  },
  {
    key: "editorial",
    label: "Home · Editorial",
    description: "Bloque de historia de marca",
    fields: heroFields,
  },
  {
    key: "sale_banner",
    label: "Home · Banner de sale",
    description: "Banner oscuro de liquidación",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "titleStart", label: "Título (inicio)", type: "text" },
      { name: "titleEm", label: "Título (cursiva)", type: "text" },
      { name: "subtitle", label: "Subtítulo", type: "text" },
      { name: "cta", label: "Texto del botón", type: "text" },
      { name: "href", label: "Link del botón", type: "text" },
    ],
  },
  {
    key: "social",
    label: "Home · Redes sociales",
    description: "Grilla de Instagram al final del home",
    fields: [
      { name: "eyebrow", label: "Eyebrow", type: "text" },
      { name: "handle", label: "Usuario (@...)", type: "text" },
      {
        name: "images",
        label: "Imágenes (una URL por línea)",
        type: "lines",
      },
    ],
  },
  {
    key: "footer",
    label: "Footer",
    description: "Texto de marca, newsletter y medios de pago",
    fields: [
      { name: "blurb", label: "Descripción de la marca", type: "textarea" },
      { name: "newsletterTitle", label: "Título del newsletter", type: "text" },
      { name: "newsletterText", label: "Texto del newsletter", type: "textarea" },
      {
        name: "payments",
        label: "Medios de pago (separados por coma)",
        type: "csv",
      },
    ],
  },
]
