import { ModuleShell } from '../_shared/ModuleShell'
import { contacts } from '../../data/contacts'

const eventTypes = [
  { type: 'Concerts & Live Music', desc: 'Multiple stages accommodate intimate performances to large-scale productions across the property.', icon: '♪' },
  { type: 'Brand Activations', desc: 'Pop-ups, experiential installs, and live competitions in front of 40M captive consumers.', icon: '◈' },
  { type: 'Corporate Events', desc: 'Executive Center + Parkview venues. Radisson Blu & JW Marriott for conferences and offsites.', icon: '◇' },
  { type: 'Celebrity Appearances', desc: 'A-list appearances for signings, launches, and special events with massive built-in audiences.', icon: '★' },
  { type: 'Product Launches', desc: 'Command national attention — 40M footfall combined with full media amplification.', icon: '◉' },
  { type: 'Community & Holiday', desc: 'MOA programs 365 days of events across cultural celebrations, sports, and community milestones.', icon: '◎' },
]

export default function EventsModule() {
  return (
    <ModuleShell
      title="Events &amp; Activation"
      subtitle="North America's most activated retail destination — 400+ events every year."
      heroImage="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=80"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 2rem 80px' }}>

        {/* Super Bowl stat banner */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          border: '1px solid rgba(201,168,76,0.25)',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, transparent 60%)',
          marginBottom: '72px',
        }}>
          {[
            { v: '400+', l: 'Events Per Year' },
            { v: '1.5M', l: 'Visitors in 10 Days (Super Bowl LII)' },
            { v: '1,700', l: 'Grand Ballroom Capacity' },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: '36px 28px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(201,168,76,0.15)' : 'none',
            }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#C9A84C', fontWeight: 300, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Section label */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '32px' }}>
          Event Categories
        </p>

        {/* Event type grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '72px' }}>
          {eventTypes.map((e) => (
            <div
              key={e.type}
              style={{
                padding: '32px 28px', background: '#0A0E1A',
                transition: 'background 0.3s',
              }}
              onMouseEnter={el => (el.currentTarget.style.background = '#111827')}
              onMouseLeave={el => (el.currentTarget.style.background = '#0A0E1A')}
            >
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', color: '#C9A84C', marginBottom: '14px', opacity: 0.7 }}>{e.icon}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '18px', color: '#F8F6F2', fontWeight: 300, marginBottom: '10px', letterSpacing: '0.01em' }}>{e.type}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.5)', lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Super Bowl highlight */}
        <div style={{
          padding: '48px', marginBottom: '72px',
          background: 'rgba(201,168,76,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '20px' }}>Proven at Scale</p>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', color: '#F8F6F2', fontWeight: 300, lineHeight: 1.4, maxWidth: '640px', margin: '0 auto 20px' }}>
            When Super Bowl LII came to Minneapolis, Mall of America was the <em>official destination</em> — 1.5 million visitors in 10 days.
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.45)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            Brands activated at scale. Attendance shattered records. This is the platform you get access to.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.4)', letterSpacing: '0.05em', marginBottom: '24px' }}>
            Ready to activate at MOA?
          </p>
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
            Book an Event Consultation
          </a>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.35)', marginTop: '12px' }}>
            {contacts.events.email} · {contacts.events.phone}
          </p>
        </div>

      </div>
    </ModuleShell>
  )
}
