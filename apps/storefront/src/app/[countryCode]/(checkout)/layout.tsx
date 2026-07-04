import BrandLogo from "@modules/common/components/brand-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full bg-white relative small:min-h-screen">
      <div className="bg-white border-b border-line">
        <nav className="flex items-center content-container justify-between py-4">
          <LocalizedClientLink
            href="/cart"
            className="flex items-center gap-x-2 flex-1 basis-0 text-[11px] tracking-[0.15em] uppercase font-medium text-ink-soft hover:text-ink transition-colors"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block">Volver al carrito</span>
            <span className="mt-px block small:hidden">Volver</span>
          </LocalizedClientLink>
          <LocalizedClientLink
            href="/"
            data-testid="store-link"
            aria-label="MACH HOME — Inicio"
          >
            <BrandLogo className="h-9" />
          </LocalizedClientLink>
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">
        {children}
      </div>
      <div className="py-6 w-full flex items-center justify-center text-[11px] tracking-[0.1em] uppercase text-sand">
        🔒 Pago seguro · datos encriptados
      </div>
    </div>
  )
}
