import { Compass } from '@/components/ui/Compass'
import { Postmark } from '@/components/ui/Postmark'
import { Reveal } from '@/components/ui/Reveal'
import { couple, hero, monogram, navLinks, sectionIds, weddingDate } from '@/content/wedding'
import { formatDateDotsShort } from '@/lib/date'
import { FlightRoute } from './FlightRoute'

export function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-paper bg-map px-6 pt-[70px] pb-[90px] text-center text-green">
      <FlightRoute />
      <Compass className="absolute bottom-[60px] -left-[18px] w-[84px] sm:w-[110px]" />
      <Postmark
        text={hero.postmark}
        className="absolute top-[52px] right-2 w-[118px] text-coral [--stamp-rotate:-14deg] sm:right-4 sm:w-[150px]"
      >
        <text x="80" y="88" textAnchor="middle" className="fill-current font-display text-[22px]">
          {formatDateDotsShort(weddingDate)}
        </text>
      </Postmark>

      <nav
        aria-label="Secciones"
        className="absolute inset-x-0 top-0 z-10 hidden justify-center gap-6 py-5 font-type text-micro tracking-[.18em] uppercase sm:flex"
      >
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} className="transition-colors hover:text-coral">
            {label}
          </a>
        ))}
      </nav>

      <Reveal className="relative">
        <p className="font-display text-[clamp(46px,14vw,86px)] leading-none tracking-[.06em] uppercase">
          {hero.title}
        </p>
        <p className="mt-6 mb-1.5 font-type text-[clamp(17px,5vw,24px)] tracking-[.25em] uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="m-0 font-display text-[clamp(52px,15vw,92px)] leading-none font-normal">
          {couple.first} <span className="text-coral">&amp;</span> {couple.second}
        </h1>
        <p
          aria-hidden
          className="mx-auto mt-5 flex size-[84px] items-center justify-center rounded-full border-2 border-green font-display text-[30px]"
        >
          {monogram}
        </p>
      </Reveal>

      <a
        href={`#${sectionIds.story}`}
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 font-type text-micro tracking-[.3em] uppercase"
      >
        {hero.scrollLabel}
        <span
          aria-hidden
          className="block h-[34px] w-[1.5px] animate-float bg-green/50 motion-reduce:animate-none"
        />
      </a>
    </header>
  )
}
