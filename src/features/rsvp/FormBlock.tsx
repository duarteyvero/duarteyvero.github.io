import { useId, type ReactNode } from 'react'

type FormBlockProps = { title: string; action?: ReactNode; children: ReactNode }

/** Bloque del formulario con título pequeño y línea fina (titular, cada acompañante…) */
export function FormBlock({ title, action, children }: FormBlockProps) {
  const titleId = useId()

  return (
    <fieldset aria-labelledby={titleId} className="m-0 min-w-0 border-0 p-0">
      <div className="mb-5 flex min-h-8 items-center justify-between gap-4 border-t border-white/20 pt-5">
        <h3
          id={titleId}
          className="m-0 text-kicker font-normal tracking-[.38em] text-sage uppercase"
        >
          {title}
        </h3>
        {action}
      </div>
      {children}
    </fieldset>
  )
}
