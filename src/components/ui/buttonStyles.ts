import { cn } from '@/lib/cn'
import type { Tone } from './tone'

/** Botón fino (outline) del diseño original, compartido por enlaces y botones */
export const outlineButtonClass = (tone: Tone, className?: string) =>
  cn(
    'mt-5 inline-block cursor-pointer border px-[25px] py-[14px] text-micro tracking-[.25em] uppercase transition-colors',
    tone === 'light'
      ? 'border-olive hover:bg-olive hover:text-white'
      : 'border-white/65 text-white hover:bg-white hover:text-dark',
    className,
  )
