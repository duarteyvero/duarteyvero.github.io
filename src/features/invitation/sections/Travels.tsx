import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StampCard } from '@/components/ui/StampCard'
import { travels, travelsHeader } from '@/content/wedding'
import { cn } from '@/lib/cn'

/** Giro de cada sello; los de la columna derecha bajan un poco para que no parezcan una rejilla */
const layouts = ['-rotate-3', 'mt-[26px] rotate-[2.5deg]', 'rotate-2', 'mt-[26px] -rotate-[2.5deg]']

export function Travels() {
  return (
    <Section aria-labelledby="travels-title">
      <Reveal>
        <SectionHeader
          kicker={travelsHeader.kicker}
          title={travelsHeader.title}
          titleId="travels-title"
          lead={travelsHeader.lead}
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-[18px] sm:gap-y-[26px]">
        {travels.map(({ title, caption, image }, index) => (
          <Reveal key={title} className={cn('self-start', layouts[index % layouts.length])}>
            <StampCard
              src={image}
              alt={title}
              title={title}
              caption={caption}
              value={index === travels.length - 1 ? '∞' : String(index + 1).padStart(2, '0')}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
