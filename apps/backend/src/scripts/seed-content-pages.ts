import { ExecArgs } from "@medusajs/framework/types"
import { CMS_MODULE } from "../modules/cms"
import CmsModuleService from "../modules/cms/service"

type SeedPage = {
  title: string
  titleEm?: string
  eyebrow: string
  intro?: string
  description: string
  blocks: unknown[]
}

const CONTENT_PAGES: Record<string, SeedPage> = {
  "atencion-al-cliente": {
    title: "Atención al ",
    titleEm: "cliente",
    eyebrow: "Estamos para ayudarte",
    intro:
      "¿Dudas con tu pedido, un cambio o una tela? Escríbenos por el canal que prefieras y te respondemos lo antes posible.",
    description: "Canales de atención y soporte de MACH HOME.",
    blocks: [
      {
        type: "contact",
        channels: [
          {
            label: "WhatsApp",
            value: "+51 987 654 321",
            href: "https://wa.me/51987654321",
            note: "Lun a Sáb · 9:00 a 18:00",
          },
          {
            label: "Email",
            value: "hola@mach-home.com",
            href: "mailto:hola@mach-home.com",
            note: "Respondemos en menos de 24 h hábiles",
          },
          {
            label: "Teléfono",
            value: "(01) 234 5678",
            href: "tel:+5112345678",
            note: "Lun a Vie · 9:00 a 18:00",
          },
        ],
      },
      {
        type: "prose",
        heading: "Sobre tu pedido",
        paragraphs: [
          "Ten a la mano tu número de pedido (lo encuentras en el correo de confirmación o en Mi cuenta → Pedidos) para ayudarte más rápido.",
          "Si tu consulta es sobre un cambio o devolución, revisa primero nuestra política de cambios: la mayoría de casos se resuelven en línea sin trámites extra.",
        ],
      },
    ],
  },

  "sobre-nosotros": {
    title: "Tejidos que abrazan, hechos en ",
    titleEm: "Perú",
    eyebrow: "Nuestra historia",
    intro:
      "MACH HOME nace de una idea simple: el descanso es el mejor lujo, y merece materiales a la altura.",
    description:
      "Conoce MACH HOME: marca peruana de ropa de cama y textiles de hogar.",
    blocks: [
      {
        type: "prose",
        paragraphs: [
          "Trabajamos con algodón pima peruano y talleres locales para crear sábanas, plumones y textiles de hogar que duran. Cada pieza pasa por manos que conocen el oficio: del hilado a la costura, cuidamos los detalles que se sienten cada noche.",
          "Creemos en producir mejor, no más. Colecciones pensadas para combinarse entre sí, colores que no pasan de moda y telas que mejoran con cada lavada.",
        ],
      },
      {
        type: "prose",
        heading: "Lo que nos guía",
        paragraphs: [
          "Calidad sobre cantidad: algodón de fibra larga, densidades honestas y acabados que se notan.",
          "Producción local: generamos trabajo en talleres peruanos y acortamos la cadena para cuidar el precio.",
          "Descanso real: diseñamos para el clima y las costumbres de casa, de Lima a la sierra.",
        ],
      },
    ],
  },

  "preguntas-frecuentes": {
    title: "Preguntas ",
    titleEm: "frecuentes",
    eyebrow: "Ayuda",
    intro:
      "Las respuestas a lo que más nos consultan. Si no encuentras la tuya, escríbenos por WhatsApp.",
    description: "Preguntas frecuentes sobre pedidos, envíos, cambios y pagos.",
    blocks: [
      {
        type: "faq",
        items: [
          {
            q: "¿Cuánto demora el envío?",
            a: "En Lima Metropolitana tu pedido llega entre 2 y 4 días hábiles. A provincias, entre 5 y 10 días hábiles según la ciudad.",
          },
          {
            q: "¿El envío tiene costo?",
            a: "En Lima el envío es gratis en compras desde S/ 200; en compras menores cuesta S/ 10. Para provincias el costo se calcula en el checkout según destino.",
          },
          {
            q: "¿Qué medios de pago aceptan?",
            a: "Tarjetas de crédito y débito (Visa, Mastercard, Amex), Yape y Plin, y pago en efectivo vía PagoEfectivo o agentes bancarios.",
          },
          {
            q: "¿Puedo cambiar un producto?",
            a: "Sí. Tienes 15 días calendario desde que recibes tu pedido para solicitar un cambio, siempre que el producto esté sin uso y con sus etiquetas.",
          },
          {
            q: "¿Cómo sé qué talla de sábanas necesito?",
            a: "Revisa nuestra Guía de tallas: ahí están las medidas de cada plaza (1, 1.5, 2 plazas, Queen y King) para sábanas, plumones y fundas.",
          },
          {
            q: "¿Hacen ventas al por mayor?",
            a: "Sí, atendemos ventas institucionales y mayoristas (hoteles, proyectos, regalos corporativos). Escríbenos a mayoristas@mach-home.com.",
          },
          {
            q: "¿Puedo recoger mi pedido en tienda?",
            a: "Sí, puedes elegir recojo en tienda al momento de pagar y te avisamos por correo cuando esté listo (normalmente el mismo día o al día siguiente).",
          },
          {
            q: "¿Dónde presento un reclamo?",
            a: "Contamos con Libro de Reclamaciones virtual. También puedes escribirnos primero: la mayoría de los casos los resolvemos directamente y más rápido.",
          },
        ],
      },
    ],
  },

  contacto: {
    title: "Con",
    titleEm: "tacto",
    eyebrow: "Hablemos",
    intro:
      "Para consultas de pedidos, ventas mayoristas o prensa, estos son nuestros canales.",
    description: "Canales de contacto de MACH HOME.",
    blocks: [
      {
        type: "contact",
        channels: [
          {
            label: "WhatsApp",
            value: "+51 987 654 321",
            href: "https://wa.me/51987654321",
            note: "Atención Lun a Sáb · 9:00 a 18:00",
          },
          {
            label: "Pedidos y ayuda",
            value: "hola@mach-home.com",
            href: "mailto:hola@mach-home.com",
          },
          {
            label: "Mayoristas e institucionales",
            value: "mayoristas@mach-home.com",
            href: "mailto:mayoristas@mach-home.com",
          },
          {
            label: "Prensa y colaboraciones",
            value: "prensa@mach-home.com",
            href: "mailto:prensa@mach-home.com",
          },
        ],
      },
    ],
  },

  tiendas: {
    title: "Nuestras ",
    titleEm: "tiendas",
    eyebrow: "Visítanos",
    intro:
      "Toca las telas, compara colores y llévate tu pedido el mismo día. También puedes recoger tus compras web en tienda.",
    description: "Direcciones y horarios de las tiendas MACH HOME.",
    blocks: [
      {
        type: "stores",
        stores: [
          {
            name: "Miraflores",
            address: "Av. La Mar 1234, Miraflores, Lima",
            hours: "Lun a Sáb 10:00–20:00 · Dom 11:00–18:00",
          },
          {
            name: "Surco",
            address: "C.C. Jockey Plaza, tienda 245, Santiago de Surco, Lima",
            hours: "Lun a Dom 10:00–22:00",
          },
          {
            name: "San Isidro",
            address: "Calle Los Libertadores 456, San Isidro, Lima",
            hours: "Lun a Sáb 10:00–19:00",
          },
        ],
      },
    ],
  },

  "cambios-y-devoluciones": {
    title: "Cambios y ",
    titleEm: "devoluciones",
    eyebrow: "Sin complicaciones",
    intro:
      "Queremos que duermas tranquilo, también con tu compra. Así funcionan los cambios y devoluciones.",
    description: "Política de cambios y devoluciones de MACH HOME.",
    blocks: [
      {
        type: "prose",
        heading: "Cambios",
        paragraphs: [
          "Tienes 15 días calendario desde la recepción de tu pedido para solicitar un cambio de talla, color o producto.",
          "El producto debe estar sin uso, sin lavar y con sus etiquetas y empaque original. Por higiene, no aceptamos cambios de almohadas ni protectores una vez abiertos.",
          "Solicita tu cambio escribiéndonos por WhatsApp o correo con tu número de pedido. En Lima coordinamos el recojo; en provincias te indicamos la agencia para el envío.",
        ],
      },
      {
        type: "prose",
        heading: "Devoluciones",
        paragraphs: [
          "Si el producto llegó con un defecto de fábrica o recibiste un artículo distinto al pedido, asumimos el costo total del recojo y te ofrecemos cambio inmediato o reembolso.",
          "Los reembolsos se procesan al mismo medio de pago en un plazo de 7 a 15 días hábiles según tu banco.",
        ],
      },
    ],
  },

  "politicas-de-envio": {
    title: "Políticas de ",
    titleEm: "envío",
    eyebrow: "Envíos a todo el Perú",
    intro:
      "Despachamos desde Lima a todo el país. Estos son los plazos y costos referenciales.",
    description: "Plazos, costos y coberturas de envío de MACH HOME.",
    blocks: [
      {
        type: "table",
        heading: "Plazos y costos",
        columns: ["Destino", "Plazo", "Costo"],
        rows: [
          ["Lima Metropolitana", "2 a 4 días hábiles", "S/ 10 · gratis desde S/ 200"],
          ["Callao y balnearios", "2 a 5 días hábiles", "S/ 12"],
          ["Provincias (capitales)", "5 a 8 días hábiles", "Desde S/ 18"],
          ["Provincias (otras zonas)", "7 a 10 días hábiles", "Según cotización"],
        ],
        caption:
          "Los plazos corren desde la confirmación del pago. En campañas (Cyber, Navidad) pueden extenderse 1 a 2 días.",
      },
      {
        type: "prose",
        heading: "Seguimiento",
        paragraphs: [
          "Cuando tu pedido sale de nuestro almacén te enviamos un correo con el número de seguimiento del courier.",
          "Si no hay nadie en la dirección, el courier intenta la entrega hasta 2 veces antes de devolver el paquete a nuestro almacén.",
        ],
      },
    ],
  },

  "guia-de-tallas": {
    title: "Guía de ",
    titleEm: "tallas",
    eyebrow: "Encuentra tu medida",
    intro:
      "Mide tu colchón (ancho × largo) y compáralo con estas tablas. Ante la duda, elige la talla mayor.",
    description: "Medidas de sábanas, plumones y fundas por plaza.",
    blocks: [
      {
        type: "table",
        heading: "Sábanas",
        columns: ["Talla", "Colchón (cm)", "Sábana plana (cm)"],
        rows: [
          ["1 plaza", "105 × 190", "160 × 240"],
          ["1.5 plazas", "120 × 190", "180 × 250"],
          ["2 plazas", "135 × 190", "200 × 250"],
          ["Queen", "155 × 200", "230 × 260"],
          ["King", "195 × 200", "270 × 280"],
        ],
      },
      {
        type: "table",
        heading: "Plumones y fundas de plumón",
        columns: ["Talla", "Medida (cm)"],
        rows: [
          ["1.5 plazas", "160 × 220"],
          ["2 plazas", "180 × 230"],
          ["Queen", "220 × 230"],
          ["King", "240 × 260"],
        ],
        caption:
          "Las fundas de plumón están pensadas para plumones de la misma talla.",
      },
    ],
  },

  "cuidado-de-telas": {
    title: "Cuidado de ",
    titleEm: "telas",
    eyebrow: "Para que duren años",
    intro:
      "El algodón pima mejora con el tiempo si lo cuidas bien. Sigue estas pautas y tus textiles se mantendrán suaves y con buen color.",
    description: "Guía de lavado y cuidado para textiles MACH HOME.",
    blocks: [
      {
        type: "prose",
        heading: "Lavado",
        paragraphs: [
          "Lava a máquina con agua fría o tibia (máx. 30 °C), ciclo suave y colores similares. Usa detergente neutro y evita la lejía: amarillea las fibras naturales.",
          "Lava las sábanas nuevas antes del primer uso: asienta el tejido y fija el color.",
        ],
      },
      {
        type: "prose",
        heading: "Secado y planchado",
        paragraphs: [
          "Seca a la sombra o en secadora a temperatura baja. Retira las piezas apenas termine el ciclo para evitar arrugas marcadas.",
          "Plancha a temperatura media con la tela ligeramente húmeda. Los plumones no se planchan: sacúdelos a diario para recuperar su volumen.",
        ],
      },
      {
        type: "prose",
        heading: "Guardado",
        paragraphs: [
          "Guarda tus textiles limpios y completamente secos, en un lugar ventilado. Evita bolsas plásticas selladas: el algodón necesita respirar.",
        ],
      },
    ],
  },
}

/**
 * Seeds the CMS content pages from the storefront's original static config.
 * Idempotent: skips slugs that already exist.
 *
 * Run with: npx medusa exec ./src/scripts/seed-content-pages.ts
 */
export default async function seedContentPages({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const cmsService: CmsModuleService = container.resolve(CMS_MODULE)

  const existing = await cmsService.listContentPages(
    {},
    { select: ["slug"] }
  )
  const existingSlugs = new Set(existing.map((p) => p.slug))

  const toCreate = Object.entries(CONTENT_PAGES)
    .filter(([slug]) => !existingSlugs.has(slug))
    .map(([slug, page]) => ({
      slug,
      title: page.title,
      title_em: page.titleEm ?? null,
      eyebrow: page.eyebrow,
      intro: page.intro ?? null,
      description: page.description,
      blocks: page.blocks,
      published: true,
    }))

  if (!toCreate.length) {
    logger.info("Content pages already seeded, skipping")
    return
  }

  await cmsService.createContentPages(
    toCreate.map((p) => ({
      ...p,
      blocks: p.blocks as unknown as Record<string, unknown>,
    }))
  )
  logger.info(`Seeded ${toCreate.length} content pages ✔`)
}
