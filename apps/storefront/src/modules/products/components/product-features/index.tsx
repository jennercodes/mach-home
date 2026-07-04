import { PDP } from "@lib/config/brand"

/** Trust badges under the add-to-cart button (shipping / exchanges / secure payment). */
const ProductFeatures = () => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-line">
      {PDP.features.map((feature) => (
        <div key={feature.lines.join()} className="text-center">
          <div className="text-[22px] mb-2" aria-hidden="true">
            {feature.icon}
          </div>
          <div className="text-[11px] tracking-[0.1em] uppercase font-medium text-ink-soft">
            {feature.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductFeatures
