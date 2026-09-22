import { Alert, App, Button, Space, Tabs } from 'antd'
import { useState } from 'react'
import type { RsvpFormValues } from '@/features/rsvp/rsvp.schema'
import type { RsvpWithGuests } from './admin.service'
import { AdminShell } from './AdminShell'
import { exportGuestsCsv } from './exports'
import { GuestNotesList } from './GuestNotesList'
import { guestNotes } from './rsvp.stats'
import { RsvpEditModal } from './RsvpEditModal'
import { RsvpSummary } from './RsvpSummary'
import { RsvpTable } from './RsvpTable'
import { SignOutButton } from './SignOutButton'
import { useRsvps } from './useRsvps'

export function AdminDashboard() {
  const { rsvps, loading, error, reload, remove, update } = useRsvps()
  const { message } = App.useApp()
  const [editing, setEditing] = useState<RsvpWithGuests>()

  const handleSave = async (id: string, values: RsvpFormValues) => {
    await update(id, values)
    message.success('Respuesta actualizada')
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
          <Button onClick={() => void reload()} loading={loading}>
            Actualizar
          </Button>
          <Button onClick={() => exportGuestsCsv(rsvps)} disabled={rsvps.length === 0}>
            Exportar CSV
          </Button>
          <SignOutButton />
        </Space>
      }
    >
      <div className="flex flex-col gap-10">
        {error && <Alert type="error" showIcon title={error} />}

        <RsvpSummary rsvps={rsvps} />

        <Tabs
          items={[
            {
              key: 'rsvps',
              label: 'Respuestas',
              children: (
                <RsvpTable
                  rsvps={rsvps}
                  loading={loading}
                  onEdit={setEditing}
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

        <RsvpEditModal rsvp={editing} onSave={handleSave} onClose={() => setEditing(undefined)} />
      </div>
    </AdminShell>
  )
}
