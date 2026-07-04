import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Fragment } from "react"

export type BreadcrumbItem = {
  label: string
  href?: string
}

const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-[11px] tracking-[0.2em] uppercase text-sand font-medium"
    >
      {items.map((item, i) => (
        <Fragment key={`${item.label}-${i}`}>
          {i > 0 && <span className="mx-2 opacity-50">/</span>}
          {item.href ? (
            <LocalizedClientLink
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </LocalizedClientLink>
          ) : (
            <span className="text-ink-soft">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}

export default Breadcrumbs
