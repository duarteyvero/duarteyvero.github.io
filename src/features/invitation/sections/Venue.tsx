import { ButtonLink } from '@/components/ui/ButtonLink'
import { Compass } from '@/components/ui/Compass'
import { Heading } from '@/components/ui/Heading'
import { Icon } from '@/components/ui/Icon'
import { Lead } from '@/components/ui/Lead'
import { Photo } from '@/components/ui/Photo'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { sectionIds, venue } from '@/content/wedding'

export function Venue() {
  return (
    <Section id={sectionIds.venue} aria-labelledby="venue-title">
      <Compass className="absolute top-[30px] -right-5 w-[84px] sm:w-[110px]" />
      <Reveal>
        <SectionHeader kicker={venue.kicker} title={venue.title} titleId="venue-title" />
      </Reveal>

      <Reveal className="-mx-6 mt-9 h-[260px] mask-scallop sm:h-[340px]">
        <Photo src={venue.hero.src} alt={venue.hero.alt} />
      </Reveal>

      <Reveal>
        <Heading as="h3" size="md" lines={venue.name} className="mt-7" />
        <Lead>{venue.text}</Lead>
        <div className="flex flex-wrap justify-center gap-x-3">
          {venue.links.map(({ href, label, icon }) => (
            <ButtonLink key={href} href={href}>
              {icon && <Icon name={icon} className="size-[18px]" />}
              {label}
            </ButtonLink>
          ))}
        </div>
      </Reveal>

      <Reveal className="mt-[34px] grid grid-cols-3 gap-2.5">
        {venue.gallery.map((image) => (
          <div
            key={image.alt}
            className="aspect-square overflow-hidden rounded-full border-4 border-white shadow-[0_0_0_1.5px_var(--color-line)]"
          >
            <Photo src={image.src} alt={image.alt} />
          </div>
        ))}
      </Reveal>
    </Section>
  )
}
