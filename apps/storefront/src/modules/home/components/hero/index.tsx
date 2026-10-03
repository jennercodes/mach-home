import { HERO } from "@lib/config/brand"
import { getSection } from "@lib/data/site"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getImageProps } from "next/image"

// Matches the `small` Tailwind screen: below it the mobile image is used.
const MOBILE_MEDIA = "(max-width: 1023px)"

const Hero = async () => {
  const hero = await getSection("hero", HERO)

  const common = { alt: "", fill: true, priority: true, sizes: "100vw" }
  const {
    props: { srcSet: desktopSrcSet, ...desktopProps },
  } = getImageProps({ ...common, src: hero.image })
  const mobileSrcSet = hero.imageMobile
    ? getImageProps({ ...common, src: hero.imageMobile }).props.srcSet ??
      hero.imageMobile
    : null

  return (
    <section className="relative h-[88svh] min-h-[540px] max-h-[820px] w-full flex items-end overflow-hidden small:h-[78vh] small:min-h-[580px] small:max-h-none">
      <picture>
        {mobileSrcSet && <source media={MOBILE_MEDIA} srcSet={mobileSrcSet} />}
        <source srcSet={desktopSrcSet ?? hero.image} />
        <img {...desktopProps} alt="" className="object-cover object-center" />
      </picture>
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent small:from-ink/45 small:via-ink/5"
        aria-hidden="true"
      />
      <div className="relative max-w-[1440px] mx-auto w-full px-5 pb-10 small:px-10 small:pb-20 text-white">
        <div className="eyebrow mb-4 opacity-95 small:mb-6">{hero.eyebrow}</div>
        <h1 className="display-xl text-[clamp(38px,11vw,48px)] max-w-[800px] mb-5 small:text-[clamp(48px,7vw,96px)] small:mb-8">
          {hero.titleStart}
          <em>{hero.titleEm}</em>
          {hero.titleEnd}
        </h1>
        <p className="text-[15px] leading-relaxed max-w-[460px] mb-8 opacity-95 font-light small:text-base small:mb-10">
          {hero.text}
        </p>
        <LocalizedClientLink href={hero.href} className="btn-outline w-full justify-center xsmall:w-auto">
          {hero.cta} <span className="text-lg">→</span>
        </LocalizedClientLink>
      </div>
    </section>
  )
}

export default Hero
