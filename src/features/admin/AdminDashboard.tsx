import { Alert, App, Button, Space, Tabs } from 'antd'
import { useState } from 'react'
import type { AdminRsvpValues, RsvpWithGuests } from './admin.service'
import { AdminShell } from './AdminShell'
import { ExportMenu } from './ExportMenu'
import { GuestNotesList } from './GuestNotesList'
import { duplicateGuestIds, guestNotes } from './rsvp.stats'
import { RsvpModal } from './RsvpModal'
import { RsvpSummary } from './RsvpSummary'
import { RsvpTable } from './RsvpTable'
import { SignOutButton } from './SignOutButton'
import { useRsvps } from './useRsvps'

/** `undefined` = cerrado; `{}` = nueva respuesta; `{ rsvp }` = editar */
type ModalState = { rsvp?: RsvpWithGuests } | undefined

export function AdminDashboard() {
  const { rsvps, loading, error, reload, create, update, remove } = useRsvps()
  const { message } = App.useApp()
  const [modal, setModal] = useState<ModalState>()
  const duplicates = duplicateGuestIds(rsvps)

  const handleSave = async (values: AdminRsvpValues) => {
    const editing = modal?.rsvp
    await (editing ? update(editing.id, values) : create(values))
    message.success(editing ? 'Respuesta actualizada' : 'Respuesta añadida')
  }

  const handleDelete = async (id: string) => {
    try {
      await remove(id)
      message.success('Respuesta borrada')
    } catch {
      message.error('No se ha podido borrar')
    }
  }

  return (
    <AdminShell
      actions={
        <Space wrap>
          <Button type="primary" onClick={() => setModal({})}>
            + Nueva respuesta
          </Button>
          <Button onClick={() => void reload()} loading={loading}>
            Actualizar
          </Button>
          <ExportMenu rsvps={rsvps} />
          <SignOutButton />
        </Space>
      }
    >
      <div className="flex flex-col gap-10">
        {error && <Alert type="error" showIcon title={error} />}

        <RsvpSummary rsvps={rsvps} />

        {duplicates.size > 0 && (
          <Alert
            type="warning"
            showIcon
            title={`Hay ${duplicates.size} personas con el nombre repetido`}
            description="Filtra la tabla por «Posibles duplicados» para revisarlas y borrar o editar la que sobre."
          />
        )}

        <Tabs
          items={[
            {
              key: 'rsvps',
              label: 'Respuestas',
              children: (
                <RsvpTable
                  rsvps={rsvps}
                  loading={loading}
                  duplicates={duplicates}
                  onEdit={(rsvp) => setModal({ rsvp })}
                  onDelete={handleDelete}
                />
              ),
            },
            {
              key: 'allergies',
              label: 'Alergias',
              children: (
                <GuestNotesList
                  notes={guestNotes(rsvps, 'allergies')}
                  empty="Nadie ha indicado alergias"
                />
              ),
            },
            {
              key: 'songs',
              label: 'Canciones',
              children: (
                <GuestNotesList
                  notes={guestNotes(rsvps, 'favorite_song')}
                  empty="Todavía no hay canciones"
                />
              ),
            },
          ]}
        />

        <RsvpModal
          open={modal !== undefined}
          rsvp={modal?.rsvp}
          onSave={handleSave}
          onClose={() => setModal(undefined)}
        />
      </div>
    </AdminShell>
  )
}
