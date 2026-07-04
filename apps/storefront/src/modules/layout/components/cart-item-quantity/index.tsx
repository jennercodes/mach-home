"use client"

import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import Spinner from "@modules/common/icons/spinner"
import { useState } from "react"

/** Inline − / + stepper for a cart line item (used in the cart drawer). */
const CartItemQuantity = ({
  item,
}: {
  item: HttpTypes.StoreCartLineItem
}) => {
  const [updating, setUpdating] = useState(false)

  const changeQuantity = async (quantity: number) => {
    if (quantity < 1 || updating) {
      return
    }

    setUpdating(true)
    await updateLineItem({ lineId: item.id, quantity })
      .catch(() => {})
      .finally(() => setUpdating(false))
  }

  return (
    <div className="flex items-center gap-3 border border-line px-3 py-1">
      <button
        type="button"
        onClick={() => changeQuantity(item.quantity - 1)}
        disabled={updating || item.quantity <= 1}
        className="text-sm p-1 text-ink-soft disabled:opacity-30"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span
        className="text-[13px] font-medium min-w-4 text-center"
        data-testid="cart-item-quantity"
        data-value={item.quantity}
      >
        {updating ? <Spinner size={12} /> : item.quantity}
      </span>
      <button
        type="button"
        onClick={() => changeQuantity(item.quantity + 1)}
        disabled={updating}
        className="text-sm p-1 text-ink-soft disabled:opacity-30"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  )
}

export default CartItemQuantity
