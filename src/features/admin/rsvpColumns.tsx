import { Tag, type TableColumnsType } from 'antd'
import { formatDateTime } from '@/lib/date'
import type { RsvpWithGuests } from './admin.service'
import { RsvpRowActions } from './RsvpRowActions'
import { fullName, primaryGuest } from './rsvp.stats'

type ColumnsOptions = {
  duplicates: Set<string>
  onEdit: (rsvp: RsvpWithGuests) => void
  onDelete: (id: string) => Promise<void>
}

export const hasDuplicate = (rsvp: RsvpWithGuests, duplicates: Set<string>) =>
  rsvp.guests.some((guest) => duplicates.has(guest.id))

type Flag = 'duplicate' | 'manual' | 'note'

const flagMatches: Record<Flag, (rsvp: RsvpWithGuests, duplicates: Set<string>) => boolean> = {
  duplicate: hasDuplicate,
  manual: (rsvp) => rsvp.source === 'admin',
  note: (rsvp) => Boolean(rsvp.admin_note),
}

export function rsvpColumns({
  duplicates,
  onEdit,
  onDelete,
}: ColumnsOptions): TableColumnsType<RsvpWithGuests> {
  return [
    {
      title: 'Titular',
      filters: [
        { text: 'Posibles duplicados', value: 'duplicate' },
        { text: 'Añadidas a mano', value: 'manual' },
        { text: 'Con nota privada', value: 'note' },
      ],
      onFilter: (flag, rsvp) => flagMatches[flag as Flag](rsvp, duplicates),
      render: (_, rsvp) => {
        const primary = primaryGuest(rsvp)
        return (
          <span className="inline-flex flex-wrap items-center gap-1">
            <span className="mr-1">{primary ? fullName(primary) : '—'}</span>
            {rsvp.source === 'admin' && <Tag>A mano</Tag>}
            {hasDuplicate(rsvp, duplicates) && <Tag color="orange">¿Duplicado?</Tag>}
          </span>
        )
      },
    },
    {
      title: 'Asiste',
      dataIndex: 'attending',
      filters: [
        { text: 'Sí', value: true },
        { text: 'No', value: false },
      ],
      onFilter: (value, rsvp) => rsvp.attending === value,
      render: (attending: boolean) => (
        <Tag color={attending ? 'green' : 'red'}>{attending ? 'Sí' : 'No'}</Tag>
      ),
    },
    {
      title: 'Personas',
      align: 'center',
      render: (_, rsvp) => (rsvp.attending ? rsvp.guests.length : 0),
    },
    {
      title: 'Autobús',
      align: 'center',
      render: (_, rsvp) => rsvp.guests.filter((guest) => guest.needs_bus).length,
    },
    {
      title: 'Nota privada',
      dataIndex: 'admin_note',
      ellipsis: true,
      render: (note: string | null) => note ?? '—',
    },
    {
      title: 'Recibida',
      dataIndex: 'created_at',
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      render: formatDateTime,
    },
    {
      title: '',
      align: 'right',
      render: (_, rsvp) => (
        <RsvpRowActions onEdit={() => onEdit(rsvp)} onDelete={() => onDelete(rsvp.id)} />
      ),
    },
  ]
}
