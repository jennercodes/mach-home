import { CONTENT_PAGES } from "@lib/config/pages"
import { STORE_NAME } from "@lib/config/brand"
import { getContentPage, listContentPageSlugs } from "@lib/data/content"
import ContentPageTemplate from "@modules/content/templates"
import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ countryCode: string; slug: string }>
}

/**
 * Pages are managed from the admin (CMS module); the local CONTENT_PAGES
 * config acts as a fallback if the backend is unreachable.
 */
const resolvePage = async (slug: string) => {
  return (await getContentPage(slug)) ?? CONTENT_PAGES[slug] ?? null
}

export async function generateStaticParams() {
  const slugs = await listContentPageSlugs()
  const all = new Set([...slugs, ...Object.keys(CONTENT_PAGES)])
  return Array.from(all).map((slug) => ({ slug }))
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params
  const page = await resolvePage(slug)

  if (!page) {
    notFound()
  }

  return {
    title: `${page.title}${page.titleEm ?? ""} | ${STORE_NAME}`,
    description: page.description,
  }
}

export default async function ContentPage(props: Props) {
  const { slug } = await props.params
  const page = await resolvePage(slug)

  if (!page) {
    notFound()
  }

  return <ContentPageTemplate page={page} />
}
