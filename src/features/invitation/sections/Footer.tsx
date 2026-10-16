import { Field } from '@/components/ui/Field'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { couple, footer, monogram, weddingDate } from '@/content/wedding'
import { formatDateCompact, formatDateShort } from '@/lib/date'
import { Suitcase } from './Suitcase'

export function Footer() {
  const fields = [
    { label: 'Tipo', value: footer.kind },
    { label: 'Código', value: monogram },
    { label: 'Pasaporte Nº', value: formatDateCompact(weddingDate) },
  ]

  return (
    <footer className="bg-paper bg-map px-6 pt-[70px] pb-[60px] text-center text-green">
      <Reveal>
        <dl className="mx-auto my-0 grid max-w-[440px] grid-cols-3 border-y-[1.5px] border-green py-3.5">
          {fields.map((field) => (
            <Field key={field.label} {...field} />
          ))}
        </dl>
        <p className="mx-auto mt-[34px] max-w-[440px] font-serif text-[22px] leading-snug">
          {footer.luggage}
        </p>
      </Reveal>
      <Suitcase className="mx-auto mt-[34px] mb-2.5 w-[120px] animate-float motion-reduce:animate-none" />
      <Reveal>
        <p className="font-script text-[44px]">{footer.farewell}</p>
        <p className="mt-6 font-display text-[clamp(46px,13vw,70px)] leading-none">
          {couple.first} <span className="text-coral">&amp;</span> {couple.second}
        </p>
        <p className="mt-3 font-type text-xs tracking-[.12em] opacity-75">
          {formatDateShort(weddingDate)} · {footer.thanks}
        </p>
      </Reveal>
      <Icon
        name="plane"
        className="mx-auto mt-[26px] w-14 animate-float motion-reduce:animate-none"
      />
    </footer>
  )
}
