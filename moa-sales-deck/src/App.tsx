import { LenisProvider } from './components/layout/LenisProvider'
import { DeckShell } from './components/layout/DeckShell'
import { NavOverlay } from './components/navigation/NavOverlay'
import { ModuleRenderer } from './components/layout/ModuleRenderer'
import { HeroSection } from './sections/Hero'
import { WhyMOASection } from './sections/WhyMOA'
import { RetailSection } from './sections/Retail'
import { LuxurySection } from './sections/Luxury'
import { DiningSection } from './sections/Dining'
import { AttractionsSection } from './sections/Attractions'
import { EventsSection } from './sections/Events'
import { ContactSection } from './sections/Contact'
import { useSectionObserver } from './hooks/useSectionObserver'

function Deck() {
  useSectionObserver()

  return (
    <main>
      <HeroSection />
      <WhyMOASection />
      <RetailSection />
      <LuxurySection />
      <DiningSection />
      <AttractionsSection />
      <EventsSection />
      <ContactSection />
    </main>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <DeckShell />
      <NavOverlay />
      <ModuleRenderer />
      <Deck />
    </LenisProvider>
  )
}
