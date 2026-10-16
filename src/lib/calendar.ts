type CalendarEvent = {
  title: string
  start: Date
  durationHours: number
  location: string
  details?: string
}

/** 2027-07-17T16:30:00.000Z → 20270717T163000Z */
const toUtcStamp = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')

/** Enlace para añadir el evento a Google Calendar (sin ficheros .ics ni librerías) */
export function googleCalendarUrl({
  title,
  start,
  durationHours,
  location,
  details,
}: CalendarEvent) {
  const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    location,
    ...(details && { details }),
  })
  return `https://calendar.google.com/calendar/render?${params}`
}
