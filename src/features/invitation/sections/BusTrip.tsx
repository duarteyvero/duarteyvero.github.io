import { Field } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'

type BusTripProps = { label: string; from: string; to: string; time: string }

/** Trayecto del autobús: origen → destino con la ruta punteada y la hora de salida */
export function BusTrip({ label, from, to, time }: BusTripProps) {
  return (
    <article
      aria-label={`${label}: de ${from} a ${to}`}
      className="rounded-xl border-[1.5px] border-line bg-white px-5 pt-4 pb-5 text-left shadow-[0_10px_24px_rgb(44_79_70/.08)]"
    >
      <p className="m-0 font-type text-kicker tracking-[.22em] text-coral uppercase">{label}</p>
      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p className="m-0 font-display text-[clamp(17px,4.8vw,22px)] leading-tight">{from}</p>
        <span aria-hidden className="flex items-center gap-1.5 text-green">
          <span className="w-5 border-t-2 border-dashed border-green/40" />
          <Icon name="bus" className="size-7" />
          <span className="w-5 border-t-2 border-dashed border-green/40" />
        </span>
        <p className="m-0 text-right font-display text-[clamp(17px,4.8vw,22px)] leading-tight">
          {to}
        </p>
      </div>
      <dl className="m-0 mt-4 border-t border-line pt-3">
        <Field label="Salida" value={time} />
      </dl>
    </article>
  )
}
