import { useEffect, useState } from 'react'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export type CountdownParts = { days: number; hours: number; minutes: number; seconds: number }

function remaining(target: Date): CountdownParts {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / DAY),
    hours: Math.floor((diff % DAY) / HOUR),
    minutes: Math.floor((diff % HOUR) / MINUTE),
    seconds: Math.floor((diff % MINUTE) / SECOND),
  }
}

export function useCountdown(target: Date) {
  const [parts, setParts] = useState(() => remaining(target))

  useEffect(() => {
    const id = window.setInterval(() => setParts(remaining(target)), SECOND)
    return () => window.clearInterval(id)
  }, [target])

  return parts
}
