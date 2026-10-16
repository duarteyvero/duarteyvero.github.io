import { Icon } from '@/components/ui/Icon'

/** Maleta con etiqueta y corazón para el cierre */
export function Suitcase({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 110"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinejoin="round"
    >
      <path d="M44 22v-8a6 6 0 0 1 6-6h20a6 6 0 0 1 6 6v8" />
      <rect x="14" y="22" width="92" height="70" rx="10" />
      <path d="M38 22v70M82 22v70" />
      <circle cx="30" cy="100" r="5" />
      <circle cx="90" cy="100" r="5" />
      <rect
        x="88"
        y="34"
        width="22"
        height="14"
        rx="2"
        className="fill-white"
        transform="rotate(12 99 41)"
      />
      <Icon name="heart" x="51" y="48" width="18" height="18" className="stroke-none text-coral" />
    </svg>
  )
}
