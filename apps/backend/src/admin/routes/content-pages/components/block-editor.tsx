import { ArrowDownMini, ArrowUpMini, Trash } from "@medusajs/icons"
import {
  Button,
  IconButton,
  Input,
  Label,
  Select,
  Text,
  Textarea,
} from "@medusajs/ui"
import { useState } from "react"
import {
  BLOCK_TYPE_LABELS,
  ContentBlock,
  emptyBlock,
} from "../types"

type BlockEditorProps = {
  blocks: ContentBlock[]
  onChange: (blocks: ContentBlock[]) => void
}

/** Structured editor for the page's content blocks. */
export const BlockEditor = ({ blocks, onChange }: BlockEditorProps) => {
  const [newType, setNewType] = useState<ContentBlock["type"]>("prose")

  const updateBlock = (index: number, block: ContentBlock) => {
    onChange(blocks.map((b, i) => (i === index ? block : b)))
  }

  const removeBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index))
  }

  const moveBlock = (index: number, direction: -1 | 1) => {
    const target = index + direction
    if (target < 0 || target >= blocks.length) {
      return
    }
    const next = [...blocks]
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  return (
    <div className="flex flex-col gap-y-3">
      {blocks.map((block, index) => (
        <div
          key={index}
          className="rounded-lg border border-ui-border-base bg-ui-bg-subtle px-4 py-3 flex flex-col gap-y-3"
        >
          <div className="flex items-center justify-between">
            <Text size="small" leading="compact" weight="plus">
              {index + 1}. {BLOCK_TYPE_LABELS[block.type]}
            </Text>
            <div className="flex items-center gap-x-1">
              <IconButton
                size="small"
                variant="transparent"
                type="button"
                onClick={() => moveBlock(index, -1)}
                disabled={index === 0}
              >
                <ArrowUpMini />
              </IconButton>
              <IconButton
                size="small"
                variant="transparent"
                type="button"
                onClick={() => moveBlock(index, 1)}
                disabled={index === blocks.length - 1}
              >
                <ArrowDownMini />
              </IconButton>
              <IconButton
                size="small"
                variant="transparent"
                type="button"
                onClick={() => removeBlock(index)}
              >
                <Trash className="text-ui-fg-subtle" />
              </IconButton>
            </div>
          </div>
          <BlockFields
            block={block}
            onChange={(b) => updateBlock(index, b)}
          />
        </div>
      ))}

      <div className="flex items-end gap-x-2">
        <div className="flex flex-col gap-y-1 flex-1">
          <Label size="small" weight="plus">
            Agregar bloque
          </Label>
          <Select
            value={newType}
            onValueChange={(v) => setNewType(v as ContentBlock["type"])}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              {Object.entries(BLOCK_TYPE_LABELS).map(([value, label]) => (
                <Select.Item key={value} value={value}>
                  {label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        </div>
        <Button
          size="small"
          variant="secondary"
          type="button"
          onClick={() => onChange([...blocks, emptyBlock(newType)])}
        >
          Agregar
        </Button>
      </div>
    </div>
  )
}

const BlockFields = ({
  block,
  onChange,
}: {
  block: ContentBlock
  onChange: (block: ContentBlock) => void
}) => {
  switch (block.type) {
    case "prose":
      return (
        <div className="flex flex-col gap-y-2">
          <Field label="Encabezado (opcional)">
            <Input
              size="small"
              value={block.heading ?? ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Párrafos (separa cada párrafo con una línea en blanco)">
            <Textarea
              rows={5}
              value={block.paragraphs.join("\n\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  paragraphs: e.target.value
                    .split(/\n\s*\n/)
                    .map((p) => p.trim())
                    .filter(Boolean),
                })
              }
            />
          </Field>
        </div>
      )

    case "faq":
      return (
        <ItemList
          items={block.items}
          onChange={(items) => onChange({ ...block, items })}
          empty={{ q: "", a: "" }}
          addLabel="Agregar pregunta"
          render={(item, update) => (
            <>
              <Field label="Pregunta">
                <Input
                  size="small"
                  value={item.q}
                  onChange={(e) => update({ ...item, q: e.target.value })}
                />
              </Field>
              <Field label="Respuesta">
                <Textarea
                  rows={3}
                  value={item.a}
                  onChange={(e) => update({ ...item, a: e.target.value })}
                />
              </Field>
            </>
          )}
        />
      )

    case "contact":
      return (
        <ItemList
          items={block.channels}
          onChange={(channels) => onChange({ ...block, channels })}
          empty={{ label: "", value: "" }}
          addLabel="Agregar canal"
          render={(channel, update) => (
            <div className="grid grid-cols-2 gap-2">
              <Field label="Canal (ej. WhatsApp)">
                <Input
                  size="small"
                  value={channel.label}
                  onChange={(e) => update({ ...channel, label: e.target.value })}
                />
              </Field>
              <Field label="Valor visible">
                <Input
                  size="small"
                  value={channel.value}
                  onChange={(e) => update({ ...channel, value: e.target.value })}
                />
              </Field>
              <Field label="Link (https://, mailto:, tel:)">
                <Input
                  size="small"
                  value={channel.href ?? ""}
                  onChange={(e) => update({ ...channel, href: e.target.value })}
                />
              </Field>
              <Field label="Nota (ej. horario)">
                <Input
                  size="small"
                  value={channel.note ?? ""}
                  onChange={(e) => update({ ...channel, note: e.target.value })}
                />
              </Field>
            </div>
          )}
        />
      )

    case "stores":
      return (
        <ItemList
          items={block.stores}
          onChange={(stores) => onChange({ ...block, stores })}
          empty={{ name: "", address: "", hours: "" }}
          addLabel="Agregar tienda"
          render={(store, update) => (
            <>
              <Field label="Nombre">
                <Input
                  size="small"
                  value={store.name}
                  onChange={(e) => update({ ...store, name: e.target.value })}
                />
              </Field>
              <Field label="Dirección">
                <Input
                  size="small"
                  value={store.address}
                  onChange={(e) => update({ ...store, address: e.target.value })}
                />
              </Field>
              <Field label="Horario">
                <Input
                  size="small"
                  value={store.hours}
                  onChange={(e) => update({ ...store, hours: e.target.value })}
                />
              </Field>
            </>
          )}
        />
      )

    case "table":
      return (
        <div className="flex flex-col gap-y-2">
          <Field label="Encabezado (opcional)">
            <Input
              size="small"
              value={block.heading ?? ""}
              onChange={(e) => onChange({ ...block, heading: e.target.value })}
            />
          </Field>
          <Field label="Columnas (separadas por |)">
            <Input
              size="small"
              value={block.columns.join(" | ")}
              onChange={(e) =>
                onChange({
                  ...block,
                  columns: e.target.value.split("|").map((c) => c.trim()),
                })
              }
            />
          </Field>
          <Field label="Filas (una por línea, celdas separadas por |)">
            <Textarea
              rows={5}
              value={block.rows.map((r) => r.join(" | ")).join("\n")}
              onChange={(e) =>
                onChange({
                  ...block,
                  rows: e.target.value
                    .split("\n")
                    .filter((line) => line.trim())
                    .map((line) => line.split("|").map((c) => c.trim())),
                })
              }
            />
          </Field>
          <Field label="Nota al pie (opcional)">
            <Input
              size="small"
              value={block.caption ?? ""}
              onChange={(e) => onChange({ ...block, caption: e.target.value })}
            />
          </Field>
        </div>
      )
  }
}

const Field = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-y-1">
    <Label size="xsmall" className="text-ui-fg-subtle">
      {label}
    </Label>
    {children}
  </div>
)

function ItemList<T>({
  items,
  onChange,
  empty,
  addLabel,
  render,
}: {
  items: T[]
  onChange: (items: T[]) => void
  empty: T
  addLabel: string
  render: (item: T, update: (item: T) => void) => React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="rounded-md border border-ui-border-base bg-ui-bg-base px-3 py-2 flex flex-col gap-y-2"
        >
          <div className="flex justify-end">
            <IconButton
              size="small"
              variant="transparent"
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              <Trash className="text-ui-fg-subtle" />
            </IconButton>
          </div>
          {render(item, (updated) =>
            onChange(items.map((it, i) => (i === index ? updated : it)))
          )}
        </div>
      ))}
      <Button
        size="small"
        variant="secondary"
        type="button"
        onClick={() => onChange([...items, empty])}
      >
        {addLabel}
      </Button>
    </div>
  )
}
