import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { rsvp, sectionIds } from '@/content/wedding'
import { LazyRsvpForm } from '@/features/rsvp/LazyRsvpForm'

export function Rsvp() {
  return (
    <Section
      id={sectionIds.rsvp}
      background="dark"
      aria-labelledby="rsvp-title"
      className="py-[125px]"
    >
      <Container>
        <Reveal>
          <SectionHeader
            kicker={rsvp.kicker}
            title={rsvp.title}
            titleId="rsvp-title"
            titleSize="display"
            tone="dark"
            lead={rsvp.lead}
          />
        </Reveal>
        <div className="mx-auto mt-14 max-w-[680px]">
          <LazyRsvpForm />
        </div>
      </Container>
    </Section>
  )
}
