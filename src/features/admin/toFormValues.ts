import type { GuestValues, RsvpFormValues } from '@/features/rsvp/rsvp.schema'
import type { Guest, RsvpWithGuests } from './admin.service'

const toGuestValues = (guest: Guest): GuestValues => ({
  firstName: guest.first_name,
  lastName: guest.last_name,
  allergies: guest.allergies ?? undefined,
  needsBus: guest.needs_bus ?? undefined,
  favoriteSong: guest.favorite_song ?? undefined,
})

/** Fila de BD → valores del formulario RSVP, para editarla en /admin */
export function toFormValues(rsvp: RsvpWithGuests): RsvpFormValues {
  const [primary, ...companions] = [...rsvp.guests].sort((a, b) => a.position - b.position)

  return {
    attending: rsvp.attending,
    message: rsvp.message ?? undefined,
    primary: primary ? toGuestValues(primary) : { firstName: '', lastName: '' },
    companions: companions.map(toGuestValues),
  }
}
