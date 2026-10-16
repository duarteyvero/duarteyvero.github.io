import boteroGarden1 from '@/assets/images/botero-jardin-1.webp'
import boteroGarden2 from '@/assets/images/botero-jardin-2.webp'
import boteroGarden3 from '@/assets/images/botero-jardin-3.webp'
import boteroTemplete from '@/assets/images/botero-templete.webp'
import proposalPhoto from '@/assets/images/proposal.webp'
import ringPhoto from '@/assets/images/ring.webp'
import travelBali from '@/assets/images/travel-bali.webp'
import travelChina from '@/assets/images/travel-china.webp'
import travelEgypt from '@/assets/images/travel-egipto.webp'
import travelMore from '@/assets/images/travel-mas.webp'
import type { IconName } from '@/components/ui/Icon'

/**
 * Única fuente de verdad del contenido de la invitación.
 * Cambiar un texto, un horario o una foto = tocar solo este fichero.
 */

export type Image = { src: string; alt: string }

export const couple = { first: 'Duarte', second: 'Vero' } as const
export const coupleNames = `${couple.first} & ${couple.second}`
/** D&V */
export const monogram = `${couple.first[0]}&${couple.second[0]}`

export const weddingDate = new Date('2027-07-17T18:30:00+02:00')

export const sectionIds = {
  story: 'historia',
  venue: 'botero',
  schedule: 'dia',
  bus: 'autobus',
  rsvp: 'rsvp',
} as const

export const navLinks = [
  { href: `#${sectionIds.story}`, label: 'Historia' },
  { href: `#${sectionIds.venue}`, label: 'Destino' },
  { href: `#${sectionIds.schedule}`, label: 'Itinerario' },
  { href: `#${sectionIds.rsvp}`, label: 'Asistencia' },
] as const

/** Tapa del pasaporte que se abre al entrar */
export const cover = {
  title: 'Pasaporte',
  subtitle: 'A la boda de',
  hint: 'Toca para abrir',
}

export const hero = {
  title: 'Pasaporte',
  eyebrow: 'A la boda de',
  postmark: `${coupleNames} · Nos casamos ·`,
  scrollLabel: 'Embarcar',
}

export const story = {
  kicker: 'Nuestra historia',
  title: ['Un viaje que sigue', 'sumando destinos'],
  lead: 'Nos conocimos, viajamos, reímos, nos perdimos y siempre nos encontramos. Cada lugar nos ha dejado algo, pero lo mejor de cada viaje siempre ha sido hacerlo juntos.',
  closing:
    'Y todavía nos quedan muchos por vivir: prepara tus maletas y acompáñanos en esta aventura.',
  postmark: `Con amor · ${coupleNames} ·`,
}

/** Página de datos del pasaporte. Fecha, hora y destino se derivan de `weddingDate` y `venue` */
export const passport = {
  title: 'Pasaporte a nuestra boda',
  photo: { src: proposalPhoto, alt: 'Duarte y Vero el día de la pedida' },
  ceremony: 'Civil',
  party: 'Hasta que el cuerpo aguante',
  postmark: 'Aprobado · Visado de amor ·',
}

export const travelsHeader = {
  kicker: 'Sellos en el pasaporte',
  title: 'Escalas',
  lead: 'Algunos de los destinos que ya hemos sellado juntos.',
}

export const travels = [
  { title: 'Egipto', caption: 'Donde empezó la aventura', image: travelEgypt },
  { title: 'Bali', caption: 'Y descubrimos que viajar juntos era lo mejor', image: travelBali },
  { title: 'China', caption: 'Kilómetros de recuerdos', image: travelChina },
  { title: 'Y muchos más...', caption: 'Porque el mejor destino es juntos', image: travelMore },
]

export const proposal = {
  kicker: 'Un momento para recordar',
  title: ['Y entonces llegó', 'la pregunta...'],
  text: 'Un lugar inolvidable, una noche especial y una pregunta que cambió nuestra historia para siempre.',
  sign: 'Dijo que sí ❤',
  postmark: 'Dijo que sí · Dijo que sí ·',
  image: { src: ringPhoto, alt: 'El anillo de compromiso' },
  /** Se completa con la fecha: «Y así empezó el siguiente capítulo: 17 de julio de 2027. …» */
  nextChapter: 'Y así empezó el siguiente capítulo',
  closing: 'Y queremos vivirlo rodeados de nuestra gente.',
}

export const countdown = {
  kicker: 'Cada vez queda menos',
  title: 'Cuenta atrás para iniciar el embarque a la mejor fiesta',
  /** El avión recorre la línea durante el último año */
  flightDays: 365,
  calendar: {
    label: 'Añadir al calendario',
    title: `Boda ${coupleNames}`,
    details: '¡Nos casamos!',
    durationHours: 9,
  },
}

export const venue = {
  kicker: 'Próximo destino',
  title: 'Destino',
  name: 'Jardín El Botero',
  text: 'Jardines, espacios para la celebración y un entorno que queremos compartir con todos vosotros. Próximamente añadiremos aquí cómo llegar, horarios, parking y toda la información práctica del día.',
  hero: { src: boteroGarden2, alt: 'Jardines de El Botero' },
  links: [
    {
      href: 'https://www.google.com/maps/search/?api=1&query=Jard%C3%ADn+El+Botero',
      label: 'Cómo llegar',
      icon: 'pin',
    },
    { href: 'https://www.jardinelbotero.com/', label: 'Descubrir El Botero' },
  ] satisfies { href: string; label: string; icon?: IconName }[],
  gallery: [
    { src: boteroGarden1, alt: 'Jardín de El Botero' },
    { src: boteroTemplete, alt: 'Templete exterior de El Botero' },
    { src: boteroGarden3, alt: 'Zona verde de El Botero' },
  ] satisfies Image[],
}

export const schedule = {
  kicker: 'Plan de vuelo',
  title: 'Itinerario',
  lead: 'Los horarios son provisionales y los actualizaremos cuando tengamos todo cerrado.',
  events: [
    { time: '18:30', label: 'Ceremonia civil', icon: 'rings' },
    { time: '19:30', label: 'Cóctel', icon: 'cocktail' },
    { time: '21:00', label: 'Cena', icon: 'dinner' },
    { time: '23:00', label: 'Fiesta', icon: 'music' },
  ] satisfies { time: string; label: string; icon: IconName }[],
}

const busStop = {
  name: 'Plaza de Castilla',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Plaza+de+Castilla+Madrid',
}

export const bus = {
  kicker: 'Traslados',
  title: 'Autobús',
  lead: 'Habrá autobús de ida y vuelta para que nadie tenga que preocuparse por el coche: disfruta de la fiesta, que nosotros te llevamos.',
  stop: busStop,
  trips: [
    { label: 'Ida', from: busStop.name, to: venue.name, time: 'Por confirmar' },
    { label: 'Vuelta', from: venue.name, to: busStop.name, time: 'Por confirmar' },
  ],
  note: 'Cuando confirmes tu asistencia, dinos si vas a usarlo para reservarte plaza.',
  stopLink: 'Ver punto de salida',
  rsvpLink: 'Reservar plaza',
}

export const rsvp = {
  kicker: 'Y ahora falta lo más importante',
  title: '¿Nos acompañas?',
  lead: 'Confírmanos tu asistencia y encuentra aquí toda la información que necesitas para disfrutar del día con nosotros.',
  cta: 'Confirmar asistencia',
}

/** Tarjeta de embarque de la sección RSVP. Vuelo y fecha se derivan de `weddingDate` */
export const boardingPass = {
  title: 'Tarjeta de embarque',
  origin: 'Tú',
  boarding: '18:00 h',
  seat: 'Con nosotros',
}

/** Platos principales a elegir en el RSVP. La clave es lo que se guarda en BD (`guests.main_course`) */
export const mainCourses = {
  meat: {
    label:
      'Tierno entrecot de lomo alto de ternera a las ascuas de carbón de encina con pastel de patatas gratinado',
    short: 'Entrecot',
  },
  fish: {
    label: 'Lubina con salsa de vieiras y langostinos',
    short: 'Lubina',
  },
} as const

export const footer = {
  kind: 'Boda',
  luggage: 'En la maleta solo necesitas traer muchas ganas de celebrar con nosotros',
  farewell: '¡Te esperamos!',
  thanks: 'Gracias por formar parte de nuestra historia',
}
