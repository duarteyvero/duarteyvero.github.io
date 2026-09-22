import { formatDateTime } from '@/lib/date'
import { downloadCsv } from '@/lib/csv'
import type { RsvpWithGuests } from './admin.service'

/** Una fila por persona: sirve para catering, autobús y DJ */
export function exportGuestsCsv(rsvps: RsvpWithGuests[]) {
  const rows = rsvps.flatMap((rsvp) => rsvp.guests.map((guest) => ({ rsvp, guest })))

  downloadCsv('invitados-boda.csv', rows, [
    { header: 'Nombre', value: ({ guest }) => guest.first_name },
    { header: 'Apellidos', value: ({ guest }) => guest.last_name },
    { header: 'Tipo', value: ({ guest }) => (guest.is_primary ? 'Titular' : 'Acompañante') },
    { header: 'Asiste', value: ({ rsvp }) => rsvp.attending },
    { header: 'Alergias', value: ({ guest }) => guest.allergies },
    { header: 'Autobús', value: ({ guest }) => guest.needs_bus },
    { header: 'Canción', value: ({ guest }) => guest.favorite_song },
    { header: 'Mensaje', value: ({ rsvp, guest }) => (guest.is_primary ? rsvp.message : null) },
    { header: 'Fecha respuesta', value: ({ rsvp }) => formatDateTime(rsvp.created_at) },
  ])
}
