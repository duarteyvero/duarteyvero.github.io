import { cn } from '@/lib/cn'

/** Brújula decorativa con la aguja oscilando */
export function Compass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={cn('pointer-events-none', className)}>
      <g fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="46" strokeWidth="2" />
        <circle cx="50" cy="50" r="38" strokeDasharray="2 4" />
      </g>
      <g className="fill-current font-display text-[11px]" textAnchor="middle">
        <text x="50" y="17">
          N
        </text>
        <text x="50" y="92">
          S
        </text>
        <text x="88" y="54">
          E
        </text>
        <text x="12" y="54">
          O
        </text>
      </g>
      <g className="origin-center animate-wobble motion-reduce:animate-none">
        <path d="M50 18l7 32-7 32-7-32z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M50 18l7 32H43z" className="fill-coral" />
        <circle cx="50" cy="50" r="3" className="fill-current" />
      </g>
    </svg>
  )
}
