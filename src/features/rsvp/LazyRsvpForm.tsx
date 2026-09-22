import { lazy, Suspense } from 'react'

// antd + Supabase van en un trozo aparte: se descargan en paralelo sin bloquear la invitación
const RsvpFormWithProviders = lazy(async () => {
  const [{ AntdProvider }, { RsvpForm }] = await Promise.all([
    import('@/theme/AntdProvider'),
    import('./RsvpForm'),
  ])

  return {
    default: () => (
      <AntdProvider>
        <RsvpForm />
      </AntdProvider>
    ),
  }
})

export function LazyRsvpForm() {
  return (
    <Suspense
      fallback={<p className="py-20 text-center text-sm text-mist">Cargando formulario…</p>}
    >
      <RsvpFormWithProviders />
    </Suspense>
  )
}
