type FaqBlockProps = {
  items: { q: string; a: string }[]
}

/** Accordion built on native <details> — no client JS needed. */
const FaqBlock = ({ items }: FaqBlockProps) => {
  return (
    <section className="flex flex-col">
      {items.map((item) => (
        <details key={item.q} className="group border-t border-line last:border-b">
          <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="text-sm font-medium">{item.q}</span>
            <span
              className="text-xl leading-none text-sand transition-transform duration-200 group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="pb-6 pr-10 text-[15px] leading-relaxed text-ink-soft font-light">
            {item.a}
          </p>
        </details>
      ))}
    </section>
  )
}

export default FaqBlock
