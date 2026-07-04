import { Suspense } from "react"

import { listCategories } from "@lib/data/categories"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { listRegions } from "@lib/data/regions"
import { getSection } from "@lib/data/site"
import { HttpTypes, StoreRegion } from "@medusajs/types"
import BrandLogo, {
  BRAND_FALLBACK,
} from "@modules/common/components/brand-logo"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Search from "@modules/common/icons/search"
import ShoppingBag from "@modules/common/icons/shopping-bag"
import User from "@modules/common/icons/user"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import TopBar from "@modules/layout/components/top-bar"

const SALE_HANDLE = "sale"

export default async function Nav() {
  const [regions, locales, currentLocale, categories, brand] =
    await Promise.all([
      listRegions().then((regions: StoreRegion[]) => regions),
      listLocales(),
      getLocale(),
      listCategories({
        fields: "id,name,handle,parent_category_id,rank",
      }).catch(() => [] as HttpTypes.StoreProductCategory[]),
      getSection("brand", BRAND_FALLBACK),
    ])

  const topLevelCategories = (categories ?? [])
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
  const navCategories = topLevelCategories.filter(
    (c) => c.handle !== SALE_HANDLE
  )
  const saleCategory = topLevelCategories.find(
    (c) => c.handle === SALE_HANDLE
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <TopBar />
      <header className="bg-white border-b border-line">
        <nav className="max-w-[1440px] mx-auto px-5 py-3 small:px-10 small:py-5 grid grid-cols-[auto_1fr_auto] small:grid-cols-[1fr_auto_1fr] items-center gap-6 small:gap-10">
          <div className="flex items-center">
            <div className="small:hidden">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
                categories={topLevelCategories}
                logoLightUrl={brand.logoLightUrl}
              />
            </div>
            <div className="hidden small:flex gap-9">
              {navCategories.map((category) => (
                <LocalizedClientLink
                  key={category.id}
                  href={`/categories/${category.handle}`}
                  className="text-[13px] tracking-[0.12em] uppercase font-medium hover:opacity-60 transition-opacity"
                  data-testid="nav-category-link"
                >
                  {category.name}
                </LocalizedClientLink>
              ))}
              <LocalizedClientLink
                href={
                  saleCategory ? `/categories/${saleCategory.handle}` : "/store"
                }
                className="text-[13px] tracking-[0.12em] uppercase font-medium text-sale border-b border-sale hover:opacity-60 transition-opacity"
              >
                Sale
              </LocalizedClientLink>
            </div>
          </div>

          <LocalizedClientLink
            href="/"
            className="flex items-center justify-center"
            data-testid="nav-store-link"
            aria-label="MACH HOME — Inicio"
          >
            <BrandLogo className="h-9 small:h-11" />
          </LocalizedClientLink>

          <div className="flex items-center justify-end gap-2 small:gap-5">
            <LocalizedClientLink
              href="/store"
              className="w-9 h-9 hidden small:flex items-center justify-center hover:opacity-60 transition-opacity"
              title="Buscar"
              aria-label="Buscar"
            >
              <Search size="20" />
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              className="w-9 h-9 hidden small:flex items-center justify-center hover:opacity-60 transition-opacity"
              title="Cuenta"
              aria-label="Cuenta"
              data-testid="nav-account-link"
            >
              <User size="20" />
            </LocalizedClientLink>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="w-9 h-9 flex items-center justify-center"
                  href="/cart"
                  data-testid="nav-cart-link"
                  aria-label="Carrito"
                >
                  <ShoppingBag size="20" />
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
