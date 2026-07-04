import { COLOR_HEX_MAP } from "@lib/config/brand"
import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import QuickAdd from "./quick-add"

const NEW_BADGE_DAYS = 30

export default async function ProductPreview({
  product,
  isFeatured,
  region: _region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  const isOnSale = cheapestPrice?.price_type === "sale"
  const isNew =
    !isOnSale &&
    !!product.created_at &&
    Date.now() - new Date(product.created_at).getTime() <
      NEW_BADGE_DAYS * 24 * 60 * 60 * 1000

  const categoryLabel =
    product.categories?.[0]?.name ?? product.collection?.title

  const colorValues =
    product.options
      ?.find((o) => o.title?.toLowerCase() === "color")
      ?.values?.map((v) => v.value)
      .filter((v): v is string => !!v) ?? []

  const singleVariant =
    product.variants?.length === 1 ? product.variants[0] : undefined
  const singleVariantId = singleVariant?.id
  // With one variant per product the size lives in the variant title (e.g. "Queen")
  const sizeLabel = singleVariant?.title

  return (
    <article className="group" data-testid="product-wrapper">
      <div className="relative aspect-[4/5] bg-cream overflow-hidden mb-4">
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className="absolute inset-0"
          aria-label={product.title}
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            className="!rounded-none !p-0 !shadow-none !aspect-[4/5] !bg-cream [&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-[1.03]"
          />
        </LocalizedClientLink>

        {isOnSale && cheapestPrice?.percentage_diff && (
          <span className="absolute top-3 left-3 bg-sale text-white px-2.5 py-1.5 text-[10px] tracking-[0.1em] font-semibold pointer-events-none">
            -{cheapestPrice.percentage_diff}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-3 left-3 bg-ink text-white px-2.5 py-1.5 text-[10px] tracking-[0.1em] font-semibold pointer-events-none">
            Nuevo
          </span>
        )}

        <QuickAdd variantId={singleVariantId} productHandle={product.handle!} />
      </div>

      <div className="px-1">
        {categoryLabel && (
          <div className="text-[10px] tracking-[0.2em] uppercase text-sand font-medium mb-1.5">
            {categoryLabel}
          </div>
        )}
        <h3 className="font-display text-lg leading-snug tracking-[-0.01em] mb-2">
          <LocalizedClientLink
            href={`/products/${product.handle}`}
            data-testid="product-title"
          >
            {product.title}
          </LocalizedClientLink>
        </h3>
        <div className="flex items-center gap-2">
          {sizeLabel ? (
            <span className="text-[13px] text-sand font-light">
              {sizeLabel} ·
            </span>
          ) : (
            (product.variants?.length ?? 0) > 1 && (
              <span className="text-[13px] text-sand font-light">Desde</span>
            )
          )}
          {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
        </div>
        {colorValues.length > 0 && (
          <div className="flex gap-1.5 mt-2.5">
            {colorValues.map((value) => (
              <span
                key={value}
                title={value}
                className="w-3.5 h-3.5 rounded-full border border-line"
                style={{
                  background: COLOR_HEX_MAP[value.toLowerCase()] ?? "#e8e1d4",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
