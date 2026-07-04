import { SOCIAL } from "@lib/config/brand"
import { getSection } from "@lib/data/site"
import Image from "next/image"

const SocialGrid = async () => {
  const social = await getSection("social", SOCIAL)

  if (!social.images.length) {
    return null
  }

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 small:px-10 small:py-24 text-center">
      <div className="eyebrow text-sand mb-3">{social.eyebrow}</div>
      <h2 className="display-lg">{social.handle}</h2>
      <div className="grid grid-cols-3 small:grid-cols-6 gap-2 mt-12">
        {social.images.map((src, i) => (
          <div key={src} className="group relative aspect-square overflow-hidden">
            <Image
              src={src}
              alt={`${social.handle} — publicación ${i + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              sizes="(max-width: 1024px) 33vw, 240px"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default SocialGrid
