import { HttpTypes } from "@medusajs/types"
import SectionHeader from "@modules/common/components/section-header"
import CategoryCard from "./category-card"

/** Mosaic of category cards: first card spans two rows on desktop. */
const CategoryMosaic = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  if (!categories.length) {
    return null
  }

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 small:px-10 small:py-24">
      <SectionHeader
        eyebrow="Explora"
        title={
          <>
            Compra por <em>categoría</em>
          </>
        }
        href="/store"
        linkLabel="Ver todo"
      />
      <div className="grid grid-cols-2 gap-4 small:grid-cols-[2fr_1fr_1fr] small:grid-rows-2 small:h-[700px]">
        {categories.slice(0, 5).map((category, i) => (
          <CategoryCard key={category.id} category={category} featured={i === 0} />
        ))}
      </div>
    </section>
  )
}

export default CategoryMosaic
