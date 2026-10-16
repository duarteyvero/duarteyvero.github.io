import { useId } from 'react'
import { Icon } from '@/components/ui/Icon'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ROUTE = 'M-20 170 C 90 60, 210 260, 300 150 S 430 120, 420 40'
const RETURN_ROUTE = 'M-20 700 C 120 640, 200 780, 320 690 S 410 640, 430 600'

/** Rutas de vuelo punteadas con un avión recorriéndolas (fondo del hero) */
export function FlightRoute() {
  const routeId = `route-${useId().replace(/[^\w-]/g, '')}`
  const reducedMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 400 800"
      preserveAspectRatio="none"
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    >
      <g className="fill-none stroke-green/35 stroke-2 [stroke-dasharray:6_9]">
        <path id={routeId} d={ROUTE} />
        <path d={RETURN_ROUTE} />
      </g>
      <g className="text-green">
        {reducedMotion ? (
          <Icon name="plane" x="283" y="118" width="34" height="34" />
        ) : (
          <g>
            <Icon name="plane" x="-17" y="-17" width="34" height="34" />
            <animateMotion dur="9s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${routeId}`} />
            </animateMotion>
          </g>
        )}
      </g>
    </svg>
  )
}
