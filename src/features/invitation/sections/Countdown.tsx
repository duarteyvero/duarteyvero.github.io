import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { StatGrid } from '@/components/ui/StatGrid'
import { countdown, weddingDate } from '@/content/wedding'
import { useCountdown } from '@/hooks/useCountdown'

const pad = (value: number) => String(value).padStart(2, '0')

export function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(weddingDate)

  return (
    <Section spacing="compact" aria-labelledby="countdown-title">
      <Container>
        <Reveal>
          <SectionHeader
            kicker={countdown.kicker}
            title={countdown.title}
            titleId="countdown-title"
          />
          <StatGrid
            className="mt-12 max-w-[850px]"
            items={[
              { value: String(days), label: 'Días' },
              { value: pad(hours), label: 'Horas' },
              { value: pad(minutes), label: 'Minutos' },
              { value: pad(seconds), label: 'Segundos' },
            ]}
          />
        </Reveal>
      </Container>
    </Section>
  )
}
