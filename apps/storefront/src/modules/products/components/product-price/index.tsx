import { clx } from "@modules/common/components/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-cream animate-pulse" />
  }

  return (
    <div className="flex items-baseline gap-4 mb-3">
      <span className="text-2xl font-medium">
        {!variant && (
          <span className="text-sm text-sand font-normal mr-1">Desde</span>
        )}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          <span
            className="text-lg text-sand line-through"
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
          >
            {selectedPrice.original_price}
          </span>
          <span className="bg-sale text-white px-2.5 py-1 text-xs font-semibold tracking-[0.05em]">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  )
}
