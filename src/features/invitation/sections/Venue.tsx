import { ButtonLink } from '@/components/ui/ButtonLink'
import { Heading } from '@/components/ui/Heading'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionIds, venue } from '@/content/wedding'

export function Venue() {
  return (
    <Section id={sectionIds.venue} background="paper2" spacing="none" aria-labelledby="venue-title">
      <Reveal className="px-6 pt-[110px] pb-[70px]">
        <SectionHeader
          kicker={venue.kicker}
          title={venue.title}
          titleId="venue-title"
          lead={venue.lead}
        />
      </Reveal>

      <div className="relative h-[52vh] min-h-[390px] md:h-[65vh] md:min-h-[500px]">
        <Photo src={venue.hero.src} alt={venue.hero.alt} />
        <div
          aria-hidden
          className="absolute inset-0 bg-linear-to-r from-[rgb(26_31_24/.4)] to-[rgb(26_31_24/.05)]"
        />
      </div>

      <div className="mx-auto grid max-w-[1120px] md:grid-cols-2">
        {venue.cards.map(({ title, text, link }) => (
          <Reveal
            key={title}
            className="border-line px-[7%] py-[65px] max-md:not-first:border-t md:not-first:border-l"
          >
            <Heading as="h3" size="md" lines={title} className="mb-[18px]" />
            <p className="text-[13px] leading-loose text-body">{text}</p>
            {link && <ButtonLink href={link.href}>{link.label}</ButtonLink>}
          </Reveal>
        ))}
      </div>

      <div className="grid h-[300px] grid-cols-2 md:h-[390px] md:grid-cols-4">
        {venue.gallery.map((image) => (
          <Photo key={image.alt} src={image.src} alt={image.alt} className="object-[center_45%]" />
        ))}
      </div>
    </Section>
  )
}
