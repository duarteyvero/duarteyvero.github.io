import type { ComponentProps } from 'react'
import { outlineButtonClass } from './buttonStyles'
import type { Tone } from './tone'

type ButtonLinkProps = ComponentProps<'a'> & { tone?: Tone }

/** Enlace con aspecto de botón fino (outline) del diseño original */
export function ButtonLink({ tone = 'light', className, href, ...props }: ButtonLinkProps) {
  const isExternal = href?.startsWith('http')

  return (
    <a
      href={href}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      className={outlineButtonClass(tone, className)}
      {...props}
    />
  )
}
