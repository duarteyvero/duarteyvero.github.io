import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ScriptProps = { children: ReactNode; className?: string }

/** Frases manuscritas */
export function Script({ children, className }: ScriptProps) {
  return (
    <p className={cn('mt-7 font-script text-[clamp(34px,9vw,50px)] leading-[1.1]', className)}>
      {children}
    </p>
  )
}
