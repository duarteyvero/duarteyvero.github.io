import { useState } from 'react'
import { useScrollLock } from './useScrollLock'

/** Lo que tarda la tapa en girar (coincide con `duration-1300` del componente) */
const OPEN_DURATION_MS = 1300

export type CoverState = 'closed' | 'opening' | 'open'

/** Estado de la tapa del pasaporte: cerrada → abriéndose → desmontada */
export function usePassportCover() {
  const [state, setState] = useState<CoverState>('closed')
  useScrollLock(state === 'closed')

  const open = () => {
    if (state !== 'closed') return
    setState('opening')
    window.setTimeout(() => setState('open'), OPEN_DURATION_MS)
  }

  return { state, open }
}
