import { Input, Label, Switch, Text, Textarea } from "@medusajs/ui"
import { ContentPageFormValues } from "../types"
import { BlockEditor } from "./block-editor"

type ContentPageFormProps = {
  values: ContentPageFormValues
  onChange: (values: ContentPageFormValues) => void
  /** Slug can't change on existing pages linked from the storefront without care. */
  slugDisabled?: boolean
}

export const ContentPageForm = ({
  values,
  onChange,
  slugDisabled = false,
}: ContentPageFormProps) => {
  const set = <K extends keyof ContentPageFormValues>(
    key: K,
    value: ContentPageFormValues[K]
  ) => onChange({ ...values, [key]: value })

  return (
    <div className="flex flex-col gap-y-5">
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-y-1">
          <Label size="small" weight="plus">
            Slug (URL)
          </Label>
          <Input
            size="small"
            value={values.slug}
            disabled={slugDisabled}
            placeholder="preguntas-frecuentes"
            onChange={(e) => set("slug", e.target.value)}
          />
          <Text size="xsmall" leading="compact" className="text-ui-fg-subtle">
            La página se publica en /{values.slug || "slug"}
          </Text>
        </div>
        <div className="flex flex-col gap-y-1">
          <Label size="small" weight="plus">
            Eyebrow (texto pequeño sobre el título)
          </Label>
          <Input
            size="small"
            value={values.eyebrow}
            placeholder="Ayuda"
            onChange={(e) => set("eyebrow", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-y-1">
          <Label size="small" weight="plus">
            Título
          </Label>
          <Input
            size="small"
            value={values.title}
            placeholder="Preguntas "
            onChange={(e) => set("title", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label size="small" weight="plus">
            Parte en cursiva (opcional)
          </Label>
          <Input
            size="small"
            value={values.title_em}
            placeholder="frecuentes"
            onChange={(e) => set("title_em", e.target.value)}
          />
          <Text size="xsmall" leading="compact" className="text-ui-fg-subtle">
            Se muestra en itálica a continuación del título.
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-y-1">
        <Label size="small" weight="plus">
          Intro (bajo el título)
        </Label>
        <Textarea
          rows={2}
          value={values.intro}
          onChange={(e) => set("intro", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <Label size="small" weight="plus">
          Descripción SEO
        </Label>
        <Textarea
          rows={2}
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div className="flex items-center gap-x-2">
        <Switch
          checked={values.published}
          onCheckedChange={(checked) => set("published", checked)}
        />
        <Label size="small">Publicada</Label>
      </div>

      <div className="flex flex-col gap-y-2">
        <Text size="small" leading="compact" weight="plus">
          Contenido
        </Text>
        <BlockEditor
          blocks={values.blocks}
          onChange={(blocks) => set("blocks", blocks)}
        />
      </div>
    </div>
  )
}
