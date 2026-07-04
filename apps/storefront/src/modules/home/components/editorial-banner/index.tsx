import { EDITORIAL } from "@lib/config/brand"
import { getSection } from "@lib/data/site"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const EditorialBanner = async () => {
  const editorial = await getSection("editorial", EDITORIAL)

  return (
    <section className="bg-cream px-6 py-20 small:px-10 small:py-32">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 gap-10 small:grid-cols-2 small:gap-20 items-center">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={editorial.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="py-5">
          <div className="eyebrow text-sand mb-3">{editorial.eyebrow}</div>
          <h2 className="display-md mb-8">
            {editorial.titleStart}
            <em>{editorial.titleEm}</em>
            {editorial.titleEnd}
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-soft max-w-[480px] mb-10 font-light">
            {editorial.text}
          </p>
          <LocalizedClientLink href={editorial.href} className="btn-solid">
            {editorial.cta} <span className="text-lg">→</span>
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default EditorialBanner
