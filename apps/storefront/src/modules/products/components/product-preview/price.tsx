import { VariantPrice } from "types/global"

export default async function PreviewPrice({ price }: { price: VariantPrice }) {
  if (!price) {
    return null
  }

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-sm font-medium" data-testid="price">
        {price.calculated_price}
      </span>
      {price.price_type === "sale" && (
        <span
          className="text-[13px] text-sand line-through"
          data-testid="original-price"
        >
          {price.original_price}
        </span>
      )}
    </div>
  )
}
