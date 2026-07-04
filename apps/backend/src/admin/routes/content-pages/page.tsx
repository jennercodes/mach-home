import { defineRouteConfig } from "@medusajs/admin-sdk"
import { DocumentText, EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons"
import {
  Badge,
  Button,
  Container,
  Drawer,
  DropdownMenu,
  FocusModal,
  Heading,
  IconButton,
  Table,
  Text,
  toast,
  usePrompt,
} from "@medusajs/ui"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { sdk } from "../../lib/sdk"
import { ContentPageForm } from "./components/content-page-form"
import {
  ContentPageDTO,
  ContentPageFormValues,
  emptyFormValues,
  toFormValues,
  toPayload,
} from "./types"

const QUERY_KEY = ["content-pages"]

const ContentPagesPage = () => {
  const queryClient = useQueryClient()
  const prompt = usePrompt()

  const [createOpen, setCreateOpen] = useState(false)
  const [createValues, setCreateValues] =
    useState<ContentPageFormValues>(emptyFormValues)

  const [editing, setEditing] = useState<ContentPageDTO | null>(null)
  const [editValues, setEditValues] =
    useState<ContentPageFormValues>(emptyFormValues)

  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () =>
      sdk.client.fetch<{ content_pages: ContentPageDTO[] }>(
        "/admin/content-pages"
      ),
  })

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY })

  const createMutation = useMutation({
    mutationFn: (values: ContentPageFormValues) =>
      sdk.client.fetch("/admin/content-pages", {
        method: "POST",
        body: toPayload(values),
      }),
    onSuccess: () => {
      invalidate()
      setCreateOpen(false)
      setCreateValues(emptyFormValues)
      toast.success("Página creada")
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, values }: { id: string; values: ContentPageFormValues }) =>
      sdk.client.fetch(`/admin/content-pages/${id}`, {
        method: "POST",
        body: toPayload(values),
      }),
    onSuccess: () => {
      invalidate()
      setEditing(null)
      toast.success("Página actualizada")
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      sdk.client.fetch(`/admin/content-pages/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      invalidate()
      toast.success("Página eliminada")
    },
    onError: (e: Error) => toast.error(e.message),
  })

  const handleDelete = async (page: ContentPageDTO) => {
    const confirmed = await prompt({
      title: "Eliminar página",
      description: `¿Eliminar "/${page.slug}"? El storefront dejará de mostrarla.`,
      confirmText: "Eliminar",
      cancelText: "Cancelar",
    })
    if (confirmed) {
      deleteMutation.mutate(page.id)
    }
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h1">Páginas de contenido</Heading>
          <Text size="small" leading="compact" className="text-ui-fg-subtle">
            Contenido de las páginas informativas del storefront (FAQ,
            tiendas, políticas, etc.)
          </Text>
        </div>
        <Button size="small" onClick={() => setCreateOpen(true)}>
          Crear página
        </Button>
      </div>

      {isLoading ? (
        <div className="px-6 py-8">
          <Text size="small" className="text-ui-fg-subtle">
            Cargando…
          </Text>
        </div>
      ) : (
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Slug</Table.HeaderCell>
              <Table.HeaderCell>Título</Table.HeaderCell>
              <Table.HeaderCell>Bloques</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {(data?.content_pages ?? []).map((page) => (
              <Table.Row key={page.id}>
                <Table.Cell>
                  <Text size="small" weight="plus">
                    /{page.slug}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  {page.title}
                  {page.title_em ?? ""}
                </Table.Cell>
                <Table.Cell>{page.blocks?.length ?? 0}</Table.Cell>
                <Table.Cell>
                  {page.published ? (
                    <Badge size="2xsmall" color="green">
                      Publicada
                    </Badge>
                  ) : (
                    <Badge size="2xsmall" color="grey">
                      Borrador
                    </Badge>
                  )}
                </Table.Cell>
                <Table.Cell className="text-right">
                  <DropdownMenu>
                    <DropdownMenu.Trigger asChild>
                      <IconButton size="small" variant="transparent">
                        <EllipsisHorizontal />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        className="gap-x-2"
                        onClick={() => {
                          setEditing(page)
                          setEditValues(toFormValues(page))
                        }}
                      >
                        <PencilSquare className="text-ui-fg-subtle" />
                        Editar
                      </DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item
                        className="gap-x-2"
                        onClick={() => handleDelete(page)}
                      >
                        <Trash className="text-ui-fg-subtle" />
                        Eliminar
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Crear */}
      <FocusModal open={createOpen} onOpenChange={setCreateOpen}>
        <FocusModal.Content>
          <FocusModal.Header>
            <div className="flex items-center justify-end gap-x-2">
              <FocusModal.Close asChild>
                <Button size="small" variant="secondary">
                  Cancelar
                </Button>
              </FocusModal.Close>
              <Button
                size="small"
                isLoading={createMutation.isPending}
                disabled={createMutation.isPending}
                onClick={() => createMutation.mutate(createValues)}
              >
                Guardar
              </Button>
            </div>
          </FocusModal.Header>
          <FocusModal.Body className="flex-1 overflow-auto">
            <div className="mx-auto w-full max-w-3xl px-6 py-8">
              <Heading level="h2" className="mb-6">
                Nueva página
              </Heading>
              <ContentPageForm
                values={createValues}
                onChange={setCreateValues}
              />
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>

      {/* Editar */}
      <Drawer
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <Drawer.Content className="w-full max-w-2xl">
          <Drawer.Header>
            <Drawer.Title>Editar /{editing?.slug}</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body className="overflow-auto">
            <ContentPageForm values={editValues} onChange={setEditValues} />
          </Drawer.Body>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button size="small" variant="secondary">
                Cancelar
              </Button>
            </Drawer.Close>
            <Button
              size="small"
              isLoading={updateMutation.isPending}
              disabled={updateMutation.isPending}
              onClick={() =>
                editing &&
                updateMutation.mutate({ id: editing.id, values: editValues })
              }
            >
              Guardar cambios
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Páginas de contenido",
  icon: DocumentText,
})

export default ContentPagesPage
