import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ScriptProps = { children: ReactNode; className?: string }

/** Frases manuscritas en Parisienne */
export function Script({ children, className }: ScriptProps) {
  return (
    <p className={cn('mt-[25px] font-script text-[30px] leading-snug', className)}>{children}</p>
  )
}
