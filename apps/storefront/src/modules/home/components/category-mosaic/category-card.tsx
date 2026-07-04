import { CATEGORY_IMAGES } from "@lib/config/brand"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import Image from "next/image"

type CategoryCardProps = {
  category: HttpTypes.StoreProductCategory
  featured?: boolean
}

const CategoryCard = ({ category, featured = false }: CategoryCardProps) => {
  const image =
    (category.metadata?.image as string | undefined) ??
    CATEGORY_IMAGES[category.handle] ??
    CATEGORY_IMAGES.DEFAULT

  return (
    <LocalizedClientLink
      href={`/categories/${category.handle}`}
      className={clx(
        "group relative overflow-hidden block aspect-[4/5] small:aspect-auto",
        featured && "small:row-span-2"
      )}
    >
      <Image
        src={image}
        alt={category.name}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent transition-colors duration-500 group-hover:from-ink/70"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 p-8 text-white">
        <div
          className={clx(
            "font-display tracking-[-0.01em] mb-1",
            featured ? "text-4xl small:text-5xl" : "text-3xl"
          )}
        >
          {category.name}
        </div>
        {category.description && (
          <div className="text-xs tracking-[0.15em] uppercase opacity-85">
            {category.description}
          </div>
        )}
      </div>
    </LocalizedClientLink>
  )
}

export default CategoryCard
