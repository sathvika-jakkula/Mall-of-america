import { lazy, Suspense } from 'react'
import { useStore } from '../../store'

const EventsModule = lazy(() => import('../../modules/EventsModule'))
const SponsorshipModule = lazy(() => import('../../modules/SponsorshipModule'))
const LeasingModule = lazy(() => import('../../modules/LeasingModule'))
const VenueModule = lazy(() => import('../../modules/VenueModule'))

function Loading() {
  return (
    <div className="fixed inset-0 z-[40] bg-[var(--color-moa-navy)] flex items-center justify-center">
      <div className="text-[var(--color-moa-gold)] text-xs tracking-[0.3em] uppercase">Loading...</div>
    </div>
  )
}

export function ModuleRenderer() {
  const activeModule = useStore((s) => s.activeModule)

  if (!activeModule) return null

  return (
    <Suspense fallback={<Loading />}>
      {activeModule === 'events' && <EventsModule />}
      {activeModule === 'sponsorship' && <SponsorshipModule />}
      {activeModule === 'leasing' && <LeasingModule />}
      {activeModule === 'venue' && <VenueModule />}
    </Suspense>
  )
}
