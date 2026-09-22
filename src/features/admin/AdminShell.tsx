import type { ReactNode } from 'react'
import { coupleNames } from '@/content/wedding'

type AdminShellProps = { actions?: ReactNode; children: ReactNode }

/** Marco común de todas las pantallas del panel */
export function AdminShell({ actions, children }: AdminShellProps) {
  return (
    <div className="min-h-svh bg-paper">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-5">
          <div>
            <p className="font-serif text-3xl leading-none">{coupleNames}</p>
            <p className="mt-1 text-micro tracking-[.3em] text-muted uppercase">
              Panel de respuestas
            </p>
          </div>
          {actions}
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-6 py-10">{children}</main>
    </div>
  )
}
