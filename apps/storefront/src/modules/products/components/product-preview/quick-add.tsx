"use client"

import { addToCart } from "@lib/data/cart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useParams } from "next/navigation"
import { useState } from "react"

type QuickAddProps = {
  /** When the product has exactly one variant we add it directly; otherwise we link to the PDP. */
  variantId?: string
  productHandle: string
}

const baseClasses =
  "absolute bottom-3 inset-x-3 bg-ink text-cream py-3 text-[11px] tracking-[0.15em] uppercase font-medium text-center translate-y-[calc(100%+0.75rem)] group-hover:translate-y-0 focus-visible:translate-y-0 transition-transform duration-300"

const QuickAdd = ({ variantId, productHandle }: QuickAddProps) => {
  const countryCode = useParams().countryCode as string
  const [isAdding, setIsAdding] = useState(false)

  if (!variantId) {
    return (
      <LocalizedClientLink
        href={`/products/${productHandle}`}
        className={baseClasses}
        tabIndex={-1}
      >
        Ver opciones
      </LocalizedClientLink>
    )
  }

  const handleAdd = async () => {
    if (isAdding) {
      return
    }
    setIsAdding(true)
    await addToCart({
      variantId,
      quantity: 1,
      countryCode,
    })
      .catch(() => {})
      .finally(() => setIsAdding(false))
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding}
      className={baseClasses}
      data-testid="quick-add-button"
    >
      {isAdding ? "Agregando…" : "+ Agregar al carrito"}
    </button>
  )
}

export default QuickAdd
