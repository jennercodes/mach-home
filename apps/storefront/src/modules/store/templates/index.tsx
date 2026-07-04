import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ListingHero from "@modules/store/components/listing-hero"
import ListingToolbar from "@modules/store/components/listing-toolbar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categories = await listCategories({
    fields: "id,name,handle,parent_category_id,rank",
  }).catch(() => [] as HttpTypes.StoreProductCategory[])

  const chips = [
    { label: "Todo", href: "/store", active: true },
    ...(categories ?? [])
      .filter((c) => !c.parent_category_id)
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
      .map((c) => ({
        label: c.name,
        href: `/categories/${c.handle}`,
      })),
  ]

  return (
    <div data-testid="category-container">
      <ListingHero
        title="Tienda"
        subtitle="Todo lo que tu casa necesita para sentirse como nueva."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Tienda" }]}
      />
      <ListingToolbar chips={chips} sortBy={sort} />
      {/* TODO: faceted filters sidebar (size/color/material) once the backend exposes them */}
      <div className="max-w-[1440px] mx-auto px-6 small:px-10 py-10">
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
