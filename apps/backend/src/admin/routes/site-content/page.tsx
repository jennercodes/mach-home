import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Photo } from "@medusajs/icons"
import {
  Button,
  Container,
  Drawer,
  Heading,
  Text,
  toast,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { sdk } from "../../lib/sdk"
import { SectionForm } from "./components/section-form"
import { SECTION_SPECS, SectionSpec } from "./specs"

const QUERY_KEY = ["site-sections"]

type SiteSectionDTO = {
  id: string
  key: string
  value: Record<string, unknown>
}

const SiteContentPage = () => {
  const queryClient = useQueryClient()

  const [editing, setEditing] = useState<SectionSpec | null>(null)
  const [editValue, setEditValue] = useState<Record<string, unknown>>({})

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () =>
      sdk.client.fetch<{ site_sections: SiteSectionDTO[] }>(
        "/admin/site-sections"
      ),
  })

  const sections = Object.fromEntries(
    (data?.site_sections ?? []).map((s) => [s.key, s.value])
  )

  const saveMutation = useMutation({
    mutationFn: ({ key, value }: { key: string; value: unknown }) =>
      sdk.client.fetch(`/admin/site-sections/${key}`, {
        method: "POST",
        body: { value },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
      setEditing(null)
      toast.success("Sección actualizada")
    },
    onError: (e: Error) => toast.error(e.message),
  })

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <Heading level="h1">Contenido del sitio</Heading>
        <Text size="small" leading="compact" className="text-ui-fg-subtle">
          Textos e imágenes del home, la barra superior, el footer y el logo.
          Las categorías del menú se administran en Productos → Categorías.
        </Text>
      </div>

      {isLoading ? (
        <div className="px-6 py-8">
          <Text size="small" className="text-ui-fg-subtle">
            Cargando…
          </Text>
        </div>
      ) : (
        <div className="divide-y">
          {SECTION_SPECS.map((spec) => (
            <div
              key={spec.key}
              className="flex items-center justify-between px-6 py-4"
            >
              <div>
                <Text size="small" leading="compact" weight="plus">
                  {spec.label}
                </Text>
                <Text
                  size="small"
                  leading="compact"
                  className="text-ui-fg-subtle"
                >
                  {spec.description}
                </Text>
              </div>
              <Button
                size="small"
                variant="secondary"
                onClick={() => {
                  setEditing(spec)
                  setEditValue(sections[spec.key] ?? {})
                }}
              >
                Editar
              </Button>
            </div>
          ))}
        </div>
      )}

      <Drawer
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <Drawer.Content className="w-full max-w-xl">
          <Drawer.Header>
            <Drawer.Title>{editing?.label}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="overflow-auto">
            {editing && (
              <SectionForm
                spec={editing}
                value={editValue}
                onChange={setEditValue}
              />
            )}
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button size="small" variant="secondary">
                Cancelar
              </Button>
            </Drawer.Close>
            <Button
              size="small"
              isLoading={saveMutation.isPending}
              disabled={saveMutation.isPending}
              onClick={() =>
                editing &&
                saveMutation.mutate({ key: editing.key, value: editValue })
              }
            >
              Guardar
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Contenido del sitio",
  icon: Photo,
})

export default SiteContentPage
