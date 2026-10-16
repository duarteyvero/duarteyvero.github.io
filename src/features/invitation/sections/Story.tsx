import { Icon } from '@/components/ui/Icon'
import { Postmark } from '@/components/ui/Postmark'
import { Reveal } from '@/components/ui/Reveal'
import { Script } from '@/components/ui/Script'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionIds, story } from '@/content/wedding'

export function Story() {
  return (
    <Section id={sectionIds.story} aria-labelledby="story-title">
      <Reveal>
        <SectionHeader
          kicker={story.kicker}
          title={story.title}
          titleId="story-title"
          lead={story.lead}
        />
        <HeartDivider />
        <Script>{story.closing}</Script>
      </Reveal>
      <Postmark
        text={story.postmark}
        dashed
        className="mx-auto mt-10 w-[130px] [--stamp-rotate:8deg]"
      >
        <Icon name="heart" x="50" y="50" width="60" height="60" className="text-coral" />
      </Postmark>
    </Section>
  )
}

function HeartDivider() {
  return (
    <div
      aria-hidden
      className="mt-6 flex items-center justify-center gap-3.5 before:h-[1.5px] before:w-[70px] before:bg-green/50 after:h-[1.5px] after:w-[70px] after:bg-green/50"
    >
      <Icon name="heart" className="size-5 text-coral" />
    </div>
  )
}
