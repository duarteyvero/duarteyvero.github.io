import { Heading } from '@/components/ui/Heading'
import { Kicker } from '@/components/ui/Kicker'
import { Lead } from '@/components/ui/Lead'
import { SplitSection } from '@/components/ui/SplitSection'
import { ring, weddingDate } from '@/content/wedding'
import { formatDateText } from '@/lib/date'

export function Ring() {
  return (
    <SplitSection
      image={ring.image}
      photoSide="right"
      background="paper"
      fit="contain"
      labelledBy="ring-title"
    >
      <Kicker>{ring.kicker}</Kicker>
      <Heading as="h3" size="lg" id="ring-title" lines={ring.title} />
      <Lead align="start">
        {formatDateText(weddingDate)}. {ring.text}
      </Lead>
    </SplitSection>
  )
}
