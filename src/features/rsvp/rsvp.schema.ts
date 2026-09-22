import type { Rule } from 'antd/es/form'

/** Mismos límites que los `check` de supabase/migrations */
export const LIMITS = {
  name: 80,
  allergies: 300,
  favoriteSong: 150,
  message: 1000,
  companions: 20,
} as const

export type GuestValues = {
  firstName: string
  lastName: string
  allergies?: string
  needsBus?: boolean
  favoriteSong?: string
}

export type RsvpFormValues = {
  primary: GuestValues
  attending?: boolean
  companions?: GuestValues[]
  message?: string
  /** Honeypot: los humanos no lo ven */
  website?: string
}

/** Lo que recibe la función `submit_rsvp`: guests[0] = titular */
export type RsvpPayload = {
  attending: boolean
  message: string | null
  website: string
  guests: GuestValues[]
}

const trimmed = (value?: string) => value?.trim() || undefined

export function toPayload(values: RsvpFormValues): RsvpPayload {
  const attending = values.attending === true
  const people = attending ? [values.primary, ...(values.companions ?? [])] : [values.primary]

  return {
    attending,
    message: trimmed(values.message) ?? null,
    website: values.website ?? '',
    guests: people.map((guest) => ({
      firstName: guest.firstName.trim(),
      lastName: guest.lastName.trim(),
      ...(attending && {
        allergies: trimmed(guest.allergies),
        needsBus: guest.needsBus,
        favoriteSong: trimmed(guest.favoriteSong),
      }),
    })),
  }
}

export const rules = {
  requiredText: (message: string, max: number): Rule[] => [
    { required: true, whitespace: true, message },
    { max, message: `Máximo ${max} caracteres` },
  ],
  optionalText: (max: number): Rule[] => [{ max, message: `Máximo ${max} caracteres` }],
  requiredChoice: (message: string): Rule[] => [{ required: true, message }],
}
