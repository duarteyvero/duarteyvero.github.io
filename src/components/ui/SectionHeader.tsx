import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Heading, type HeadingSize } from './Heading'
import { Kicker } from './Kicker'
import { Lead } from './Lead'
import type { Tone } from './tone'

type SectionHeaderProps = {
  kicker: string
  title: readonly string[] | string
  titleId?: string
  titleAs?: 'h2' | 'h3'
  titleSize?: HeadingSize
  lead?: ReactNode
  tone?: Tone
  align?: 'center' | 'start'
  className?: string
}

/** Kicker + título + entradilla: la cabecera que se repite en casi todas las secciones */
export function SectionHeader({
  kicker,
  title,
  titleId,
  titleAs,
  titleSize = 'xl',
  lead,
  tone = 'light',
  align = 'center',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      <Kicker tone={tone}>{kicker}</Kicker>
      <Heading as={titleAs} id={titleId} size={titleSize} lines={title} />
      {lead && (
        <Lead tone={tone} align={align}>
          {lead}
        </Lead>
      )}
    </div>
  )
}
