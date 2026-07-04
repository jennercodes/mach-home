import { ContentBlock, ContentPage } from "@lib/config/pages"
import Breadcrumbs from "@modules/common/components/breadcrumbs"
import ContactBlock from "@modules/content/components/contact-block"
import FaqBlock from "@modules/content/components/faq-block"
import ProseBlock from "@modules/content/components/prose-block"
import StoresBlock from "@modules/content/components/stores-block"
import TableBlock from "@modules/content/components/table-block"

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case "prose":
      return <ProseBlock key={index} {...block} />
    case "faq":
      return <FaqBlock key={index} {...block} />
    case "contact":
      return <ContactBlock key={index} {...block} />
    case "stores":
      return <StoresBlock key={index} {...block} />
    case "table":
      return <TableBlock key={index} {...block} />
  }
}

const ContentPageTemplate = ({ page }: { page: ContentPage }) => {
  return (
    <>
      <section className="bg-cream px-6 pt-14 pb-12 small:pt-20 small:pb-16 text-center">
        <div className="mb-6 flex justify-center">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: `${page.title}${page.titleEm ?? ""}` },
            ]}
          />
        </div>
        <div className="eyebrow text-sand mb-4">{page.eyebrow}</div>
        <h1 className="display-lg mb-5">
          {page.title}
          {page.titleEm && <em>{page.titleEm}</em>}
        </h1>
        {page.intro && (
          <p className="text-[15px] text-ink-soft font-light max-w-[560px] mx-auto leading-relaxed">
            {page.intro}
          </p>
        )}
      </section>

      <div className="max-w-[820px] mx-auto px-6 py-14 small:py-20 flex flex-col gap-12">
        {page.blocks.map(renderBlock)}
      </div>
    </>
  )
}

export default ContentPageTemplate
