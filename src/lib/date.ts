const TIME_ZONE = 'Europe/Madrid'

function parts(date: Date) {
  const get = (options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('es-ES', { timeZone: TIME_ZONE, ...options }).format(date)

  return {
    day: get({ day: 'numeric' }),
    day2: get({ day: '2-digit' }),
    month: get({ month: 'long' }),
    month2: get({ month: '2-digit' }),
    year: get({ year: 'numeric' }),
  }
}

/** 17 · JULIO · 2027 */
export function formatDateLong(date: Date) {
  const { day, month, year } = parts(date)
  return [day, month.toUpperCase(), year].join(' · ')
}

/** 17 · 07 · 2027 */
export function formatDateShort(date: Date) {
  const { day2, month2, year } = parts(date)
  return [day2, month2, year].join(' · ')
}

/** 17.07.2027 */
export function formatDateDots(date: Date) {
  const { day2, month2, year } = parts(date)
  return [day2, month2, year].join('.')
}

/** 17 de julio de 2027 */
export function formatDateText(date: Date) {
  const { day, month, year } = parts(date)
  return `${day} de ${month} de ${year}`
}

/** 17 de julio */
export function formatDayMonth(date: Date) {
  const { day, month } = parts(date)
  return `${day} de ${month}`
}

/** 22/09/2026 12:30 */
export function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat('es-ES', {
    timeZone: TIME_ZONE,
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(iso))
}
