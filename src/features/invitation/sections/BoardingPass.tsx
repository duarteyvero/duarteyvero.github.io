import { Field } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { boardingPass, monogram, venue, weddingDate } from '@/content/wedding'
import { formatDateCompact, formatDateTicket } from '@/lib/date'

/** DV 1707 */
const flight = `${monogram.replace('&', '')} ${formatDateCompact(weddingDate).slice(0, 4)}`

/** Tarjeta de embarque decorativa con su resguardo troquelado */
export function BoardingPass() {
  const fields = [
    { label: 'Vuelo', value: flight },
    { label: 'Fecha', value: formatDateTicket(weddingDate) },
    { label: 'Embarque', value: boardingPass.boarding },
    { label: 'Asiento', value: boardingPass.seat },
  ]

  return (
    <div className="mx-auto mt-9 grid max-w-[470px] grid-cols-[1fr_70px] text-left text-green drop-shadow-[0_16px_26px_rgb(0_0_0/.25)] sm:grid-cols-[1fr_92px]">
      <div className="overflow-hidden rounded-l-[14px] bg-white pb-[18px] mask-notch-r">
        <p className="m-0 flex items-center justify-between bg-green px-[18px] py-3 font-type text-xs tracking-[.2em] text-white uppercase">
          {boardingPass.title}
          <Icon name="plane" className="size-[22px] text-gold" />
        </p>
        <div className="flex items-center justify-between gap-2 px-[18px] pt-4 pb-1.5">
          <Airport label="Origen" code={boardingPass.origin} />
          <Icon name="plane" className="w-[30px] shrink-0" />
          <Airport label="Destino" code={monogram} align="end" />
        </div>
        <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-2 px-[18px] pt-2">
          {fields.map((field) => (
            <Field key={field.label} {...field} />
          ))}
        </dl>
      </div>

      <div
        aria-hidden
        className="flex flex-col items-center justify-center gap-2.5 rounded-r-[14px] border-l-2 border-dashed border-green/30 bg-white px-1.5 py-3.5 mask-notch-l"
      >
        <span className="h-[120px] w-[34px] bg-barcode sm:w-[46px]" />
        <span className="rotate-180 font-type text-micro tracking-[.2em] text-coral uppercase [writing-mode:vertical-rl]">
          {flight} · {venue.name.split(' ').at(-1)}
        </span>
      </div>
    </div>
  )
}

type AirportProps = { label: string; code: string; align?: 'start' | 'end' }

function Airport({ label, code, align = 'start' }: AirportProps) {
  return (
    <p className={align === 'end' ? 'm-0 text-right' : 'm-0'}>
      <span className="block font-type text-[10px] tracking-[.12em] text-coral uppercase">
        {label}
      </span>
      <span className="font-display text-[clamp(30px,9vw,40px)] leading-none uppercase">
        {code}
      </span>
    </p>
  )
}
