import { cn } from '@/lib/cn'

const sizes = {
  display: 'font-script text-heading-display leading-[1.05]',
  xl: 'font-script text-heading-xl leading-[1.05]',
  lg: 'font-script text-heading-lg leading-[1.1]',
  md: 'font-serif text-heading-md leading-tight',
} as const

export type HeadingSize = keyof typeof sizes

type HeadingProps = {
  as?: 'h2' | 'h3'
  size?: HeadingSize
  /** Cada elemento es una línea */
  lines: readonly string[] | string
  id?: string
  className?: string
}

/** Títulos de sección: manuscritos en los tamaños grandes, serif en `md` */
export function Heading({ as: Tag = 'h2', size = 'xl', lines, id, className }: HeadingProps) {
  return (
    <Tag id={id} className={cn('m-0 font-normal', sizes[size], className)}>
      {typeof lines === 'string'
        ? lines
        : lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
    </Tag>
  )
}
