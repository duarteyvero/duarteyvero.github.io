import { useEffect } from 'react'

/** Bloquea el scroll de la página mientras `locked` sea `true` */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [locked])
}
