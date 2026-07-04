"use server"

import { sdk } from "@lib/config"
import { ContentBlock, ContentPage } from "@lib/config/pages"
import { getCacheOptions } from "./cookies"

type StoreContentPage = {
  id: string
  slug: string
  title: string
  title_em: string | null
  eyebrow: string
  intro: string | null
  description: string
  blocks: ContentBlock[]
  published: boolean
}

const toContentPage = (page: StoreContentPage): ContentPage => ({
  title: page.title,
  titleEm: page.title_em ?? undefined,
  eyebrow: page.eyebrow,
  intro: page.intro ?? undefined,
  description: page.description,
  blocks: page.blocks ?? [],
})

export const getContentPage = async (
  slug: string
): Promise<ContentPage | null> => {
  const next = {
    ...(await getCacheOptions("content")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<{ content_page: StoreContentPage }>(`/store/content-pages/${slug}`, {
      method: "GET",
      next,
    })
    .then(({ content_page }) => toContentPage(content_page))
    .catch(() => null)
}

export const listContentPageSlugs = async (): Promise<string[]> => {
  const next = {
    ...(await getCacheOptions("content")),
    revalidate: 60,
  }

  return sdk.client
    .fetch<{ content_pages: { slug: string }[] }>(`/store/content-pages`, {
      method: "GET",
      next,
    })
    .then(({ content_pages }) => content_pages.map((p) => p.slug))
    .catch(() => [])
}
