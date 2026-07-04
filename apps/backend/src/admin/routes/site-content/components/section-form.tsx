import { ArrowUpTray } from "@medusajs/icons"
import { Button, Input, Label, Text, Textarea, toast } from "@medusajs/ui"
import { useRef, useState } from "react"
import { sdk } from "../../../lib/sdk"
import { FieldSpec, SectionSpec } from "../specs"

type SectionValue = Record<string, unknown>

/** Renders a section's fields from its spec; values keep the API JSON shape. */
export const SectionForm = ({
  spec,
  value,
  onChange,
}: {
  spec: SectionSpec
  value: SectionValue
  onChange: (value: SectionValue) => void
}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {spec.fields.map((field) => (
        <FieldInput
          key={field.name}
          field={field}
          raw={value[field.name]}
          onChange={(v) => onChange({ ...value, [field.name]: v })}
        />
      ))}
    </div>
  )
}

const FieldInput = ({
  field,
  raw,
  onChange,
}: {
  field: FieldSpec
  raw: unknown
  onChange: (value: unknown) => void
}) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Label size="small" weight="plus">
        {field.label}
      </Label>
      <FieldControl field={field} raw={raw} onChange={onChange} />
      {field.hint && (
        <Text size="xsmall" leading="compact" className="text-ui-fg-subtle">
          {field.hint}
        </Text>
      )}
    </div>
  )
}

const FieldControl = ({
  field,
  raw,
  onChange,
}: {
  field: FieldSpec
  raw: unknown
  onChange: (value: unknown) => void
}) => {
  switch (field.type) {
    case "text":
      return (
        <Input
          size="small"
          value={(raw as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case "textarea":
      return (
        <Textarea
          rows={3}
          value={(raw as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
        />
      )
    case "lines":
      return (
        <Textarea
          rows={5}
          value={((raw as string[]) ?? []).join("\n")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
            )
          }
        />
      )
    case "csv":
      return (
        <Input
          size="small"
          value={((raw as string[]) ?? []).join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            )
          }
        />
      )
    case "image":
      return (
        <ImageField value={(raw as string | null) ?? ""} onChange={onChange} />
      )
  }
}

const ImageField = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: unknown) => void
}) => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    try {
      const { files } = await sdk.admin.upload.create({ files: [file] })
      if (files?.[0]?.url) {
        onChange(files[0].url)
        toast.success("Imagen subida")
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex gap-x-2">
        <Input
          size="small"
          className="flex-1"
          placeholder="https://…"
          value={value}
          onChange={(e) => onChange(e.target.value || null)}
        />
        <Button
          size="small"
          variant="secondary"
          type="button"
          isLoading={uploading}
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
        >
          <ArrowUpTray />
          Subir
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              handleFile(file)
            }
            e.target.value = ""
          }}
        />
      </div>
      {value && (
        <img
          src={value}
          alt=""
          className="h-16 w-auto max-w-full self-start rounded-md border border-ui-border-base bg-ui-bg-subtle object-contain px-2 py-1"
        />
      )}
    </div>
  )
}
