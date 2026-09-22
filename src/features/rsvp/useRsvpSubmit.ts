import { useCallback, useRef, useState } from 'react'
import type { RsvpFormValues } from './rsvp.schema'
import { submitRsvp } from './rsvp.service'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function useRsvpSubmit() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string>()
  const inFlight = useRef(false)

  const submit = useCallback(async (values: RsvpFormValues) => {
    // Evita dobles envíos aunque el botón reciba dos clics antes de re-renderizar
    if (inFlight.current) return
    inFlight.current = true
    setStatus('submitting')
    setError(undefined)

    try {
      await submitRsvp(values)
      setStatus('success')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setStatus('error')
    } finally {
      inFlight.current = false
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(undefined)
  }, [])

  return { status, error, submit, reset }
}
