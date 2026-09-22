import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatGrid } from '@/components/ui/StatGrid'
import { schedule, sectionIds } from '@/content/wedding'

export function Schedule() {
  return (
    <Section id={sectionIds.schedule} aria-labelledby="schedule-title">
      <Container>
        <Reveal>
          <SectionHeader
            kicker={schedule.kicker}
            title={schedule.title}
            titleId="schedule-title"
            lead={schedule.lead}
          />
          <StatGrid
            size="md"
            className="mt-[55px] max-w-[900px]"
            items={schedule.events.map(({ time, label }) => ({ value: time, label }))}
          />
        </Reveal>
      </Container>
    </Section>
  )
}
