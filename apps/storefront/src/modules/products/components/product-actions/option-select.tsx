import { COLOR_HEX_MAP } from "@lib/config/brand"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@modules/common/components/ui"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const isColorOption = (title: string) => title.trim().toLowerCase() === "color"

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)
  const asSwatches =
    isColorOption(title) &&
    filteredOptions.every((v) => COLOR_HEX_MAP[v.toLowerCase()])

  return (
    <div className="flex flex-col gap-y-3.5">
      <div className="flex justify-between text-xs tracking-[0.15em] uppercase">
        <span className="font-semibold">{title}</span>
        {["tamaño", "talla"].includes(title.trim().toLowerCase()) ? (
          <LocalizedClientLink
            href="/guia-de-tallas"
            className="text-[11px] underline underline-offset-4 normal-case tracking-normal text-ink-soft hover:text-ink transition-colors"
          >
            Guía de tallas
          </LocalizedClientLink>
        ) : (
          current && <span className="text-ink-soft">{current}</span>
        )}
      </div>

      {asSwatches ? (
        <div className="flex gap-3" data-testid={dataTestId}>
          {filteredOptions.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => updateOption(option.id, v)}
              disabled={disabled}
              title={v}
              aria-label={v}
              className={clx(
                "relative w-9 h-9 rounded-full border border-line transition-transform hover:scale-[1.08]",
                v === current &&
                  "after:absolute after:-inset-[5px] after:border after:border-ink after:rounded-full"
              )}
              style={{ background: COLOR_HEX_MAP[v.toLowerCase()] }}
              data-testid="option-button"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2" data-testid={dataTestId}>
          {filteredOptions.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => updateOption(option.id, v)}
              disabled={disabled}
              className={clx(
                "px-3 py-3.5 border text-[13px] font-medium text-center transition-colors",
                v === current
                  ? "bg-ink text-cream border-ink"
                  : "border-line hover:border-ink"
              )}
              data-testid="option-button"
            >
              {v}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default OptionSelect
