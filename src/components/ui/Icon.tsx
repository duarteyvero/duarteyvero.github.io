import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type IconDef = { viewBox: string; filled?: boolean; body: ReactNode }

const icons = {
  plane: {
    viewBox: '0 0 64 64',
    filled: true,
    body: (
      <path d="M61 32c0-2.4-2.2-3.6-4.6-3.6H40.5L26.2 6h-6.4l7.2 22.4H13.6L8.4 21H3.6l3 11-3 11h4.8l5.2-7.4H27L19.8 58h6.4l14.3-22.4h15.9c2.4 0 4.6-1.2 4.6-3.6z" />
    ),
  },
  heart: {
    viewBox: '0 0 24 24',
    filled: true,
    body: (
      <path d="M12 21s-7.5-4.6-9.6-9.3C.8 8.1 3 4 6.9 4c2.2 0 3.8 1.2 5.1 3 1.3-1.8 2.9-3 5.1-3C21 4 23.2 8.1 21.6 11.7 19.5 16.4 12 21 12 21z" />
    ),
  },
  pin: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.6" />
      </>
    ),
  },
  calendar: {
    viewBox: '0 0 24 24',
    body: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </>
    ),
  },
  rings: {
    viewBox: '0 0 32 32',
    body: (
      <>
        <circle cx="12" cy="19" r="7" />
        <circle cx="20" cy="19" r="7" />
        <path d="M13 7l3-3 3 3-3 3z" />
      </>
    ),
  },
  cocktail: {
    viewBox: '0 0 32 32',
    body: (
      <path d="M8 5h7l-1 8a2.5 2.5 0 0 1-5 0zM11.5 15.5V26M8 26h7M17 5h7l-1 8a2.5 2.5 0 0 1-5 0zM20.5 15.5V26M17 26h7" />
    ),
  },
  dinner: {
    viewBox: '0 0 32 32',
    body: (
      <>
        <circle cx="16" cy="17" r="8" />
        <circle cx="16" cy="17" r="4.5" />
        <path d="M4 6v6a2 2 0 0 0 2 2v12M6 6v6M8 6v6a2 2 0 0 1-2 2M27 6c-2 1-3 4-3 8h3v12" />
      </>
    ),
  },
  bus: {
    viewBox: '0 0 32 32',
    body: (
      <>
        <rect x="5" y="4" width="22" height="20" rx="3" />
        <path d="M5 15h22M5 9h22M9 19h2M21 19h2M8 24v3M24 24v3" />
      </>
    ),
  },
  music: {
    viewBox: '0 0 32 32',
    body: (
      <>
        <path d="M12 24V8l14-3v16M12 12l14-3" />
        <circle cx="9" cy="24" r="3" />
        <circle cx="23" cy="21" r="3" />
      </>
    ),
  },
} satisfies Record<string, IconDef>

export type IconName = keyof typeof icons

type IconProps = { name: IconName } & Omit<ComponentProps<'svg'>, 'viewBox' | 'children'>

/**
 * Iconos decorativos (siempre `aria-hidden`: el texto de al lado da el significado).
 * Acepta `x`/`y`/`width`/`height` para colocarlo dentro de otro SVG.
 */
export function Icon({ name, className, ...props }: IconProps) {
  const { viewBox, body, ...rest }: IconDef = icons[name]

  return (
    <svg
      viewBox={viewBox}
      aria-hidden
      {...props}
      className={cn(
        rest.filled
          ? 'fill-current'
          : 'fill-none stroke-current stroke-[1.7] [stroke-linecap:round] [stroke-linejoin:round]',
        className,
      )}
    >
      {body}
    </svg>
  )
}
