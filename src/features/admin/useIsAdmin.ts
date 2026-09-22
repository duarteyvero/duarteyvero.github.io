import { useEffect, useState } from 'react'
import { isCurrentUserAdmin } from './admin.service'

type AdminState = 'checking' | 'admin' | 'forbidden' | 'error'

export function useIsAdmin(userId: string | undefined): AdminState {
  const [state, setState] = useState<{ userId?: string; value: AdminState }>({ value: 'checking' })

  useEffect(() => {
    if (!userId) return
    let active = true

    isCurrentUserAdmin(userId)
      .then((isAdmin) => active && setState({ userId, value: isAdmin ? 'admin' : 'forbidden' }))
      .catch(() => active && setState({ userId, value: 'error' }))

    return () => {
      active = false
    }
  }, [userId])

  // Si cambia de usuario, el resultado anterior deja de valer
  return state.userId === userId ? state.value : 'checking'
}
