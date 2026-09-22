import type { ComponentProps } from 'react'
import { outlineButtonClass } from './buttonStyles'
import type { Tone } from './tone'

type OutlineButtonProps = ComponentProps<'button'> & { tone?: Tone }

/** Botón con el mismo aspecto que `ButtonLink`, para acciones dentro de la página */
export function OutlineButton({
  tone = 'light',
  className,
  type = 'button',
  ...props
}: OutlineButtonProps) {
  return <button type={type} className={outlineButtonClass(tone, className)} {...props} />
}
