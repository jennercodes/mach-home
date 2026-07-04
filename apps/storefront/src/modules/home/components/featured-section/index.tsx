import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import SectionHeader from "@modules/common/components/section-header"
import ProductPreview from "@modules/products/components/product-preview"
import { ReactNode } from "react"

type FeaturedSectionProps = {
  eyebrow: string
  title: ReactNode
  region: HttpTypes.StoreRegion
  collection?: HttpTypes.StoreCollection
  /** Sort products by newest first when no collection drives the section. */
  latest?: boolean
  limit?: number
}

/** Product grid section for the home page (4-up on desktop, 2-up on mobile). */
export default async function FeaturedSection({
  eyebrow,
  title,
  region,
  collection,
  latest = false,
  limit = 4,
}: FeaturedSectionProps) {
  const {
    response: { products },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      ...(collection ? { collection_id: collection.id } : {}),
      ...(latest ? { order: "-created_at" } : {}),
      limit,
      fields:
        "*variants.calculated_price,+metadata,*categories,*options,*options.values",
    } as HttpTypes.StoreProductParams,
  })

  if (!products?.length) {
    return null
  }

  return (
    <section className="max-w-[1440px] mx-auto px-6 py-16 small:px-10 small:py-24">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        href={collection ? `/collections/${collection.handle}` : "/store"}
        linkLabel="Ver todos"
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-4 small:gap-x-6 small:gap-y-10">
        {products.slice(0, limit).map((product) => (
          <li key={product.id}>
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    </section>
  )
}
