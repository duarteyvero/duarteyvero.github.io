import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'
import type { Tone } from './tone'

type ButtonLinkProps = ComponentProps<'a'> & { tone?: Tone }

/** Enlace con aspecto de botón fino (outline) del diseño original */
export function ButtonLink({ tone = 'light', className, href, ...props }: ButtonLinkProps) {
  const isExternal = href?.startsWith('http')

  return (
    <a
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={cn(
        'mt-5 inline-block border px-[25px] py-[14px] text-micro tracking-[.25em] uppercase transition-colors',
        tone === 'light'
          ? 'border-olive hover:bg-olive hover:text-white'
          : 'border-white/65 text-white hover:bg-white hover:text-dark',
        className,
      )}
      {...props}
    />
  )
}
