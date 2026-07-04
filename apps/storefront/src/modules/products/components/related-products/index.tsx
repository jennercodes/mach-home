import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import SectionHeader from "@modules/common/components/section-header"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductListParams = {
    limit: 5,
    fields:
      "*variants.calculated_price,+metadata,*categories,*options,*options.values",
  }
  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.categories?.length) {
    queryParams.category_id = product.categories.map((c) => c.id)
  } else if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products
      .filter((responseProduct) => responseProduct.id !== product.id)
      .slice(0, 4)
  })

  if (!products.length) {
    return null
  }

  return (
    <div>
      <SectionHeader
        eyebrow="Te puede gustar"
        title={
          <>
            Combina con <em>estos</em>
          </>
        }
      />
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 small:grid-cols-4 small:gap-x-6 small:gap-y-10">
        {products.map((product) => (
          <li key={product.id}>
            <Product region={region} product={product} />
          </li>
        ))}
      </ul>
    </div>
  )
}
