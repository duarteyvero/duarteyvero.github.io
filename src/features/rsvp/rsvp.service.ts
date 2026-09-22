import { getSupabase } from '@/lib/supabase'
import { toPayload, type RsvpFormValues } from './rsvp.schema'

export async function submitRsvp(values: RsvpFormValues): Promise<void> {
  const { error } = await getSupabase().rpc('submit_rsvp', { payload: toPayload(values) })

  if (error) {
    // 22023 = validación propia de submit_rsvp: su mensaje ya está pensado para el invitado
    throw new Error(
      error.code === '22023'
        ? error.message
        : 'No hemos podido guardar tu respuesta. Inténtalo de nuevo en unos minutos.',
    )
  }
}
