import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const backgrounds = {
  /** Blanco con cuadrícula de mapa */
  paper: 'bg-paper bg-map text-green',
  cream: 'bg-cream text-green',
  dark: 'bg-dark text-white',
} as const

const spacings = {
  default: 'px-6 py-[90px]',
  compact: 'px-6 py-[70px]',
  none: '',
} as const

type SectionProps = ComponentProps<'section'> & {
  background?: keyof typeof backgrounds
  spacing?: keyof typeof spacings
}

export function Section({
  background = 'paper',
  spacing = 'default',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden text-center',
        backgrounds[background],
        spacings[spacing],
        className,
      )}
      {...props}
    />
  )
}
