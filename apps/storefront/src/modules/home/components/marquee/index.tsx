import { MARQUEE_ITEMS } from "@lib/config/brand"
import { getSection } from "@lib/data/site"

/** Infinite scrolling strip. Pure CSS (animate-marquee translates the doubled track by -50%). */
const Marquee = async () => {
  const { items } = await getSection("marquee", { items: MARQUEE_ITEMS })

  return (
    <div className="bg-cream border-b border-line py-4 overflow-hidden">
      <div className="flex gap-14 w-max animate-marquee text-[13px] tracking-[0.15em] uppercase font-medium whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-14">
            {item}
            <span className="opacity-50 text-[10px]" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
