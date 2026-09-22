import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from './tone'

type KickerProps = { children: ReactNode; tone?: Tone; className?: string }

export function Kicker({ children, tone = 'light', className }: KickerProps) {
  return (
    <p
      className={cn(
        'mb-5 text-kicker tracking-[.38em] uppercase',
        tone === 'light' ? 'text-olive' : 'text-sage',
        className,
      )}
    >
      {children}
    </p>
  )
}
