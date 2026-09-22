import type { GuestValues } from '@/features/rsvp/rsvp.schema'
import type { AdminRsvpValues, Guest, RsvpWithGuests } from './admin.service'

const toGuestValues = (guest: Guest): GuestValues => ({
  firstName: guest.first_name,
  lastName: guest.last_name,
  allergies: guest.allergies ?? undefined,
  needsBus: guest.needs_bus ?? undefined,
  favoriteSong: guest.favorite_song ?? undefined,
})

/** Fila de BD → valores del formulario, para editarla en /admin */
export function toFormValues(rsvp: RsvpWithGuests): AdminRsvpValues {
  const [primary, ...companions] = [...rsvp.guests].sort((a, b) => a.position - b.position)

  return {
    attending: rsvp.attending,
    message: rsvp.message ?? undefined,
    adminNote: rsvp.admin_note ?? undefined,
    primary: primary ? toGuestValues(primary) : { firstName: '', lastName: '' },
    companions: companions.map(toGuestValues),
  }
}
