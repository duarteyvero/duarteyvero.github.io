import { Countdown } from './sections/Countdown'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Proposal } from './sections/Proposal'
import { Ring } from './sections/Ring'
import { Rsvp } from './sections/Rsvp'
import { Schedule } from './sections/Schedule'
import { Story } from './sections/Story'
import { Travels } from './sections/Travels'
import { Venue } from './sections/Venue'

export function InvitationPage() {
  return (
    <>
      <Hero />
      <main>
        <Story />
        <Travels />
        <Proposal />
        <Ring />
        <Countdown />
        <Venue />
        <Schedule />
        <Rsvp />
      </main>
      <Footer />
    </>
  )
}
