import { HERO } from "@lib/config/brand"
import { getSection } from "@lib/data/site"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

const Hero = async () => {
  const hero = await getSection("hero", HERO)

  return (
    <section className="relative h-[78vh] min-h-[580px] w-full flex items-end overflow-hidden">
      <Image
        src={hero.image}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/5 to-transparent"
        aria-hidden="true"
      />
      <div className="relative max-w-[1440px] mx-auto w-full px-6 pb-16 small:px-10 small:pb-20 text-white">
        <div className="eyebrow mb-6 opacity-95">{hero.eyebrow}</div>
        <h1 className="display-xl max-w-[800px] mb-8">
          {hero.titleStart}
          <em>{hero.titleEm}</em>
          {hero.titleEnd}
        </h1>
        <p className="text-base leading-relaxed max-w-[460px] mb-10 opacity-95 font-light">
          {hero.text}
        </p>
        <LocalizedClientLink href={hero.href} className="btn-outline">
          {hero.cta} <span className="text-lg">→</span>
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
