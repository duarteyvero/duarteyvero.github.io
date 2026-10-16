import { cn } from '@/lib/cn'
import type { Tone } from './tone'

/** Botón píldora con letra de máquina de escribir, compartido por enlaces y botones */
export const outlineButtonClass = (tone: Tone, className?: string) =>
  cn(
    'mt-6 inline-flex cursor-pointer items-center gap-2.5 rounded-full border-[1.5px] px-[26px] py-3.5 font-type text-micro tracking-[.18em] uppercase transition-colors',
    tone === 'light'
      ? 'border-green text-green hover:bg-green hover:text-white'
      : 'border-white/70 text-white hover:bg-white hover:text-green',
    className,
  )
