import { Metadata } from "next"

import { STORE_NAME } from "@lib/config/brand"
import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import CategoryMosaic from "@modules/home/components/category-mosaic"
import EditorialBanner from "@modules/home/components/editorial-banner"
import FeaturedSection from "@modules/home/components/featured-section"
import Hero from "@modules/home/components/hero"
import Marquee from "@modules/home/components/marquee"
import SaleBanner from "@modules/home/components/sale-banner"
import SocialGrid from "@modules/home/components/social-grid"

export const metadata: Metadata = {
  title: `${STORE_NAME} — Ropa de cama y textiles de hogar`,
  description:
    "Sábanas, plumones y textiles de hogar hechos en Perú. El descanso que sí se siente en casa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const [region, categories, { collections }] = await Promise.all([
    getRegion(countryCode),
    listCategories({
      fields: "id,name,handle,description,metadata,parent_category_id,rank",
    }).catch(() => [] as HttpTypes.StoreProductCategory[]),
    listCollections({ fields: "id, handle, title" }),
  ])

  if (!region) {
    return null
  }

  const topLevelCategories = (categories ?? [])
    .filter((c) => !c.parent_category_id)
    .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))

  const [firstCollection, secondCollection] = collections ?? []

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryMosaic categories={topLevelCategories} />
      <FeaturedSection
        eyebrow="Best Sellers"
        title={
          <>
            Los favoritos de <em>esta semana</em>
          </>
        }
        region={region}
        collection={firstCollection}
      />
      <EditorialBanner />
      <SaleBanner />
      <FeaturedSection
        eyebrow="Recién llegado"
        title={
          <>
            Nueva <em>colección</em>
          </>
        }
        region={region}
        collection={secondCollection}
        latest={!secondCollection}
      />
      <SocialGrid />
    </>
  )
}
