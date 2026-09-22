import { Statistic } from 'antd'
import type { RsvpWithGuests } from './admin.service'
import { summarize } from './rsvp.stats'

export function RsvpSummary({ rsvps }: { rsvps: RsvpWithGuests[] }) {
  const stats = summarize(rsvps)

  const items = [
    { title: 'Respuestas', value: stats.responses },
    { title: 'Personas que vienen', value: stats.attending },
    { title: 'No pueden venir', value: stats.declined },
    { title: 'Plazas de autobús', value: stats.bus },
    { title: 'Con alergias', value: stats.allergies },
  ]

  return (
    <div className="grid grid-cols-2 border-y border-line md:grid-cols-5">
      {items.map(({ title, value }) => (
        <div
          key={title}
          className="border-line px-4 py-6 max-md:odd:border-r md:not-last:border-r max-md:[&:not(:nth-last-child(-n+1))]:border-b"
        >
          <Statistic
            title={<span className="text-micro tracking-[.25em] uppercase">{title}</span>}
            value={value}
            styles={{ content: { fontFamily: 'var(--font-serif)', fontWeight: 300 } }}
          />
        </div>
      ))}
    </div>
  )
}
