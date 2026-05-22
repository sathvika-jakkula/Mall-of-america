import { useStore } from '../../store'
import EventsModule from '../../modules/EventsModule'
import SponsorshipModule from '../../modules/SponsorshipModule'
import LeasingModule from '../../modules/LeasingModule'
import VenueModule from '../../modules/VenueModule'

export function ModuleRenderer() {
  const activeModule = useStore((s) => s.activeModule)

  if (!activeModule) return null

  return (
    <>
      {activeModule === 'events' && <EventsModule />}
      {activeModule === 'sponsorship' && <SponsorshipModule />}
      {activeModule === 'leasing' && <LeasingModule />}
      {activeModule === 'venue' && <VenueModule />}
    </>
  )
}
