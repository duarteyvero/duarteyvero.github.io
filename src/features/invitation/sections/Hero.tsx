import { couple, hero, navLinks, sectionIds, weddingDate } from '@/content/wedding'
import { formatDateLong } from '@/lib/date'

export function Hero() {
  return (
    <header className="relative flex h-[82svh] min-h-[560px] items-center justify-center overflow-hidden bg-paper bg-[radial-gradient(circle_at_50%_35%,rgb(86_97_77/.07),transparent_45%)] px-6 sm:h-[88svh] sm:min-h-[620px] lg:h-[92svh] lg:min-h-[720px]">
      <Frames />

      <nav
        aria-label="Secciones"
        className="absolute inset-x-0 top-0 z-10 hidden justify-center gap-[30px] px-[5vw] py-[23px] text-micro tracking-[.22em] text-ink uppercase md:flex"
      >
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} className="transition-colors hover:text-olive">
            {label}
          </a>
        ))}
      </nav>

      <div className="relative z-10 flex flex-col items-center pb-[90px] text-center md:pb-[8vw]">
        <p className="mb-7 text-kicker tracking-[.45em] text-olive uppercase">{hero.eyebrow}</p>
        <h1 className="m-0 font-serif text-[clamp(62px,18vw,100px)] leading-[.72] font-light tracking-[-.045em] text-shadow-[0_3px_22px_rgb(0_0_0/.1)] sm:text-[clamp(72px,11vw,155px)]">
          <span className="block">
            {couple.first} <i className="text-[.55em]">&amp;</i>
          </span>
          <span className="block">{couple.second}</span>
        </h1>
        <p className="mt-[38px] font-serif text-lg tracking-[.28em] text-olive">
          <time dateTime={weddingDate.toISOString()}>{formatDateLong(weddingDate)}</time>
        </p>
        <p className="mt-[25px] font-script text-[28px] text-olive sm:text-[32px]">
          {hero.tagline}
        </p>
      </div>

      <a
        href={`#${sectionIds.story}`}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 border-b border-olive/40 pb-1 text-micro tracking-[.28em] text-olive uppercase lg:bottom-14"
      >
        {hero.scrollLabel} <span aria-hidden>↓</span>
      </a>
    </header>
  )
}

/** Doble marco fino del hero */
function Frames() {
  return (
    <div aria-hidden className="pointer-events-none">
      <div className="absolute inset-[18px] border border-olive/18 lg:inset-7" />
      <div className="absolute inset-[30px] border border-olive/9 lg:inset-[42px]" />
    </div>
  )
}
