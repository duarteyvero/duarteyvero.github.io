import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from './tone'

type KickerProps = { children: ReactNode; tone?: Tone; className?: string }

export function Kicker({ children, tone = 'light', className }: KickerProps) {
  return (
    <p
      className={cn(
        'mb-2 font-type text-kicker tracking-[.22em] uppercase',
        tone === 'light' ? 'text-coral' : 'text-gold',
        className,
      )}
    >
      {children}
    </p>
  )
}
