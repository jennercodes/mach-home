import React, { Suspense } from "react"

import { HttpTypes } from "@medusajs/types"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductFeatures from "@modules/products/components/product-features"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"

import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const category = product.categories?.[0]

  return (
    <>
      <div className="max-w-[1440px] mx-auto px-6 small:px-10 pt-6">
        <Breadcrumbs
          items={[
            { label: "Inicio", href: "/" },
            ...(category
              ? [
                  {
                    label: category.name,
                    href: `/categories/${category.handle}`,
                  },
                ]
              : [{ label: "Tienda", href: "/store" }]),
            { label: product.title },
          ]}
        />
      </div>

      <section
        className="max-w-[1440px] mx-auto px-6 small:px-10 py-8 small:py-10"
        data-testid="product-container"
      >
        <div className="grid grid-cols-1 small:grid-cols-[1fr_480px] gap-10 small:gap-20 items-start">
          <ImageGallery images={images} />

          <div className="small:sticky small:top-[140px] pt-2">
            <ProductInfo product={product} />
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductFeatures />
            <ProductTabs product={product} />
          </div>
        </div>
      </section>

      <div
        className="max-w-[1440px] mx-auto px-6 small:px-10 py-16 small:py-24"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
