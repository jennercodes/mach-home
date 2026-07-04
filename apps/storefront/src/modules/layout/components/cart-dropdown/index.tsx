"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import CartItemQuantity from "@modules/layout/components/cart-item-quantity"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart drawer when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <>
      <button
        type="button"
        onClick={openAndCancel}
        className="relative w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
        title="Carrito"
        aria-label={`Carrito, ${totalItems} productos`}
        data-testid="nav-cart-link"
      >
        <ShoppingBag size="20" />
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 bg-ink text-cream text-[10px] font-semibold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">
            {totalItems}
          </span>
        )}
      </button>

      {/* Overlay */}
      <div
        className={clx(
          "fixed inset-0 bg-ink/50 z-[70] transition-opacity duration-300",
          cartDropdownOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        )}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={clx(
          "fixed inset-y-0 right-0 h-full w-full sm:w-[460px] bg-white z-[75] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          cartDropdownOpen ? "translate-x-0" : "translate-x-full"
        )}
        onMouseEnter={openAndCancel}
        data-testid="nav-cart-dropdown"
        aria-hidden={!cartDropdownOpen}
      >
        <div className="flex items-center justify-between px-8 py-7 border-b border-line">
          <h3 className="font-display text-2xl">Tu carrito ({totalItems})</h3>
          <button
            type="button"
            onClick={close}
            className="text-2xl leading-none hover:opacity-60 transition-opacity"
            aria-label="Cerrar carrito"
            data-testid="close-cart-button"
          >
            ✕
          </button>
        </div>

        {cartState && cartState.items?.length ? (
          <>
            <div className="flex-1 overflow-y-auto px-8 no-scrollbar">
              {cartState.items
                .sort((a, b) => {
                  return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                })
                .map((item) => (
                  <div
                    className="grid grid-cols-[90px_1fr] gap-4 py-6 border-b border-line"
                    key={item.id}
                    data-testid="cart-item"
                  >
                    <LocalizedClientLink
                      href={`/products/${item.product_handle}`}
                      onClick={close}
                    >
                      <Thumbnail
                        thumbnail={item.thumbnail}
                        images={item.variant?.product?.images}
                        size="full"
                        className="!rounded-none !p-0 !shadow-none !aspect-[4/5] !bg-cream"
                      />
                    </LocalizedClientLink>
                    <div className="flex flex-col">
                      <h4 className="font-display text-[15px] mb-1">
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          onClick={close}
                          data-testid="product-link"
                        >
                          {item.product_title}
                        </LocalizedClientLink>
                      </h4>
                      <div className="text-xs text-sand font-light mb-3">
                        <LineItemOptions
                          variant={item.variant}
                          data-testid="cart-item-variant"
                          data-value={item.variant}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-auto">
                        <CartItemQuantity item={item} />
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">
                            <LineItemPrice
                              item={item}
                              style="tight"
                              currencyCode={cartState.currency_code}
                            />
                          </span>
                          <DeleteButton
                            id={item.id}
                            data-testid="cart-item-remove-button"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="px-8 py-6 border-t border-line bg-white">
              <div className="flex flex-col gap-2 mb-5 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span data-testid="cart-subtotal" data-value={subtotal}>
                    {convertToLocale({
                      amount: subtotal,
                      currency_code: cartState.currency_code,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-[13px] text-sand">
                  <span>Envío y descuentos en checkout</span>
                </div>
              </div>
              <LocalizedClientLink
                href="/checkout?step=address"
                onClick={close}
                passHref
              >
                <button
                  className="w-full bg-ink text-cream py-[18px] text-xs tracking-[0.2em] uppercase font-semibold hover:opacity-85 transition-opacity"
                  data-testid="go-to-cart-button"
                >
                  Ir a pagar →
                </button>
              </LocalizedClientLink>
              <LocalizedClientLink
                href="/cart"
                onClick={close}
                className="block text-center mt-3 text-[11px] text-sand tracking-[0.1em] uppercase hover:text-ink transition-colors"
              >
                Ver carrito completo
              </LocalizedClientLink>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-5 px-8 text-center">
            <div className="bg-ink text-cream flex items-center justify-center w-7 h-7 rounded-full text-xs">
              0
            </div>
            <span className="font-display text-lg">Tu carrito está vacío.</span>
            <LocalizedClientLink href="/store" onClick={close}>
              <span className="btn-solid">Explorar productos</span>
            </LocalizedClientLink>
          </div>
        )}
      </aside>
    </>
  )
}

export default CartDropdown
