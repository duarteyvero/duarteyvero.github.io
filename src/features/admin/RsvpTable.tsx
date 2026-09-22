import { Input, Table } from 'antd'
import { useState } from 'react'
import { normalizeText } from '@/lib/text'
import type { RsvpWithGuests } from './admin.service'
import { GuestsTable } from './GuestsTable'
import { rsvpColumns } from './rsvpColumns'
import { fullName } from './rsvp.stats'

type RsvpTableProps = {
  rsvps: RsvpWithGuests[]
  loading: boolean
  duplicates: Set<string>
  onEdit: (rsvp: RsvpWithGuests) => void
  onDelete: (id: string) => Promise<void>
}

export function RsvpTable({ rsvps, loading, duplicates, onEdit, onDelete }: RsvpTableProps) {
  const [query, setQuery] = useState('')
  const needle = normalizeText(query)

  // Busca en todas las personas de la respuesta, no solo en el titular
  const visible = needle
    ? rsvps.filter((rsvp) =>
        rsvp.guests.some((guest) => normalizeText(fullName(guest)).includes(needle)),
      )
    : rsvps

  return (
    <div className="flex flex-col gap-4">
      <Input.Search
        allowClear
        placeholder="Buscar por nombre o apellidos"
        onChange={(event) => setQuery(event.target.value)}
        className="max-w-[360px]"
      />
      <Table<RsvpWithGuests>
        rowKey="id"
        loading={loading}
        dataSource={visible}
        columns={rsvpColumns({ duplicates, onEdit, onDelete })}
        scroll={{ x: true }}
        pagination={{ pageSize: 25, hideOnSinglePage: true }}
        expandable={{
          expandedRowRender: (rsvp) => <GuestsTable rsvp={rsvp} duplicates={duplicates} />,
        }}
      />
    </div>
  )
}
