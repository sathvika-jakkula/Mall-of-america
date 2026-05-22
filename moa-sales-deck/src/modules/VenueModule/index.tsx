import { ModuleShell } from '../_shared/ModuleShell'
import { contacts } from '../../data/contacts'

const venues = [
  {
    name: 'Executive Center',
    location: 'Overlooks Nickelodeon Universe',
    capacity: 'Flexible',
    sqft: 'Custom',
    features: ['Full A/V equipment', 'Overlooks 7-acre indoor theme park', 'Natural light', 'Catering available', 'Ideal for receptions, conferences, product demos'],
    image: '/images/executive_center.png',
  },
  {
    name: 'Parkview Meeting & Event Center',
    location: 'Southwest Corner · 4th Floor',
    capacity: '200+',
    sqft: 'Flexible',
    features: ['Outdoor balcony overlooking Nickelodeon Universe', 'Ambient perimeter lighting', 'Full A/V system', 'Private restrooms', 'Customizable layout'],
    image: '/images/parkview_center.png',
  },
  {
    name: 'Radisson Blu',
    location: 'On-Property Hotel',
    capacity: '1,000+',
    sqft: '26,300 sq ft',
    features: ['2 ballrooms', '14 meeting rooms', 'Video conferencing', 'LCD projection', 'Full catering & bar'],
    image: '/images/radisson_blu.png',
  },
  {
    name: 'JW Marriott',
    location: 'On-Property Hotel',
    capacity: '1,700',
    sqft: '19,000 sq ft',
    features: ['Largest event destination in Twin Cities', 'Grand Ballroom for 1,700', 'Multiple breakout rooms', 'Premium AV infrastructure', 'Full-service catering'],
    image: '/images/jw_marriott.png',
  },
]

export default function VenueModule() {
  return (
    <ModuleShell
      title="Venue Spaces"
      subtitle="45,000+ sq ft of combined event capacity in a destination unlike any other."
      heroImage="/images/venues_hero.png"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 2rem 80px' }}>

        {/* Summary stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '72px' }}>
          {[
            { v: '45,300+', l: 'Total Event Sq Ft' },
            { v: '1,700', l: 'Max Ballroom Capacity' },
            { v: '16+', l: 'Dedicated Meeting Rooms' },
          ].map((s, i) => (
            <div key={s.l} style={{ padding: '36px 20px', textAlign: 'center', background: '#0A0E1A', borderRight: i < 2 ? '1px solid rgba(201,168,76,0.08)' : 'none' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#C9A84C', fontWeight: 300, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Venue cards */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '32px' }}>
          Our Venues
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '2px', marginBottom: '72px' }}>
          {venues.map((v) => (
            <div
              key={v.name}
              style={{ background: '#111827', border: '1px solid rgba(201,168,76,0.1)', overflow: 'hidden', transition: 'border-color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.1)')}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,26,0.8) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '20px' }}>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '4px' }}>{v.location}</p>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    {v.sqft !== 'Custom' && v.sqft !== 'Flexible' && (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(248,246,242,0.6)' }}>{v.sqft}</span>
                    )}
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(248,246,242,0.6)' }}>Up to {v.capacity}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px 24px 28px' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#F8F6F2', fontWeight: 300, marginBottom: '18px' }}>{v.name}</h3>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {v.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ color: '#C9A84C', fontSize: '10px', marginTop: '4px', flexShrink: 0 }}>—</span>
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.55)', lineHeight: 1.6 }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Context highlight */}
        <div style={{ padding: '40px 48px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)', textAlign: 'center', marginBottom: '72px' }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#F8F6F2', fontWeight: 300, lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
            All venues are connected to MOA's ecosystem of <em style={{ color: '#C9A84C' }}>520+ stores</em>, <em style={{ color: '#C9A84C' }}>60+ restaurants</em>, and <em style={{ color: '#C9A84C' }}>40M annual visitors</em>. No other event venue offers this surrounding context.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.4)', marginBottom: '28px' }}>Let's plan your event at MOA.</p>
          <a
            href={`mailto:${contacts.events.email}`}
            style={{
              display: 'inline-block', padding: '16px 48px',
              background: '#C9A84C', color: '#0A0E1A',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#E4C97A')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#C9A84C')}
          >
            Request Venue Information
          </a>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.35)', marginTop: '12px' }}>
            {contacts.events.email} · {contacts.events.phone}
          </p>
        </div>

      </div>
    </ModuleShell>
  )
}
