import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from './tone'

type LeadProps = {
  children: ReactNode
  tone?: Tone
  align?: 'center' | 'start'
  className?: string
}

export function Lead({ children, tone = 'light', align = 'center', className }: LeadProps) {
  return (
    <p
      className={cn(
        'mt-[30px] max-w-[620px] text-sm leading-loose',
        tone === 'light' ? 'text-body' : 'text-mist',
        align === 'center' && 'mx-auto',
        className,
      )}
    >
      {children}
    </p>
  )
}
