import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Script } from '@/components/ui/Script'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionIds, story } from '@/content/wedding'

export function Story() {
  return (
    <Section id={sectionIds.story} aria-labelledby="story-title" className="overflow-hidden">
      <div
        aria-hidden
        className="absolute top-10 left-0 size-[180px] rounded-full border border-olive/20"
      />
      <Container>
        <Reveal className="text-center">
          <SectionHeader
            kicker={story.kicker}
            title={story.title}
            titleId="story-title"
            lead={story.lead}
          />
          <Script className="text-olive">{story.closing}</Script>
        </Reveal>
      </Container>
    </Section>
  )
}
