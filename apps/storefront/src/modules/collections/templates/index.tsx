import { Suspense } from "react"

import { HttpTypes } from "@medusajs/types"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ListingHero from "@modules/store/components/listing-hero"
import ListingToolbar from "@modules/store/components/listing-toolbar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CollectionTemplate({
  sortBy,
  collection,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  collection: HttpTypes.StoreCollection
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div>
      <ListingHero
        title={collection.title}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Tienda", href: "/store" },
          { label: collection.title },
        ]}
      />
      <ListingToolbar sortBy={sort} />
      <div className="max-w-[1440px] mx-auto px-6 small:px-10 py-10">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={collection.products?.length}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            collectionId={collection.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
