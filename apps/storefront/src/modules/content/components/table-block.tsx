type TableBlockProps = {
  heading?: string
  caption?: string
  columns: string[]
  rows: string[][]
}

const TableBlock = ({ heading, caption, columns, rows }: TableBlockProps) => {
  return (
    <section>
      {heading && (
        <h2 className="font-display text-2xl font-light tracking-[-0.02em] mb-4">
          {heading}
        </h2>
      )}
      <div className="overflow-x-auto border border-line">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-cream">
              {columns.map((column) => (
                <th
                  key={column}
                  className="text-left px-5 py-3.5 text-[11px] tracking-[0.15em] uppercase font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.join()} className="border-t border-line">
                {row.map((cell, i) => (
                  <td
                    key={`${cell}-${i}`}
                    className={
                      i === 0
                        ? "px-5 py-3.5 font-medium"
                        : "px-5 py-3.5 text-ink-soft font-light"
                    }
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="mt-3 text-[13px] text-sand font-light">{caption}</p>
      )}
    </section>
  )
}

export default TableBlock
