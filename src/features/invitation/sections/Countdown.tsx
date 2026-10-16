import { ButtonLink } from '@/components/ui/ButtonLink'
import { Icon } from '@/components/ui/Icon'
import { Kicker } from '@/components/ui/Kicker'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { countdown, venue, weddingDate } from '@/content/wedding'
import { useCountdown } from '@/hooks/useCountdown'
import { googleCalendarUrl } from '@/lib/calendar'
import { DepartureBoard } from './DepartureBoard'

const calendarUrl = googleCalendarUrl({
  title: countdown.calendar.title,
  start: weddingDate,
  durationHours: countdown.calendar.durationHours,
  location: venue.name,
  details: countdown.calendar.details,
})

export function Countdown() {
  const parts = useCountdown(weddingDate)
  const progress = Math.min(1, Math.max(0, 1 - parts.days / countdown.flightDays))

  return (
    <Section background="cream" spacing="compact" aria-labelledby="countdown-title">
      <Reveal>
        <Kicker>{countdown.kicker}</Kicker>
        <h2
          id="countdown-title"
          className="mx-auto mt-4 max-w-[430px] font-serif text-[clamp(22px,6vw,30px)] leading-snug font-normal"
        >
          {countdown.title}
        </h2>
      </Reveal>

      <Reveal aria-hidden className="relative mx-auto mt-[30px] mb-2.5 h-[60px] max-w-[420px]">
        <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-green/35" />
        <span className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-full border-2 border-green bg-white" />
        <span className="absolute top-1/2 right-0 size-3 -translate-y-1/2 rounded-full bg-coral" />
        <Icon
          name="plane"
          className="absolute top-1/2 size-[46px] -translate-y-1/2 text-green transition-[left] duration-1000"
          // Posición del avión según lo que falta: valor dinámico
          style={{ left: `calc(${progress} * (100% - 46px))` }}
        />
      </Reveal>

      <Reveal>
        <DepartureBoard {...parts} />
        <ButtonLink href={calendarUrl} className="mt-8">
          <Icon name="calendar" className="size-[18px]" />
          {countdown.calendar.label}
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
