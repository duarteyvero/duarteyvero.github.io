import { cover, coupleNames, weddingDate } from '@/content/wedding'
import type { CoverState } from '@/hooks/usePassportCover'
import { cn } from '@/lib/cn'
import { formatDateShort } from '@/lib/date'

type PassportCoverProps = { state: CoverState; onOpen: () => void }

/** Tapa del pasaporte que cubre la invitación hasta que el invitado la abre */
export function PassportCover({ state, onOpen }: PassportCoverProps) {
  if (state === 'open') return null

  const opening = state === 'opening'

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-outside/97 transition-colors delay-700 duration-700 perspective-[1800px] motion-reduce:transition-none',
        opening && 'pointer-events-none bg-transparent',
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Abrir la invitación de ${coupleNames}`}
        className={cn(
          'relative flex aspect-5/7 w-[min(84vw,400px)] origin-left cursor-pointer flex-col items-center justify-between rounded-[10px_18px_18px_10px] bg-[radial-gradient(ellipse_at_30%_20%,#3a655a,var(--color-green)_60%,#21403a)] px-[8%] pt-[12%] pb-[10%] text-center text-gold shadow-[inset_10px_0_18px_rgb(0_0_0/.25),0_30px_60px_rgb(20_40_35/.35)] transition-[transform,opacity] duration-1300 ease-[cubic-bezier(.6,.05,.3,1)] outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-outside motion-reduce:transition-none',
          opening && '-rotate-y-165 opacity-0',
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-3.5 rounded-[6px_12px_12px_6px] border border-gold/45"
        />
        <span>
          <span className="block font-display text-[clamp(30px,9vw,42px)] tracking-[.12em] uppercase">
            {cover.title}
          </span>
          <span className="block font-type text-xs tracking-[.3em] uppercase">
            {cover.subtitle}
          </span>
        </span>
        <Globe />
        <span>
          <span className="block font-display text-[clamp(28px,8vw,38px)] leading-[1.1]">
            {coupleNames}
          </span>
          <span className="mt-2 block font-type text-xs tracking-[.3em]">
            {formatDateShort(weddingDate)}
          </span>
        </span>
        <span className="animate-float rounded-full border border-gold/60 px-4 py-2 font-type text-micro tracking-[.25em] uppercase motion-reduce:animate-none">
          {cover.hint}
        </span>
      </button>
    </div>
  )
}

function Globe() {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="w-[44%] fill-none stroke-current stroke-[1.6]"
    >
      <circle cx="50" cy="50" r="40" />
      <ellipse cx="50" cy="50" rx="18" ry="40" />
      <path d="M10 50h80M50 10v80M16 30h68M16 70h68" />
      <circle cx="50" cy="50" r="46" strokeDasharray="1 4" />
    </svg>
  )
}
