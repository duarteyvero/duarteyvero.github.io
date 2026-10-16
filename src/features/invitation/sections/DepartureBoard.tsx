import type { CountdownParts } from '@/hooks/useCountdown'

const pad = (value: number) => String(value).padStart(2, '0')

/** Panel de salidas de aeropuerto con días, horas, minutos y segundos */
export function DepartureBoard({ days, hours, minutes, seconds }: CountdownParts) {
  const cells = [
    { value: String(days), label: 'Días' },
    { value: pad(hours), label: 'Horas' },
    { value: pad(minutes), label: 'Min' },
    { value: pad(seconds), label: 'Seg' },
  ]

  return (
    <dl className="mx-auto mt-[18px] grid max-w-[440px] grid-cols-4 gap-2.5">
      {cells.map(({ value, label }) => (
        <div
          key={label}
          className="relative flex flex-col-reverse overflow-hidden rounded-lg bg-green px-1 pt-3.5 pb-2.5 text-white after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black/25"
        >
          <dt className="mt-1.5 font-type text-[10px] tracking-[.18em] text-gold uppercase">
            {label}
          </dt>
          <dd className="m-0 font-type text-[clamp(26px,8vw,40px)] leading-none tabular-nums">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
