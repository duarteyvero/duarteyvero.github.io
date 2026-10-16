import { Field } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Photo } from '@/components/ui/Photo'
import { Postmark } from '@/components/ui/Postmark'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { couple, coupleNames, passport, venue, weddingDate } from '@/content/wedding'
import { formatDateCompact, formatDateText, formatTime } from '@/lib/date'
import { toMrz } from '@/lib/text'

const passportNumber = formatDateCompact(weddingDate)

/** Página de datos del pasaporte: foto, fecha, hora, destino… y la zona legible por máquina */
export function PassportData() {
  const fields = [
    { label: 'Fecha', value: formatDateText(weddingDate) },
    { label: 'Hora', value: formatTime(weddingDate) },
    { label: 'Destino', value: venue.name },
    { label: 'Ceremonia', value: passport.ceremony },
    { label: 'Fiesta', value: passport.party },
  ]

  return (
    <Section background="cream" aria-labelledby="passport-title">
      <Reveal className="relative overflow-hidden rounded-md bg-white px-[22px] pt-[26px] text-left shadow-[0_18px_40px_rgb(44_79_70/.12)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-radial-gradient(circle_at_80%_30%,transparent_0_18px,rgb(44_79_70/.035)_18px_19px)]"
        />
        <div className="flex items-baseline justify-between gap-2.5 border-b-[1.5px] border-line pb-3">
          <h2
            id="passport-title"
            className="m-0 font-display text-[clamp(16px,4.6vw,22px)] font-normal tracking-[.05em] uppercase"
          >
            {passport.title}
          </h2>
          <span className="font-type text-xs whitespace-nowrap text-coral">
            Nº {passportNumber}
          </span>
        </div>

        <div className="grid gap-5 py-[22px] sm:grid-cols-[38%_1fr]">
          <div className="mx-auto aspect-3/4 w-3/5 overflow-hidden rounded sm:w-full">
            <Photo src={passport.photo.src} alt={passport.photo.alt} className="object-[50%_70%]" />
          </div>
          <div>
            <p className="mb-3.5 font-display text-[clamp(26px,7vw,36px)] leading-[1.05]">
              {coupleNames}
            </p>
            <dl className="m-0 flex flex-col gap-2.5">
              {fields.map((field) => (
                <Field key={field.label} {...field} />
              ))}
            </dl>
          </div>
        </div>

        <p
          aria-hidden
          className="m-0 border-t-[1.5px] border-line pt-3 pb-3.5 font-mono text-[clamp(10px,2.8vw,13px)] leading-normal tracking-[.12em] break-all text-muted"
        >
          {toMrz(['P', 'BODA', couple.first, couple.second])}
          <br />
          {toMrz([passportNumber, venue.name, 'Nos casamos'])}
        </p>

        <Postmark
          text={passport.postmark}
          className="absolute -right-[34px] -bottom-5 w-[128px] text-coral opacity-85 [--stamp-rotate:-18deg]"
        >
          <Icon name="heart" x="55" y="45" width="50" height="50" />
          <text x="80" y="118" textAnchor="middle" className="fill-current font-type text-[13px]">
            {weddingDate.getFullYear()}
          </text>
        </Postmark>
      </Reveal>
    </Section>
  )
}
