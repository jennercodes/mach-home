import { PDP } from "@lib/config/brand"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const category = product.categories?.[0]

  return (
    <div id="product-info" className="mb-6">
      {category ? (
        <LocalizedClientLink
          href={`/categories/${category.handle}`}
          className="inline-block text-[11px] tracking-[0.25em] uppercase text-sand font-medium mb-4 hover:text-ink transition-colors"
        >
          {category.name}
        </LocalizedClientLink>
      ) : (
        product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-block text-[11px] tracking-[0.25em] uppercase text-sand font-medium mb-4 hover:text-ink transition-colors"
          >
            {product.collection.title}
          </LocalizedClientLink>
        )
      )}
      <h1
        className="font-display text-4xl small:text-[44px] font-light leading-[1.05] tracking-[-0.02em] mb-5"
        data-testid="product-title"
      >
        {product.title}
      </h1>
      {product.variants?.length === 1 && product.variants[0].title && (
        <div className="flex items-center gap-2 mb-4 text-xs tracking-[0.15em] uppercase">
          <span className="font-semibold">Tamaño</span>
          <span className="text-ink-soft">{product.variants[0].title}</span>
        </div>
      )}
      <p className="text-[13px] text-sand font-light">{PDP.shippingNote}</p>
      <div className="h-px bg-line mt-6" />
    </div>
  )
}

export default ProductInfo
