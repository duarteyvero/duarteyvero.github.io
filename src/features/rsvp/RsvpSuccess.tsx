import { weddingDate } from '@/content/wedding'
import { formatDayMonth } from '@/lib/date'

type RsvpSuccessProps = { attending: boolean; onAnother: () => void }

export function RsvpSuccess({ attending, onAnother }: RsvpSuccessProps) {
  return (
    <div role="status" className="border-y border-white/20 py-14 text-center">
      <p className="font-script text-[44px] leading-tight text-sage">¡Gracias!</p>
      <p className="mx-auto mt-4 max-w-[460px] text-sm leading-loose text-mist">
        {attending
          ? `Hemos recibido tu respuesta. Nos vemos el ${formatDayMonth(weddingDate)}.`
          : 'Hemos recibido tu respuesta. Te echaremos de menos, ¡brindaremos por ti!'}
      </p>
      <button
        type="button"
        onClick={onAnother}
        className="mt-8 cursor-pointer border-b border-white/40 pb-1 text-micro tracking-[.25em] text-white uppercase"
      >
        Enviar otra respuesta
      </button>
    </div>
  )
}
