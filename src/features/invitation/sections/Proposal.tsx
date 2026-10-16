import { Icon } from '@/components/ui/Icon'
import { Lead } from '@/components/ui/Lead'
import { Polaroid } from '@/components/ui/Polaroid'
import { Postmark } from '@/components/ui/Postmark'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { proposal, weddingDate } from '@/content/wedding'
import { formatDateText } from '@/lib/date'

export function Proposal() {
  return (
    <Section background="dark" aria-labelledby="proposal-title">
      <Reveal>
        <SectionHeader
          kicker={proposal.kicker}
          title={proposal.title}
          titleId="proposal-title"
          titleSize="lg"
          tone="dark"
          lead={proposal.text}
        />
      </Reveal>
      <Reveal className="mt-10">
        <Polaroid src={proposal.image.src} alt={proposal.image.alt} caption={proposal.sign}>
          <Postmark
            text={proposal.postmark}
            className="absolute -top-12 -right-12 z-10 w-[116px] text-gold [--stamp-rotate:14deg]"
          >
            <Icon name="heart" x="52" y="52" width="56" height="56" />
          </Postmark>
        </Polaroid>
      </Reveal>
      <Reveal>
        <Lead tone="dark" className="mt-14">
          {proposal.nextChapter}:{' '}
          <strong className="font-semibold text-white">{formatDateText(weddingDate)}</strong>.{' '}
          {proposal.closing}
        </Lead>
      </Reveal>
    </Section>
  )
}
