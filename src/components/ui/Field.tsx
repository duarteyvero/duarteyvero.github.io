import { cn } from '@/lib/cn'

type FieldProps = { label: string; value: string; className?: string }

/** Dato de pasaporte / tarjeta de embarque: etiqueta coral + valor a máquina de escribir */
export function Field({ label, value, className }: FieldProps) {
  return (
    <div className={cn('font-type', className)}>
      <dt className="text-micro tracking-[.2em] text-coral uppercase">{label}</dt>
      <dd className="m-0 text-[14px] tracking-[.05em] uppercase sm:text-[15px]">{value}</dd>
    </div>
  )
}
