import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Photo } from './Photo'

type PolaroidProps = {
  src: string
  alt: string
  caption: string
  /** Decoraciones superpuestas (p. ej. un matasellos) */
  children?: ReactNode
  className?: string
}

/** Foto tipo polaroid, ligeramente girada y sujeta con cinta */
export function Polaroid({ src, alt, caption, children, className }: PolaroidProps) {
  return (
    <figure
      className={cn(
        'relative mx-auto w-[min(78%,340px)] -rotate-[2.5deg] bg-white p-3 pb-14 shadow-[0_22px_40px_rgb(0_0_0/.3)]',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 rotate-2 bg-gold/75"
      />
      <div className="aspect-4/5">
        <Photo src={src} alt={alt} />
      </div>
      <figcaption className="absolute inset-x-0 bottom-2.5 text-center font-script text-[34px] text-green">
        {caption}
      </figcaption>
      {children}
    </figure>
  )
}
