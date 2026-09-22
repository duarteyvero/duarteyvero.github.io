import { getSupabase } from '@/lib/supabase'
import { toPayload, type RsvpFormValues } from '@/features/rsvp/rsvp.schema'
import type { Tables } from '@/types/database'

export type Guest = Tables<'guests'>
export type RsvpWithGuests = Tables<'rsvps'> & { guests: Guest[] }

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

export async function deleteRsvp(id: string) {
  const { error } = await getSupabase().from('rsvps').delete().eq('id', id)
  if (error) throw error
}

/** Sustituye la respuesta completa (asistencia, mensaje y personas) en una transacción */
export async function updateRsvp(id: string, values: RsvpFormValues) {
  const { error } = await getSupabase().rpc('update_rsvp', {
    target_id: id,
    payload: toPayload(values),
  })

  if (error) {
    // 22023 = validación propia de la función: su mensaje ya es legible
    throw new Error(error.code === '22023' ? error.message : 'No se han podido guardar los cambios')
  }
}
