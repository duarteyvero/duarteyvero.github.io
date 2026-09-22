import { useCallback, useEffect, useState } from 'react'
import {
  createRsvp,
  deleteRsvp,
  fetchRsvps,
  updateRsvp,
  type AdminRsvpValues,
  type RsvpWithGuests,
} from './admin.service'

export function useRsvps() {
  const [rsvps, setRsvps] = useState<RsvpWithGuests[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  const load = useCallback(
    () =>
      fetchRsvps()
        .then((data) => {
          setRsvps(data)
          setError(undefined)
        })
        .catch(() => setError('No se han podido cargar las respuestas.'))
        .finally(() => setLoading(false)),
    [],
  )

  useEffect(() => {
    void load()
  }, [load])

  const reload = useCallback(() => {
    setLoading(true)
    return load()
  }, [load])

  const remove = useCallback(async (id: string) => {
    await deleteRsvp(id)
    setRsvps((current) => current.filter((rsvp) => rsvp.id !== id))
  }, [])

  // Crear o editar reescribe personas en BD (ids nuevos): se recarga en vez de parchear el estado
  const create = useCallback(
    async (values: AdminRsvpValues) => {
      await createRsvp(values)
      await load()
    },
    [load],
  )

  const update = useCallback(
    async (id: string, values: AdminRsvpValues) => {
      await updateRsvp(id, values)
      await load()
    },
    [load],
  )

  return { rsvps, loading, error, reload, create, update, remove }
}
