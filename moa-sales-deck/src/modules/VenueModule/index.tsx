import { ModuleShell } from '../_shared/ModuleShell'
import { Button } from '../../components/ui/Button'
import { contacts } from '../../data/contacts'

const venues = [
  {
    name: 'Executive Center',
    location: 'Overlooks Nickelodeon Universe',
    sqft: 'Custom',
    capacity: 'Flexible',
    features: ['Full A/V equipment', 'Overlooks 7-acre theme park', 'Natural light', 'Catering available', 'Ideal for receptions, conferences, product demos'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  },
  {
    name: 'Parkview Meeting & Event Center',
    location: 'Southwest Corner · 4th Floor',
    sqft: 'Flexible',
    capacity: '200+',
    features: ['Outdoor balcony overlooking Nickelodeon Universe', 'Perimeter ambient lighting', 'Full A/V system', 'Private restrooms', 'Customizable layout'],
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  },
  {
    name: 'Radisson Blu',
    location: 'On-Property Hotel',
    sqft: '26,300 sq ft',
    capacity: '1,000+',
    features: ['2 ballrooms', '14 meeting rooms', 'Video conferencing', 'LCD projection', 'Full catering & bar'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f29c8a4c62?w=800&q=80',
  },
  {
    name: 'JW Marriott',
    location: 'On-Property Hotel',
    sqft: '19,000 sq ft',
    capacity: '1,700',
    features: ['One of largest event destinations in Twin Cities', 'Grand Ballroom for 1,700', 'Multiple breakout rooms', 'Premium AV infrastructure', 'Full-service catering'],
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
  },
]

export default function VenueModule() {
  return (
    <ModuleShell title="Venue Spaces" id="venue">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">
        {/* Hero */}
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-light text-[var(--color-moa-cream)] mb-4" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            Venues that<br /><em>command attention.</em>
          </h2>
          <p className="text-[var(--color-moa-gray-light)] max-w-xl mx-auto text-base leading-relaxed">
            MOA's on-property event spaces and connected hotels offer 45,000+ sq ft of combined meeting and event capacity in a destination unlike any other.
          </p>
        </div>

        {/* Venue cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {venues.map((v) => (
            <div key={v.name} className="border border-[rgba(201,168,76,0.15)] overflow-hidden hover:border-[rgba(201,168,76,0.4)] transition-colors duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={v.image}
                  alt={v.name}
                  className="video-fill object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,14,26,0.7)] to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="text-[var(--color-moa-cream)] text-xl font-light mb-1" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{v.name}</h3>
                <p className="text-[var(--color-moa-gold)] text-xs tracking-wider mb-1">{v.location}</p>
                <div className="flex gap-6 text-xs text-[var(--color-moa-gray-light)] mb-5">
                  {v.sqft !== 'Custom' && v.sqft !== 'Flexible' && (
                    <span><strong>{v.sqft}</strong> total</span>
                  )}
                  <span>Capacity: <strong>{v.capacity}</strong></span>
                </div>
                <ul className="space-y-2">
                  {v.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-moa-gray-light)]">
                      <span className="text-[var(--color-moa-gold)] text-xs mt-0.5">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.2)] p-10 text-center">
          <div className="grid grid-cols-3 gap-8 mb-8">
            {[
              { v: '45,300+', l: 'Total Event Sq Ft' },
              { v: '1,700', l: 'Max Ballroom Capacity' },
              { v: '16+', l: 'Dedicated Meeting Rooms' },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-3xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{s.v}</div>
                <div className="text-xs tracking-wider uppercase text-[var(--color-moa-gray-light)] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
          <p className="text-[var(--color-moa-gray-light)] text-sm leading-relaxed max-w-md mx-auto">
            All venues are connected to MOA's ecosystem of 520+ stores, 60+ restaurants, and 40M annual visitors.
            No other event venue offers this surrounding context.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[var(--color-moa-gray-light)] text-sm mb-6">Let's plan your event at MOA.</p>
          <a href={`mailto:${contacts.events.email}`}>
            <Button variant="gold">Request Venue Information</Button>
          </a>
        </div>
      </div>
    </ModuleShell>
  )
}
