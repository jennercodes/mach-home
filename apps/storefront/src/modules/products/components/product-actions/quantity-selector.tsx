"use client"

type QuantitySelectorProps = {
  quantity: number
  onChange: (quantity: number) => void
  disabled?: boolean
}

const QuantitySelector = ({
  quantity,
  onChange,
  disabled,
}: QuantitySelectorProps) => {
  return (
    <div className="flex items-center justify-between border border-ink px-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={disabled || quantity <= 1}
        className="text-lg px-2 py-3.5 disabled:opacity-30"
        aria-label="Disminuir cantidad"
      >
        −
      </button>
      <span
        className="text-sm font-medium min-w-5 text-center"
        data-testid="quantity"
        data-value={quantity}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        disabled={disabled}
        className="text-lg px-2 py-3.5 disabled:opacity-30"
        aria-label="Aumentar cantidad"
      >
        +
      </button>
    </div>
  )
}

export default QuantitySelector
