import { Button, Dropdown } from 'antd'
import type { RsvpWithGuests } from './admin.service'
import { exportCsv, exportOptions } from './exports'

/** Un CSV por destinatario: catering, autobús, DJ… o todo junto */
export function ExportMenu({ rsvps }: { rsvps: RsvpWithGuests[] }) {
  return (
    <Dropdown
      disabled={rsvps.length === 0}
      menu={{
        items: exportOptions.map(({ kind, label }) => ({ key: kind, label })),
        onClick: ({ key }) => {
          const option = exportOptions.find((item) => item.kind === key)
          if (option) exportCsv(option.kind, rsvps)
        },
      }}
    >
      <Button>Exportar CSV ▾</Button>
    </Dropdown>
  )
}
