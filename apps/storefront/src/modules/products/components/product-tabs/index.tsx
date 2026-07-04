"use client"

import { PDP } from "@lib/config/brand"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Descripción",
      component: (
        <p
          className="text-sm leading-relaxed text-ink-soft font-light whitespace-pre-line"
          data-testid="product-description"
        >
          {product.description || "—"}
        </p>
      ),
    },
    {
      label: "Composición y cuidados",
      component: <CareTab product={product} />,
    },
    {
      label: "Envíos y devoluciones",
      component: (
        <p className="text-sm leading-relaxed text-ink-soft font-light">
          {PDP.shippingTabContent}
        </p>
      ),
    },
  ]

  return (
    <div className="w-full mt-9">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
            className="border-t border-line py-1"
          >
            <div className="py-4">{tab.component}</div>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const CareTab = ({ product }: ProductTabsProps) => {
  const rows = [
    { label: "Material", value: product.material },
    { label: "País de origen", value: product.origin_country },
    { label: "Tipo", value: product.type?.value },
    { label: "Peso", value: product.weight ? `${product.weight} g` : null },
    {
      label: "Dimensiones",
      value:
        product.length && product.width && product.height
          ? `${product.length}L × ${product.width}A × ${product.height}H`
          : null,
    },
  ].filter((row) => !!row.value)

  if (!rows.length) {
    return (
      <p className="text-sm leading-relaxed text-ink-soft font-light">—</p>
    )
  }

  return (
    <dl className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="text-[11px] tracking-[0.15em] uppercase text-sand font-medium mb-0.5">
            {row.label}
          </dt>
          <dd className="text-ink-soft font-light">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ProductTabs
