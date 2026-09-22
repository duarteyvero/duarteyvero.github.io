import { useEffect, useRef, useState } from 'react'

/** Devuelve `true` la primera vez que el elemento entra en el viewport (y se queda así). */
export function useInView<T extends Element>(threshold = 0.1) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || inView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [inView, threshold])

  return { ref, inView }
}
