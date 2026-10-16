import { Airmail } from '@/components/ui/Airmail'
import { usePassportCover } from '@/hooks/usePassportCover'
import { PassportCover } from './PassportCover'
import { Bus } from './sections/Bus'
import { Countdown } from './sections/Countdown'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { PassportData } from './sections/PassportData'
import { Proposal } from './sections/Proposal'
import { Rsvp } from './sections/Rsvp'
import { Schedule } from './sections/Schedule'
import { Story } from './sections/Story'
import { Travels } from './sections/Travels'
import { Venue } from './sections/Venue'

/** La invitación es un «librito» estrecho centrado, como un pasaporte abierto en el móvil */
export function InvitationPage() {
  const cover = usePassportCover()

  return (
    <>
      <PassportCover state={cover.state} onOpen={cover.open} />
      {/* Mientras la tapa está cerrada, la invitación no recibe foco ni clics */}
      <div
        inert={cover.state !== 'open'}
        className="mx-auto max-w-[640px] overflow-hidden bg-paper md:shadow-[0_0_60px_rgb(44_79_70/.15)]"
      >
        <Hero />
        <Airmail />
        <main>
          <Story />
          <PassportData />
          <Travels />
          <Proposal />
          <Airmail />
          <Venue />
          <Schedule />
          <Bus />
          <Countdown />
          <Rsvp />
          <Airmail />
        </main>
        <Footer />
        <Airmail />
      </div>
    </>
  )
}
