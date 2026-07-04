import { notFound } from "next/navigation"
import { Suspense } from "react"

import { HttpTypes } from "@medusajs/types"
import { BreadcrumbItem } from "@modules/common/components/breadcrumbs"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import ListingHero from "@modules/store/components/listing-hero"
import ListingToolbar, {
  CategoryChip,
} from "@modules/store/components/listing-toolbar"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"

export default function CategoryTemplate({
  category,
  sortBy,
  page,
  countryCode,
}: {
  category: HttpTypes.StoreProductCategory
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  if (!category || !countryCode) notFound()

  const parents = [] as HttpTypes.StoreProductCategory[]

  const getParents = (category: HttpTypes.StoreProductCategory) => {
    if (category.parent_category) {
      parents.push(category.parent_category)
      getParents(category.parent_category)
    }
  }

  getParents(category)

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Inicio", href: "/" },
    ...parents
      .reverse()
      .map((p) => ({ label: p.name, href: `/categories/${p.handle}` })),
    { label: category.name },
  ]

  const chips: CategoryChip[] = category.category_children?.length
    ? [
        {
          label: "Todo",
          href: `/categories/${category.handle}`,
          active: true,
        },
        ...category.category_children.map((c) => ({
          label: c.name,
          href: `/categories/${c.handle}`,
        })),
      ]
    : []

  return (
    <div data-testid="category-container">
      <ListingHero
        title={category.name}
        subtitle={category.description}
        breadcrumbs={breadcrumbs}
      />
      <ListingToolbar chips={chips} sortBy={sort} />
      <div className="max-w-[1440px] mx-auto px-6 small:px-10 py-10">
        <Suspense
          fallback={
            <SkeletonProductGrid
              numberOfProducts={category.products?.length ?? 8}
            />
          }
        >
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}
