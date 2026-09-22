import { Button, Input, Popconfirm, Space, Table, Tag, type TableColumnsType } from 'antd'
import { useState } from 'react'
import { formatDateTime } from '@/lib/date'
import type { RsvpWithGuests } from './admin.service'
import { GuestsTable } from './GuestsTable'
import { fullName, primaryGuest } from './rsvp.stats'

type RsvpTableProps = {
  rsvps: RsvpWithGuests[]
  loading: boolean
  onEdit: (rsvp: RsvpWithGuests) => void
  onDelete: (id: string) => Promise<void>
}

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()

export function RsvpTable({ rsvps, loading, onEdit, onDelete }: RsvpTableProps) {
  const [query, setQuery] = useState('')
  const needle = normalize(query.trim())

  // Busca en todas las personas de la respuesta, no solo en el titular
  const visible = needle
    ? rsvps.filter((rsvp) =>
        rsvp.guests.some((guest) => normalize(fullName(guest)).includes(needle)),
      )
    : rsvps

  const columns: TableColumnsType<RsvpWithGuests> = [
    {
      title: 'Titular',
      render: (_, rsvp) => {
        const primary = primaryGuest(rsvp)
        return primary ? fullName(primary) : '—'
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
      title: 'Recibida',
      dataIndex: 'created_at',
      sorter: (a, b) => a.created_at.localeCompare(b.created_at),
      render: formatDateTime,
    },
    {
      title: '',
      align: 'right',
      render: (_, rsvp) => (
        <Space size={0}>
          <Button type="text" size="small" onClick={() => onEdit(rsvp)}>
            Editar
          </Button>
          <Popconfirm
            title="¿Borrar esta respuesta?"
            description="Se borrarán también sus acompañantes."
            okText="Borrar"
            cancelText="Cancelar"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(rsvp.id)}
          >
            <Button type="text" danger size="small">
              Borrar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

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
        columns={columns}
        scroll={{ x: true }}
        pagination={{ pageSize: 25, hideOnSinglePage: true }}
        expandable={{
          expandedRowRender: (rsvp) => (
            <GuestsTable guests={rsvp.guests} attending={rsvp.attending} message={rsvp.message} />
          ),
        }}
      />
    </div>
  )
}
