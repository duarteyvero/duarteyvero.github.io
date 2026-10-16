import { ButtonLink } from '@/components/ui/ButtonLink'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { bus, sectionIds } from '@/content/wedding'
import { BusTrip } from './BusTrip'

export function Bus() {
  return (
    <Section id={sectionIds.bus} aria-labelledby="bus-title">
      <Reveal>
        <SectionHeader kicker={bus.kicker} title={bus.title} titleId="bus-title" lead={bus.lead} />
      </Reveal>

      <ul className="mx-auto mt-10 flex max-w-[460px] list-none flex-col gap-4 p-0">
        {bus.trips.map((trip) => (
          <li key={trip.label}>
            <Reveal>
              <BusTrip {...trip} />
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mx-auto mt-8 max-w-[400px] font-serif text-lg leading-snug">{bus.note}</p>
        <div className="flex flex-wrap justify-center gap-x-3">
          <ButtonLink href={`#${sectionIds.rsvp}`}>
            <Icon name="bus" className="size-[18px]" />
            {bus.rsvpLink}
          </ButtonLink>
          <ButtonLink href={bus.stop.mapsUrl}>
            <Icon name="pin" className="size-[18px]" />
            {bus.stopLink}
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  )
}
