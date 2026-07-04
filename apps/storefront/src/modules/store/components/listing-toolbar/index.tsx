import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

export type CategoryChip = {
  label: string
  href: string
  active?: boolean
}

type ListingToolbarProps = {
  chips?: CategoryChip[]
  sortBy: SortOptions
}

/** Toolbar under the listing hero: category chips on the left, sort select on the right. */
const ListingToolbar = ({ chips = [], sortBy }: ListingToolbarProps) => {
  return (
    <div className="max-w-[1440px] mx-auto px-6 small:px-10 py-6 small:py-8 flex flex-wrap items-center justify-between gap-4 border-b border-line">
      <div className="flex flex-wrap gap-3">
        {chips.map((chip) => (
          <LocalizedClientLink
            key={chip.href}
            href={chip.href}
            className={clx(
              "px-4 py-2.5 border text-xs tracking-[0.1em] uppercase font-medium transition-colors",
              chip.active
                ? "bg-ink text-cream border-ink"
                : "bg-white border-line hover:border-ink"
            )}
          >
            {chip.label}
          </LocalizedClientLink>
        ))}
      </div>
      <RefinementList sortBy={sortBy} data-testid="sort-by-container" />
    </div>
  )
}

export default ListingToolbar
