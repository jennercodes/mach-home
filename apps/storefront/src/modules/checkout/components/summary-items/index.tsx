import { HttpTypes } from "@medusajs/types"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import Thumbnail from "@modules/products/components/thumbnail"

/** Read-only order summary list for the checkout sidebar (thumb + qty bubble + price). */
const SummaryItems = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  const items = [...(cart.items ?? [])].sort((a, b) =>
    (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
  )

  return (
    <div
      className="flex flex-col gap-4 max-h-[420px] overflow-y-auto no-scrollbar"
      data-testid="items-table"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-[70px_1fr_auto] gap-3.5 items-start"
          data-testid="cart-item"
        >
          <div className="relative">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="full"
              className="!rounded-none !p-0 !shadow-none !aspect-[4/5] !bg-white"
            />
            <span className="absolute -top-1.5 -right-1.5 w-[22px] h-[22px] bg-ink text-cream rounded-full text-[11px] font-semibold flex items-center justify-center">
              {item.quantity}
            </span>
          </div>
          <div>
            <div className="font-display text-[13px] mb-1">
              {item.product_title}
            </div>
            <div className="text-[11px] text-sand font-light">
              <LineItemOptions variant={item.variant} />
            </div>
          </div>
          <div className="text-[13px] font-medium">
            <LineItemPrice
              item={item}
              style="tight"
              currencyCode={cart.currency_code}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryItems
