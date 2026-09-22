import { cn } from '@/lib/cn'

const sizes = {
  display: 'text-heading-display leading-[.82] tracking-[-.02em]',
  xl: 'text-heading-xl leading-[.82] tracking-[-.02em]',
  lg: 'text-heading-lg leading-[.88]',
  md: 'text-heading-md leading-none',
} as const

export type HeadingSize = keyof typeof sizes

type HeadingProps = {
  as?: 'h2' | 'h3'
  size?: HeadingSize
  /** Cada elemento es una línea (equivale a los <br> del diseño original) */
  lines: readonly string[] | string
  id?: string
  className?: string
}

export function Heading({ as: Tag = 'h2', size = 'xl', lines, id, className }: HeadingProps) {
  return (
    <Tag id={id} className={cn('m-0 font-serif font-normal', sizes[size], className)}>
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
