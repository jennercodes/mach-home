import { HttpTypes } from "@medusajs/types"
import DiscountCode from "@modules/checkout/components/discount-code"
import SummaryItems from "@modules/checkout/components/summary-items"
import CartTotals from "@modules/common/components/cart-totals"

const CheckoutSummary = ({ cart }: { cart: HttpTypes.StoreCart }) => {
  return (
    <div className="sticky top-8 flex flex-col">
      <h2 className="font-display text-[22px] mb-6">Resumen del pedido</h2>
      <SummaryItems cart={cart} />
      <div className="my-6">
        <DiscountCode cart={cart} />
      </div>
      <div className="border-t border-line pt-5">
        <CartTotals totals={cart} />
      </div>
    </div>
  )
}

export default CheckoutSummary
