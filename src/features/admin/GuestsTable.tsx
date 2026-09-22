import { Table, Tag } from 'antd'
import type { Guest } from './admin.service'

type GuestsTableProps = { guests: Guest[]; attending: boolean; message: string | null }

const yesNo = (value: boolean | null) =>
  value === null ? '—' : <Tag color={value ? 'green' : 'default'}>{value ? 'Sí' : 'No'}</Tag>

/** Detalle de una respuesta: una fila por persona */
export function GuestsTable({ guests, attending, message }: GuestsTableProps) {
  return (
    <div className="flex flex-col gap-4 py-2">
      <Table<Guest>
        size="small"
        rowKey="id"
        pagination={false}
        dataSource={guests}
        scroll={{ x: true }}
        columns={[
          {
            title: 'Persona',
            render: (_, guest) => (
              <>
                {guest.first_name} {guest.last_name}{' '}
                {guest.is_primary && <Tag className="ml-1">Titular</Tag>}
              </>
            ),
          },
          ...(attending
            ? [
                {
                  title: 'Alergias',
                  dataIndex: 'allergies',
                  render: (v: string | null) => v ?? '—',
                },
                { title: 'Autobús', dataIndex: 'needs_bus', render: yesNo },
                {
                  title: 'Canción',
                  dataIndex: 'favorite_song',
                  render: (v: string | null) => v ?? '—',
                },
              ]
            : []),
        ]}
      />
      {message && (
        <blockquote className="m-0 border-l-2 border-olive/40 pl-4 font-serif text-lg text-body italic">
          “{message}”
        </blockquote>
      )}
    </div>
  )
}
