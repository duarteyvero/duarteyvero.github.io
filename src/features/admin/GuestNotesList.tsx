import { Empty } from 'antd'
import type { GuestNote } from './rsvp.stats'

type GuestNotesListProps = { notes: GuestNote[]; empty: string }

/** Lista persona → nota. Sirve para alergias (catering) y canciones (DJ). */
export function GuestNotesList({ notes, empty }: GuestNotesListProps) {
  if (notes.length === 0) return <Empty description={empty} />

  return (
    <ul className="m-0 list-none divide-y divide-line p-0">
      {notes.map(({ id, name, note }) => (
        <li key={id} className="grid gap-1 py-4 md:grid-cols-[240px_1fr] md:gap-6">
          <span className="font-medium">{name}</span>
          <span className="text-body">{note}</span>
        </li>
      ))}
    </ul>
  )
}
