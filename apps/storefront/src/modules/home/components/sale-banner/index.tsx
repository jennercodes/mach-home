import { SALE_BANNER } from "@lib/config/brand"
import { getSection } from "@lib/data/site"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SaleBanner = async () => {
  const banner = await getSection("sale_banner", SALE_BANNER)

  return (
    <section className="bg-ink text-cream px-6 py-20 text-center overflow-hidden">
      <div className="eyebrow text-sale mb-5 !font-semibold">
        {banner.eyebrow}
      </div>
      <h2 className="font-display text-[clamp(48px,6vw,80px)] font-light tracking-[-0.02em] mb-4">
        {banner.titleStart}
        <em className="italic">{banner.titleEm}</em>
      </h2>
      <p className="text-base opacity-85 mb-9 font-light">{banner.subtitle}</p>
      <LocalizedClientLink href={banner.href} className="btn-outline">
        {banner.cta} →
      </LocalizedClientLink>
    </section>
  )
}

export default SaleBanner
