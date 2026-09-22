import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

let client: SupabaseClient<Database> | undefined

/**
 * Única instancia del cliente. Se crea bajo demanda para que la invitación
 * cargue aunque falten las variables de entorno (p. ej. en local sin .env.local).
 */
export function getSupabase(): SupabaseClient<Database> {
  if (client) return client

  const url = import.meta.env.VITE_SUPABASE_URL
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    throw new Error('Faltan VITE_SUPABASE_URL y/o VITE_SUPABASE_ANON_KEY (ver .env.example)')
  }

  client = createClient<Database>(url, anonKey)
  return client
}
