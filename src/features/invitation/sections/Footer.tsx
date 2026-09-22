import { coupleNames, footer, weddingDate } from '@/content/wedding'
import { formatDateShort } from '@/lib/date'

export function Footer() {
  return (
    <footer className="bg-paper px-5 pt-[70px] pb-[45px] text-center">
      <p className="font-serif text-[42px]">{coupleNames}</p>
      <p className="mt-3 text-micro tracking-[.3em] text-muted uppercase">
        {formatDateShort(weddingDate)} · {footer.thanks}
      </p>
    </footer>
  )
}
