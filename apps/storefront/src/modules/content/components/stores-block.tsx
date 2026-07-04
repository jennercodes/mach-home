type StoresBlockProps = {
  stores: { name: string; address: string; hours: string }[]
}

const StoresBlock = ({ stores }: StoresBlockProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 gap-4">
      {stores.map((store) => (
        <div
          key={store.name}
          className="border border-line bg-cream/50 p-7 flex flex-col gap-3"
        >
          <h2 className="font-display text-2xl font-light tracking-[-0.01em]">
            {store.name}
          </h2>
          <p className="text-sm text-ink-soft font-light leading-relaxed">
            {store.address}
          </p>
          <p className="text-[11px] tracking-[0.15em] uppercase text-sand mt-auto">
            {store.hours}
          </p>
        </div>
      ))}
    </section>
  )
}

export default StoresBlock
