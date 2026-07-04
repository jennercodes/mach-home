import Breadcrumbs, {
  BreadcrumbItem,
} from "@modules/common/components/breadcrumbs"
import { ReactNode } from "react"

type ListingHeroProps = {
  title: ReactNode
  subtitle?: string | null
  breadcrumbs: BreadcrumbItem[]
}

/** Cream page header for listing pages (store / category / collection). */
const ListingHero = ({ title, subtitle, breadcrumbs }: ListingHeroProps) => {
  return (
    <section className="bg-cream px-6 pt-14 pb-10 small:pt-20 small:pb-14 text-center">
      <div className="mb-6 flex justify-center">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <h1 className="font-display text-[clamp(48px,6vw,84px)] font-light tracking-[-0.02em] mb-4 leading-none [&_em]:italic [&_em]:font-normal">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[15px] text-ink-soft font-light max-w-[540px] mx-auto">
          {subtitle}
        </p>
      )}
    </section>
  )
}

export default ListingHero
