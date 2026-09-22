import { Heading } from '@/components/ui/Heading'
import { Kicker } from '@/components/ui/Kicker'
import { Script } from '@/components/ui/Script'
import { SplitSection } from '@/components/ui/SplitSection'
import { proposal } from '@/content/wedding'

export function Proposal() {
  return (
    <SplitSection
      image={proposal.image}
      photoSide="left"
      background="dark"
      labelledBy="proposal-title"
    >
      <Kicker tone="dark">{proposal.kicker}</Kicker>
      <Heading as="h3" size="lg" id="proposal-title" lines={proposal.title} />
      <p className="mt-[25px] text-[13px] leading-loose text-mist">{proposal.text}</p>
      <Script className="text-[29px]">{proposal.sign}</Script>
    </SplitSection>
  )
}
