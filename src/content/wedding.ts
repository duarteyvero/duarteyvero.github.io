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

/**
 * Única fuente de verdad del contenido de la invitación.
 * Cambiar un texto, un horario o una foto = tocar solo este fichero.
 */

export type Image = { src: string; alt: string }

export const couple = { first: 'Duarte', second: 'Vero' } as const
export const coupleNames = `${couple.first} & ${couple.second}`

export const weddingDate = new Date('2027-07-17T18:30:00+02:00')

export const sectionIds = {
  story: 'historia',
  venue: 'botero',
  schedule: 'dia',
  rsvp: 'rsvp',
} as const

export const navLinks = [
  { href: `#${sectionIds.story}`, label: 'Nuestra historia' },
  { href: `#${sectionIds.venue}`, label: 'El Botero' },
  { href: `#${sectionIds.schedule}`, label: 'El día' },
  { href: `#${sectionIds.rsvp}`, label: 'Confirma tu asistencia' },
] as const

export const hero = {
  eyebrow: 'Nos casamos',
  tagline: 'Nuestra aventura continúa...',
  scrollLabel: 'Descubrir',
}

export const story = {
  kicker: 'Nuestra historia',
  title: ['Un viaje que sigue', 'sumando destinos.'],
  lead: 'Nos conocimos, viajamos, reímos, nos perdimos y siempre nos encontramos. Cada lugar nos ha dejado algo, pero lo mejor de cada viaje siempre ha sido hacerlo juntos.',
  closing: 'Y todavía nos quedan muchos por vivir.',
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
  sign: 'Dijo que sí. ❤️',
  image: { src: proposalPhoto, alt: 'Duarte y Vero el día de la pedida' },
}

export const ring = {
  kicker: 'Y así empezó el siguiente capítulo',
  title: ['Nos casamos.'],
  text: 'Y queremos vivirlo rodeados de nuestra gente.',
  image: { src: ringPhoto, alt: 'El anillo de compromiso' },
}

export const countdown = {
  kicker: 'Cada vez queda menos',
  title: 'Cuenta atrás.',
}

export const venue = {
  kicker: 'El lugar',
  title: 'El Botero.',
  lead: 'El escenario elegido para celebrar este nuevo capítulo con vosotros.',
  url: 'https://www.jardinelbotero.com/',
  hero: { src: boteroGarden2, alt: 'Jardines de El Botero' },
  cards: [
    {
      title: 'Un día para disfrutar.',
      text: 'Jardines, espacios para la celebración y un entorno que queremos compartir con todos vosotros.',
      link: { href: 'https://www.jardinelbotero.com/', label: 'Descubrir El Botero' },
    },
    {
      title: 'Nos vemos allí.',
      text: 'Próximamente añadiremos aquí cómo llegar, horarios, parking y toda la información práctica del día.',
    },
  ],
  gallery: [
    { src: boteroGarden1, alt: 'Jardín de El Botero' },
    { src: boteroGarden2, alt: 'Exteriores de El Botero' },
    { src: boteroGarden3, alt: 'Zona verde de El Botero' },
    { src: boteroTemplete, alt: 'Templete exterior de El Botero' },
  ] satisfies Image[],
}

export const schedule = {
  kicker: 'El día',
  title: 'Así será nuestra boda.',
  lead: 'Los horarios son provisionales y los actualizaremos cuando tengamos todo cerrado.',
  events: [
    { time: '18:30', label: 'Ceremonia civil' },
    { time: '19:30', label: 'Cóctel' },
    { time: '21:00', label: 'Cena' },
    { time: '23:00', label: 'Fiesta' },
  ],
}

export const rsvp = {
  kicker: 'Y ahora falta lo más importante',
  title: '¿Nos acompañas?',
  lead: 'Confírmanos tu asistencia y encuentra aquí toda la información que necesitas para disfrutar del día con nosotros.',
  cta: 'Confirmar asistencia',
}

export const footer = {
  thanks: 'Gracias por formar parte de nuestra historia',
}
