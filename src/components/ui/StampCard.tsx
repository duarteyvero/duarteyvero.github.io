import { cn } from '@/lib/cn'
import { Photo } from './Photo'

type StampCardProps = {
  src: string
  alt: string
  title: string
  caption: string
  /** Número pequeño de la esquina, como el valor de un sello */
  value: string
  className?: string
}

/** Foto con borde perforado de sello de correos y pie sobre degradado */
export function StampCard({ src, alt, title, caption, value, className }: StampCardProps) {
  return (
    <figure
      className={cn(
        'relative m-0 self-start p-2.5 drop-shadow-[0_4px_8px_rgb(44_79_70/.22)] transition-transform duration-500 stamp-edge hover:scale-[1.03] hover:rotate-0 motion-reduce:transition-none',
        className,
      )}
    >
      <div aria-hidden className="absolute inset-1.5 bg-white" />
      <div className="relative aspect-3/4 overflow-hidden border border-line">
        <Photo src={src} alt={alt} />
        <div
          aria-hidden
          className="absolute inset-x-0 top-1/2 bottom-0 bg-linear-to-b from-transparent to-black/75"
        />
        <span
          aria-hidden
          className="absolute top-2 right-2 font-display text-[15px] text-white text-shadow-[0_1px_6px_rgb(0_0_0/.4)]"
        >
          {value}
        </span>
        <figcaption className="absolute inset-x-2.5 bottom-2.5 text-left text-white">
          <b className="block font-display text-[clamp(19px,5.4vw,26px)] leading-[1.05] font-normal">
            {title}
          </b>
          <span className="mt-1 block font-type text-[10px] leading-snug tracking-[.06em]">
            {caption}
          </span>
        </figcaption>
      </div>
    </figure>
  )
}
