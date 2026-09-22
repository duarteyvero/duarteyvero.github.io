import { Container } from '@/components/ui/Container'
import { PhotoCard } from '@/components/ui/PhotoCard'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { travels } from '@/content/wedding'

export function Travels() {
  return (
    <Section background="paper2" aria-label="Nuestros viajes" className="pt-[95px]">
      <Container>
        <Reveal className="grid grid-cols-2 gap-0.5 md:gap-[3px] lg:grid-cols-4">
          {travels.map(({ title, caption, image }) => (
            <PhotoCard key={title} src={image} alt={title} title={title} caption={caption} />
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
