import { cn } from '@/lib/cn'

/** Franja de rayas de sobre de correo aéreo, para separar secciones */
export function Airmail({ className }: { className?: string }) {
  return <div aria-hidden className={cn('h-3 bg-airmail', className)} />
}
