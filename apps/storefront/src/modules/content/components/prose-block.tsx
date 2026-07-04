type ProseBlockProps = {
  heading?: string
  paragraphs: string[]
}

const ProseBlock = ({ heading, paragraphs }: ProseBlockProps) => {
  return (
    <section>
      {heading && (
        <h2 className="font-display text-2xl font-light tracking-[-0.02em] mb-4">
          {heading}
        </h2>
      )}
      <div className="flex flex-col gap-4">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className="text-[15px] leading-relaxed text-ink-soft font-light"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export default ProseBlock
