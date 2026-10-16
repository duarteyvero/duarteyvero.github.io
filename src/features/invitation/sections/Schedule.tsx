import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { schedule, sectionIds } from '@/content/wedding'

export function Schedule() {
  return (
    <Section id={sectionIds.schedule} background="cream" aria-labelledby="schedule-title">
      <Reveal>
        <SectionHeader kicker={schedule.kicker} title={schedule.title} titleId="schedule-title" />
      </Reveal>

      {/* La línea discontinua une los iconos como una ruta de vuelo */}
      <ol className="relative mx-auto mt-10 max-w-[400px] list-none p-0 text-left before:absolute before:top-5 before:bottom-5 before:left-[31px] before:border-l-2 before:border-dashed before:border-green/35">
        {schedule.events.map(({ time, label, icon }) => (
          <li key={time}>
            <Reveal className="relative flex items-center gap-[22px] py-3.5">
              <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border-[1.5px] border-green bg-white">
                <Icon name={icon} className="size-8" />
              </span>
              <span>
                <span className="block font-display text-[26px] leading-none">{time} h</span>
                <span className="block font-type text-sm tracking-[.15em] text-coral uppercase">
                  {label}
                </span>
              </span>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <p className="mt-6 text-[13px] text-muted">{schedule.lead}</p>
      </Reveal>
    </Section>
  )
}
