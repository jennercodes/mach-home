/**
 * MACH HOME brand content & assets.
 * Single source of truth for marketing copy and placeholder imagery
 * (Unsplash for now — swap for R2 assets here when ready).
 */

export const STORE_NAME = "MACH HOME"

export const TOPBAR_TEXT =
  "Envíos a todo el Perú · Compras desde S/ 200 con envío gratis en Lima"

export const MARQUEE_ITEMS = [
  "Algodón 100% peruano",
  "Envíos a todo el Perú",
  "Cambios sin complicaciones",
  "Calidad que dura",
]

export const HERO = {
  eyebrow: "Nueva colección · Otoño 2026",
  titleStart: "El descanso que sí ",
  titleEm: "se siente",
  titleEnd: " en casa.",
  text: "Sábanas, plumones y textiles de hogar pensados para hacer de tu cama el lugar favorito del día.",
  cta: "Explorar colección",
  href: "/store",
  image:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=85",
}

export const EDITORIAL = {
  eyebrow: "Nuestra historia",
  titleStart: "Tejidos que ",
  titleEm: "abrazan",
  titleEnd: ", hechos en Perú.",
  text: "En MACH HOME creemos que el descanso es el mejor lujo. Trabajamos con algodón pima peruano y artesanos locales para crear textiles que duran, con la calidez que solo lo bien hecho puede dar.",
  cta: "Conoce la marca",
  href: "/store",
  image:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=85",
}

export const SALE_BANNER = {
  eyebrow: "Liquidación de temporada",
  titleStart: "Hasta ",
  titleEm: "-40%",
  subtitle: "Selección de ropa de cama y deco · solo hasta agotar stock",
  cta: "Ir al sale",
  href: "/store",
}

export const SOCIAL = {
  eyebrow: "Síguenos en redes",
  handle: "@mach.home",
  images: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&q=80",
    "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=400&q=80",
  ],
}

/** Category-card imagery keyed by category handle; DEFAULT covers unknown handles. */
export const CATEGORY_IMAGES: Record<string, string> = {
  "ropa-de-cama":
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&q=85",
  pack: "https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=85",
  deco: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=800&q=85",
  bano: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=85",
  sale: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85",
  DEFAULT:
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85",
}

/** Swatch hex values for variant option values (lowercase keys). */
export const COLOR_HEX_MAP: Record<string, string> = {
  crema: "#fff6ea",
  blanco: "#ffffff",
  beige: "#d4c5a9",
  arena: "#e8dcc4",
  camel: "#c4ad9a",
  taupe: "#8a7a5e",
  verde: "#a8b5a0",
  gris: "#3a3a3a",
  negro: "#212121",
}

export const FOOTER = {
  blurb:
    "Marca peruana de ropa de cama y hogar. El descanso, la calidez y la calidad se encuentran en MACH HOME.",
  columns: [
    {
      title: "Información",
      links: [
        { label: "Sobre nosotros", href: "/sobre-nosotros" },
        { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
        { label: "Contacto", href: "/contacto" },
        { label: "Tiendas", href: "/tiendas" },
      ],
    },
    {
      title: "Ayuda",
      links: [
        { label: "Atención al cliente", href: "/atencion-al-cliente" },
        { label: "Cambios y devoluciones", href: "/cambios-y-devoluciones" },
        { label: "Políticas de envío", href: "/politicas-de-envio" },
        { label: "Guía de tallas", href: "/guia-de-tallas" },
        { label: "Cuidado de telas", href: "/cuidado-de-telas" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Ventas institucionales", href: "/contacto" },
        { label: "Ventas mayoristas", href: "/contacto" },
        { label: "Términos y condiciones", href: "/preguntas-frecuentes" },
        { label: "Libro de reclamaciones", href: "/atencion-al-cliente" },
      ],
    },
  ],
  newsletter: {
    title: "Newsletter",
    text: "Recibe -10% en tu primera compra y novedades de la marca.",
  },
  payments: ["CULQI", "IZIPAY"],
}

export const PDP = {
  shippingNote: "Envío gratis en Lima · Llega entre 2 y 4 días hábiles",
  features: [
    { icon: "🚚", lines: ["Envío Lima", "2-4 días"] },
    { icon: "↺", lines: ["Cambios", "15 días"] },
    { icon: "🔒", lines: ["Pago", "seguro"] },
  ],
  shippingTabContent:
    "Envíos a todo el Perú. En Lima, tu pedido llega entre 2 y 4 días hábiles; envío gratis en compras desde S/ 200. Cambios sin complicaciones dentro de los 15 días de recibido.",
}
