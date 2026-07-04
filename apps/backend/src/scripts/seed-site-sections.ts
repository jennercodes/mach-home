import { ExecArgs } from "@medusajs/framework/types"
import { CMS_MODULE } from "../modules/cms"
import CmsModuleService from "../modules/cms/service"

/**
 * Seeds the editable site sections with the storefront's original static
 * content (brand.ts). Idempotent: skips keys that already exist.
 *
 * Run with: npx medusa exec ./src/scripts/seed-site-sections.ts
 */
const SECTIONS: Record<string, Record<string, unknown>> = {
  topbar: {
    text: "Envíos a todo el Perú · Compras desde S/ 200 con envío gratis en Lima",
  },
  brand: {
    logoUrl: null,
    logoLightUrl: null,
  },
  hero: {
    eyebrow: "Nueva colección · Otoño 2026",
    titleStart: "El descanso que sí ",
    titleEm: "se siente",
    titleEnd: " en casa.",
    text: "Sábanas, plumones y textiles de hogar pensados para hacer de tu cama el lugar favorito del día.",
    cta: "Explorar colección",
    href: "/store",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1800&q=85",
  },
  marquee: {
    items: [
      "Algodón 100% peruano",
      "Envíos a todo el Perú",
      "Cambios sin complicaciones",
      "Calidad que dura",
    ],
  },
  editorial: {
    eyebrow: "Nuestra historia",
    titleStart: "Tejidos que ",
    titleEm: "abrazan",
    titleEnd: ", hechos en Perú.",
    text: "En MACH HOME creemos que el descanso es el mejor lujo. Trabajamos con algodón pima peruano y artesanos locales para crear textiles que duran, con la calidez que solo lo bien hecho puede dar.",
    cta: "Conoce la marca",
    href: "/sobre-nosotros",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1000&q=85",
  },
  sale_banner: {
    eyebrow: "Liquidación de temporada",
    titleStart: "Hasta ",
    titleEm: "-40%",
    subtitle: "Selección de ropa de cama y deco · solo hasta agotar stock",
    cta: "Ir al sale",
    href: "/categories/sale",
  },
  social: {
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
  },
  footer: {
    blurb:
      "Marca peruana de ropa de cama y hogar. El descanso, la calidez y la calidad se encuentran en MACH HOME.",
    newsletterTitle: "Newsletter",
    newsletterText: "Recibe -10% en tu primera compra y novedades de la marca.",
    payments: ["CULQI", "IZIPAY"],
  },
}

export default async function seedSiteSections({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const cmsService: CmsModuleService = container.resolve(CMS_MODULE)

  const existing = await cmsService.listSiteSections({}, { select: ["key"] })
  const existingKeys = new Set(existing.map((s) => s.key))

  const toCreate = Object.entries(SECTIONS)
    .filter(([key]) => !existingKeys.has(key))
    .map(([key, value]) => ({ key, value }))

  if (!toCreate.length) {
    logger.info("Site sections already seeded, skipping")
    return
  }

  await cmsService.createSiteSections(toCreate)
  logger.info(`Seeded ${toCreate.length} site sections ✔`)
}
