import { Photo } from './Photo'

type PhotoCardProps = { src: string; alt: string; title: string; caption: string }

/** Foto vertical con degradado inferior y pie (tarjetas de viajes) */
export function PhotoCard({ src, alt, title, caption }: PhotoCardProps) {
  return (
    <figure className="group relative m-0 h-[360px] overflow-hidden bg-muted md:h-[520px]">
      <Photo
        src={src}
        alt={alt}
        className="transition-transform duration-1200 group-hover:scale-105 motion-reduce:transition-none"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-[45%] bottom-0 bg-linear-to-b from-transparent to-black/70"
      />
      <figcaption className="absolute bottom-[18px] left-[14px] z-10 pr-3 text-white md:bottom-[27px] md:left-6">
        <b className="block font-serif text-[25px] font-normal md:text-[31px]">{title}</b>
        <span className="block text-[7px] leading-snug tracking-[.22em] uppercase md:text-micro">
          {caption}
        </span>
      </figcaption>
    </figure>
  )
}
