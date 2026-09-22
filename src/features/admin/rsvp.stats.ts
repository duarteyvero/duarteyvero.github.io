import { normalizeText } from '@/lib/text'
import type { Guest, RsvpWithGuests } from './admin.service'

export const fullName = (guest: Pick<Guest, 'first_name' | 'last_name'>) =>
  `${guest.first_name} ${guest.last_name}`

export const primaryGuest = (rsvp: RsvpWithGuests) =>
  rsvp.guests.find((guest) => guest.is_primary) ?? rsvp.guests[0]

/** Todas las personas que vienen, en una lista plana */
export const attendingGuests = (rsvps: RsvpWithGuests[]) =>
  rsvps.filter((rsvp) => rsvp.attending).flatMap((rsvp) => rsvp.guests)

export function summarize(rsvps: RsvpWithGuests[]) {
  const coming = attendingGuests(rsvps)

  return {
    responses: rsvps.length,
    attending: coming.length,
    declined: rsvps.filter((rsvp) => !rsvp.attending).length,
    bus: coming.filter((guest) => guest.needs_bus).length,
    allergies: coming.filter((guest) => guest.allergies).length,
  }
}

export type GuestNote = { id: string; name: string; note: string }

/** Personas que vienen y han rellenado un campo de texto (alergias, canción…) */
export function guestNotes(
  rsvps: RsvpWithGuests[],
  field: 'allergies' | 'favorite_song',
): GuestNote[] {
  return attendingGuests(rsvps).flatMap((guest) => {
    const note = guest[field]
    return note ? [{ id: guest.id, name: fullName(guest), note }] : []
  })
}

/**
 * Ids de las personas cuyo nombre completo aparece más de una vez (en la misma
 * respuesta o en otras): suele ser alguien que ha confirmado dos veces
 */
export function duplicateGuestIds(rsvps: RsvpWithGuests[]): Set<string> {
  const byName = new Map<string, string[]>()

  for (const guest of rsvps.flatMap((rsvp) => rsvp.guests)) {
    const key = normalizeText(fullName(guest))
    byName.set(key, [...(byName.get(key) ?? []), guest.id])
  }

  return new Set([...byName.values()].filter((ids) => ids.length > 1).flat())
}
