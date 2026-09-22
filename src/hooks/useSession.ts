import type { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { getSupabase } from '@/lib/supabase'

type SessionState =
  | { status: 'loading' }
  | { status: 'ready'; session: Session | null }
  | { status: 'error'; error: Error }

function initialState(): SessionState {
  try {
    getSupabase()
    return { status: 'loading' }
  } catch (error) {
    return { status: 'error', error: error as Error }
  }
}

export function useSession(): SessionState {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    let supabase: ReturnType<typeof getSupabase>
    try {
      supabase = getSupabase()
    } catch {
      return // el error ya está reflejado en el estado inicial
    }

    // onAuthStateChange emite INITIAL_SESSION al suscribirse: no hace falta getSession().
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ status: 'ready', session })
    })

    return () => data.subscription.unsubscribe()
  }, [])

  return state
}
