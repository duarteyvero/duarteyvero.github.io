import { useId, type ReactNode } from 'react'
import type { Tone } from '@/components/ui/tone'
import { cn } from '@/lib/cn'

type FormBlockProps = { title: string; action?: ReactNode; tone?: Tone; children: ReactNode }

/** Bloque del formulario con título pequeño y línea fina (titular, cada acompañante…) */
export function FormBlock({ title, action, tone = 'dark', children }: FormBlockProps) {
  const titleId = useId()

  return (
    <fieldset aria-labelledby={titleId} className="m-0 min-w-0 border-0 p-0">
      <div
        className={cn(
          'mb-5 flex min-h-8 items-center justify-between gap-4 border-t pt-5',
          tone === 'dark' ? 'border-white/20' : 'border-line',
        )}
      >
        <h3
          id={titleId}
          className={cn(
            'm-0 text-kicker font-normal tracking-[.38em] uppercase',
            tone === 'dark' ? 'text-sage' : 'text-olive',
          )}
        >
          {title}
        </h3>
        {action}
      </div>
      {children}
    </fieldset>
  )
}
