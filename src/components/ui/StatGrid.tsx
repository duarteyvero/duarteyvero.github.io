import { cn } from '@/lib/cn'

export type Stat = { value: string; label: string }

const valueSizes = {
  lg: 'text-[65px] font-light',
  md: 'text-[31px]',
} as const

type StatGridProps = {
  items: readonly Stat[]
  size?: keyof typeof valueSizes
  className?: string
}

/** Rejilla 4 → 2 columnas con separadores finos (cuenta atrás, horarios) */
export function StatGrid({ items, size = 'lg', className }: StatGridProps) {
  return (
    <dl className={cn('mx-auto grid grid-cols-2 border-y border-line md:grid-cols-4', className)}>
      {items.map(({ value, label }) => (
        <div
          key={label}
          className="flex flex-col-reverse border-line px-2 py-7 text-center not-last:border-r max-md:nth-2:border-r-0 max-md:nth-[-n+2]:border-b"
        >
          <dt className="mt-2 text-micro tracking-[.25em] text-muted uppercase">{label}</dt>
          <dd className={cn('m-0 font-serif leading-tight tabular-nums', valueSizes[size])}>
            {value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
