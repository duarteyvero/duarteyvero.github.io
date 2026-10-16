import { useId, type ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/cn'

type PostmarkProps = {
  /** Texto que rodea el sello (unos 30 caracteres caben en una vuelta) */
  text: string
  /** Contenido del centro, en coordenadas de un viewBox de 160×160 */
  children?: ReactNode
  dashed?: boolean
  /** Color con `text-*`, posición y giro final con `[--stamp-rotate:…]` */
  className?: string
}

/** Matasellos circular que «se estampa» al entrar en pantalla */
export function Postmark({ text, children, dashed = false, className }: PostmarkProps) {
  const { ref, inView } = useInView<SVGSVGElement>(0.4)
  const pathId = `postmark-${useId().replace(/[^\w-]/g, '')}`

  return (
    <svg
      ref={ref}
      viewBox="0 0 160 160"
      aria-hidden
      className={cn(
        'pointer-events-none',
        inView ? 'animate-stamp motion-reduce:animate-none' : 'opacity-0',
        className,
      )}
    >
      <defs>
        <path id={pathId} d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0" />
      </defs>
      <circle
        cx="80"
        cy="80"
        r="74"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeDasharray={dashed ? '10 4' : undefined}
      />
      <text className="fill-current font-type text-[13px] uppercase" letterSpacing="3.4">
        <textPath href={`#${pathId}`}>{text}</textPath>
      </text>
      {children}
    </svg>
  )
}
