import { FOOTER, STORE_NAME } from "@lib/config/brand"
import { listCategories } from "@lib/data/categories"
import { getSection } from "@lib/data/site"
import { HttpTypes } from "@medusajs/types"
import BrandLogo from "@modules/common/components/brand-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import NewsletterForm from "@modules/layout/components/newsletter-form"

export default async function Footer() {
  const [categories, footerContent] = await Promise.all([
    listCategories({
      fields: "id,name,handle,parent_category_id,rank",
    }).catch(() => [] as HttpTypes.StoreProductCategory[]),
    getSection("footer", {
      blurb: FOOTER.blurb,
      newsletterTitle: FOOTER.newsletter.title,
      newsletterText: FOOTER.newsletter.text,
      payments: FOOTER.payments,
    }),
  ])

  const topLevelCategories = (categories ?? [])
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))

  const shopColumn = {
    title: "Tienda",
    links: topLevelCategories.slice(0, 6).map((c) => ({
      label: c.name,
      href: `/categories/${c.handle}`,
    })),
  }

  const columns = topLevelCategories.length
    ? [shopColumn, ...FOOTER.columns.slice(0, 2)]
    : FOOTER.columns

  return (
    <footer className="bg-ink text-cream px-6 pt-20 pb-10 small:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-[2fr_1fr_1fr_1fr_1.2fr] gap-10 small:gap-14 pb-14 border-b border-cream/15">
          <div>
            <LocalizedClientLink href="/" aria-label={`${STORE_NAME} — Inicio`}>
              <BrandLogo variant="cream" className="h-12 mb-6" />
            </LocalizedClientLink>
            <p className="text-sm leading-relaxed opacity-70 max-w-[320px] font-light">
              {footerContent.blurb}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-5">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <LocalizedClientLink
                      href={link.href}
                      className="text-sm opacity-70 hover:opacity-100 transition-opacity font-light"
                    >
                      {link.label}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase font-medium mb-5">
              {footerContent.newsletterTitle}
            </h4>
            <p className="text-[13px] leading-relaxed opacity-70 mb-4 font-light">
              {footerContent.newsletterText}
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-4 pt-8 text-xs opacity-60">
          <div>
            © {new Date().getFullYear()} {STORE_NAME} · Todos los derechos
            reservados
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] tracking-[0.1em] uppercase">
              Pagos con
            </span>
            {footerContent.payments.map((p) => (
              <span
                key={p}
                className="bg-cream/10 px-3 py-1.5 rounded-soft text-[11px] tracking-[0.1em] font-medium"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
