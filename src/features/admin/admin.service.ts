import { getSupabase } from '@/lib/supabase'
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
