type ContactBlockProps = {
  channels: { label: string; value: string; href?: string; note?: string }[]
}

const ContactBlock = ({ channels }: ContactBlockProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {channels.map((channel) => (
        <div
          key={channel.label}
          className="border border-line p-6 flex flex-col gap-1.5 bg-white"
        >
          <span className="eyebrow !text-[10px] text-sand">{channel.label}</span>
          {channel.href ? (
            <a
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="font-display text-xl hover:opacity-60 transition-opacity break-words"
            >
              {channel.value}
            </a>
          ) : (
            <span className="font-display text-xl break-words">
              {channel.value}
            </span>
          )}
          {channel.note && (
            <span className="text-[13px] text-sand font-light">
              {channel.note}
            </span>
          )}
        </div>
      ))}
    </section>
  )
}

export default ContactBlock
