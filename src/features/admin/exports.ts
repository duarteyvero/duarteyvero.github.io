import { downloadCsv, type CsvColumn } from '@/lib/csv'
import { formatDateTime } from '@/lib/date'
import type { Guest, RsvpWithGuests } from './admin.service'
import { fullName, primaryGuest } from './rsvp.stats'

type PersonRow = { rsvp: RsvpWithGuests; guest: Guest }

const peopleOf = (rsvps: RsvpWithGuests[], keep: (row: PersonRow) => boolean = () => true) =>
  rsvps.flatMap((rsvp) => rsvp.guests.map((guest) => ({ rsvp, guest }))).filter(keep)

const coming = ({ rsvp }: PersonRow) => rsvp.attending

const firstName: CsvColumn<PersonRow> = { header: 'Nombre', value: ({ guest }) => guest.first_name }
const lastName: CsvColumn<PersonRow> = {
  header: 'Apellidos',
  value: ({ guest }) => guest.last_name,
}

/** A qué respuesta pertenece: ayuda a localizar a un acompañante */
const responseOf: CsvColumn<PersonRow> = {
  header: 'Respuesta de',
  value: ({ rsvp }) => {
    const primary = primaryGuest(rsvp)
    return primary ? fullName(primary) : null
  },
}

export type ExportKind = 'all' | 'catering' | 'bus' | 'songs'

export const exportOptions: { kind: ExportKind; label: string }[] = [
  { kind: 'all', label: 'Todo (una fila por persona)' },
  { kind: 'catering', label: 'Catering: asistentes y alergias' },
  { kind: 'bus', label: 'Autobús: quién lo necesita' },
  { kind: 'songs', label: 'DJ: canciones' },
]

const exporters: Record<ExportKind, (rsvps: RsvpWithGuests[]) => void> = {
  all: (rsvps) =>
    downloadCsv('invitados-boda.csv', peopleOf(rsvps), [
      firstName,
      lastName,
      { header: 'Tipo', value: ({ guest }) => (guest.is_primary ? 'Titular' : 'Acompañante') },
      responseOf,
      { header: 'Asiste', value: ({ rsvp }) => rsvp.attending },
      { header: 'Alergias', value: ({ guest }) => guest.allergies },
      { header: 'Autobús', value: ({ guest }) => guest.needs_bus },
      { header: 'Canción', value: ({ guest }) => guest.favorite_song },
      { header: 'Mensaje', value: ({ rsvp, guest }) => (guest.is_primary ? rsvp.message : null) },
      {
        header: 'Nota privada',
        value: ({ rsvp, guest }) => (guest.is_primary ? rsvp.admin_note : null),
      },
      { header: 'Origen', value: ({ rsvp }) => (rsvp.source === 'admin' ? 'A mano' : 'Web') },
      { header: 'Fecha respuesta', value: ({ rsvp }) => formatDateTime(rsvp.created_at) },
    ]),

  catering: (rsvps) =>
    downloadCsv('catering-boda.csv', peopleOf(rsvps, coming), [
      firstName,
      lastName,
      responseOf,
      { header: 'Alergias / dieta', value: ({ guest }) => guest.allergies },
    ]),

  bus: (rsvps) =>
    downloadCsv(
      'autobus-boda.csv',
      peopleOf(rsvps, (row) => coming(row) && row.guest.needs_bus === true),
      [firstName, lastName, responseOf],
    ),

  songs: (rsvps) =>
    downloadCsv(
      'canciones-boda.csv',
      peopleOf(rsvps, (row) => coming(row) && Boolean(row.guest.favorite_song)),
      [
        { header: 'Canción', value: ({ guest }) => guest.favorite_song },
        { header: 'Pedida por', value: ({ guest }) => fullName(guest) },
      ],
    ),
}

export const exportCsv = (kind: ExportKind, rsvps: RsvpWithGuests[]) => exporters[kind](rsvps)
