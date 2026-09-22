import type { PostgrestError } from '@supabase/supabase-js'
import { toPayload, type RsvpFormValues } from '@/features/rsvp/rsvp.schema'
import { getSupabase } from '@/lib/supabase'
import type { Tables } from '@/types/database'

export type Guest = Tables<'guests'>
export type RsvpWithGuests = Tables<'rsvps'> & { guests: Guest[] }

/** Formulario del panel: el del invitado + la nota privada de los novios */
export type AdminRsvpValues = RsvpFormValues & { adminNote?: string }

/** Mismo límite que el `check` de rsvps.admin_note */
export const ADMIN_NOTE_MAX = 1000

const toAdminPayload = ({ adminNote, ...values }: AdminRsvpValues) => ({
  ...toPayload(values),
  adminNote: adminNote?.trim() || null,
})

// 22023 = validación propia de las funciones SQL: su mensaje ya es legible
const saveError = (error: PostgrestError) =>
  new Error(error.code === '22023' ? error.message : 'No se han podido guardar los cambios')

export async function signIn(email: string, password: string) {
  const { error } = await getSupabase().auth.signInWithPassword({ email, password })
  if (error) throw new Error('Email o contraseña incorrectos')
}

export async function signOut() {
  await getSupabase().auth.signOut()
}

export async function isCurrentUserAdmin(userId: string): Promise<boolean> {
  const { data, error } = await getSupabase()
    .from('admins')
    .select('user_id')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return data !== null
}

export async function fetchRsvps(): Promise<RsvpWithGuests[]> {
  const { data, error } = await getSupabase()
    .from('rsvps')
    .select('*, guests(*)')
    .order('created_at', { ascending: false })
    .order('position', { referencedTable: 'guests' })

  if (error) throw error
  return data
}

/** Respuesta añadida a mano (WhatsApp, teléfono…) */
export async function createRsvp(values: AdminRsvpValues) {
  const { error } = await getSupabase().rpc('create_rsvp', { payload: toAdminPayload(values) })
  if (error) throw saveError(error)
}

/** Sustituye la respuesta completa (asistencia, mensaje, nota y personas) en una transacción */
export async function updateRsvp(id: string, values: AdminRsvpValues) {
  const { error } = await getSupabase().rpc('update_rsvp', {
    target_id: id,
    payload: toAdminPayload(values),
  })
  if (error) throw saveError(error)
}

export async function deleteRsvp(id: string) {
  const { error } = await getSupabase().from('rsvps').delete().eq('id', id)
  if (error) throw error
}
