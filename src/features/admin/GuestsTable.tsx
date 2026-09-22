import { Table, Tag } from 'antd'
import type { Guest, RsvpWithGuests } from './admin.service'

type GuestsTableProps = { rsvp: RsvpWithGuests; duplicates: Set<string> }

const yesNo = (value: boolean | null) =>
  value === null ? '—' : <Tag color={value ? 'green' : 'default'}>{value ? 'Sí' : 'No'}</Tag>

const text = (value: string | null) => value ?? '—'

/** Detalle de una respuesta: una fila por persona, mensaje y nota privada */
export function GuestsTable({ rsvp, duplicates }: GuestsTableProps) {
  return (
    <div className="flex flex-col gap-4 py-2">
      <Table<Guest>
        size="small"
        rowKey="id"
        pagination={false}
        dataSource={rsvp.guests}
        scroll={{ x: true }}
        columns={[
          {
            title: 'Persona',
            render: (_, guest) => (
              <span className="inline-flex flex-wrap items-center gap-1">
                <span className="mr-1">
                  {guest.first_name} {guest.last_name}
                </span>
                {guest.is_primary && <Tag>Titular</Tag>}
                {duplicates.has(guest.id) && <Tag color="orange">¿Duplicado?</Tag>}
              </span>
            ),
          },
          ...(rsvp.attending
            ? [
                { title: 'Alergias', dataIndex: 'allergies', render: text },
                { title: 'Autobús', dataIndex: 'needs_bus', render: yesNo },
                { title: 'Canción', dataIndex: 'favorite_song', render: text },
              ]
            : []),
        ]}
      />
      {rsvp.message && (
        <blockquote className="m-0 border-l-2 border-olive/40 pl-4 font-serif text-lg text-body italic">
          “{rsvp.message}”
        </blockquote>
      )}
      {rsvp.admin_note && (
        <p className="m-0 text-sm text-muted">
          <span className="mr-2 text-micro tracking-[.25em] text-olive uppercase">
            Nota privada
          </span>
          {rsvp.admin_note}
        </p>
      )}
    </div>
  )
}
