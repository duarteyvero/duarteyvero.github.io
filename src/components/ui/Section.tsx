import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const backgrounds = {
  paper: 'bg-paper text-ink',
  paper2: 'bg-paper2 text-ink',
  dark: 'bg-dark text-white',
} as const

const spacings = {
  default: 'px-6 py-[115px]',
  compact: 'px-6 py-[90px]',
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
      className={cn('relative', backgrounds[background], spacings[spacing], className)}
      {...props}
    />
  )
}
