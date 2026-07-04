import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { ReactNode } from "react"

type SectionHeaderProps = {
  eyebrow: string
  title: ReactNode
  href?: string
  linkLabel?: string
}

/** Section heading: eyebrow + display title, optional "Ver todo" link on the right. */
const SectionHeader = ({
  eyebrow,
  title,
  href,
  linkLabel = "Ver todo",
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-wrap items-end justify-between gap-10 mb-14">
      <div>
        <div className="eyebrow text-sand mb-3">{eyebrow}</div>
        <h2 className="display-lg">{title}</h2>
      </div>
      {href && (
        <LocalizedClientLink
          href={href}
          className="text-xs tracking-[0.2em] uppercase font-medium pb-1 border-b border-current hover:opacity-60 transition-opacity"
        >
          {linkLabel} →
        </LocalizedClientLink>
      )}
    </div>
  )
}

export default SectionHeader
