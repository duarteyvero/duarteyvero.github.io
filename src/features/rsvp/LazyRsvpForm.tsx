import { lazy, Suspense, useState } from 'react'
import { OutlineButton } from '@/components/ui/OutlineButton'
import { rsvp } from '@/content/wedding'

// antd + Supabase van en un trozo aparte: solo se descargan si el invitado va a confirmar
const loadForm = () => Promise.all([import('@/theme/AntdProvider'), import('./RsvpForm')])

const RsvpFormWithProviders = lazy(async () => {
  const [{ AntdProvider }, { RsvpForm }] = await loadForm()

  return {
    default: () => (
      <AntdProvider>
        <RsvpForm />
      </AntdProvider>
    ),
  }
})

export function LazyRsvpForm() {
  const [isOpen, setIsOpen] = useState(false)

  if (!isOpen) {
    return (
      <div className="text-center">
        <OutlineButton
          tone="dark"
          aria-controls="rsvp-form"
          aria-expanded={false}
          // Precarga en cuanto hay intención (hover/foco/toque) para que al pulsar ya esté listo
          onPointerEnter={loadForm}
          onFocus={loadForm}
          onClick={() => setIsOpen(true)}
        >
          {rsvp.cta}
        </OutlineButton>
      </div>
    )
  }

  return (
    <div id="rsvp-form" className="mt-14">
      <Suspense
        fallback={<p className="py-20 text-center text-sm text-mist">Cargando formulario…</p>}
      >
        <RsvpFormWithProviders />
      </Suspense>
    </div>
  )
}
