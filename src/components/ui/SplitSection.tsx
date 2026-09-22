import type { ReactNode } from 'react'
import type { Image } from '@/content/wedding'
import { cn } from '@/lib/cn'
import { Photo } from './Photo'
import { Reveal } from './Reveal'
import { Section } from './Section'

type SplitSectionProps = {
  image: Image
  photoSide: 'left' | 'right'
  background: 'paper' | 'dark'
  /** `contain` muestra la foto entera sobre un recuadro papel, con aire alrededor de la sección */
  fit?: 'cover' | 'contain'
  labelledBy?: string
  children: ReactNode
}

/** Foto grande (1.2fr) + texto (.8fr); en móvil se apilan con la foto arriba */
export function SplitSection({
  image,
  photoSide,
  background,
  fit = 'cover',
  labelledBy,
  children,
}: SplitSectionProps) {
  const framed = fit === 'contain'

  return (
    <Section
      background={background}
      spacing={framed ? 'default' : 'none'}
      aria-labelledby={labelledBy}
      className={cn(
        'grid',
        framed ? 'md:min-h-[520px]' : 'md:min-h-[480px]',
        photoSide === 'left' ? 'md:grid-cols-[1.2fr_.8fr]' : 'md:grid-cols-[.8fr_1.2fr]',
      )}
    >
      {/* La foto se posiciona en absoluto: la altura la marca el texto, no la imagen */}
      <div
        className={cn(
          'relative min-h-[55vh] md:min-h-[480px]',
          framed && 'bg-paper2 max-md:min-h-[430px]',
          photoSide === 'right' && 'md:order-last',
        )}
      >
        <Photo src={image.src} alt={image.alt} fit={fit} className="absolute inset-0" />
      </div>

      <Reveal
        className={cn(
          'flex items-center',
          framed ? 'py-[70px] md:px-[9%] md:py-20' : 'px-[30px] py-[70px] md:px-[9%]',
        )}
      >
        <div>{children}</div>
      </Reveal>
    </Section>
  )
}
