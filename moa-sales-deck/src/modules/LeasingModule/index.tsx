import { ModuleShell } from '../_shared/ModuleShell'
import { contacts } from '../../data/contacts'

const paths = [
  {
    type: 'Luxury Flagship',
    desc: 'Full-line luxury retail alongside Gucci, Coach, Burberry & CHANEL. Tax-free shopping for 40M affluent consumers.',
    examples: ['Designer apparel', 'Luxury jewelry', 'Prestige beauty', 'High-end accessories'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80',
    gold: true,
  },
  {
    type: 'Standard Retail',
    desc: 'Join 520+ specialty stores serving the largest single retail destination in North America.',
    examples: ['Fashion & apparel', 'Electronics & tech', 'Home & lifestyle', 'Sports & outdoor'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    gold: false,
  },
  {
    type: 'Food & Beverage',
    desc: 'Dining is a primary destination driver at MOA. Join 60+ restaurants serving 40M annual visitors.',
    examples: ['Full-service dining', 'Quick service', 'Food court', 'Specialty concepts'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    gold: false,
  },
  {
    type: 'Pop-Up & Kiosk',
    desc: 'Low commitment, high exposure. Test your brand in front of 40M consumers before committing to a full lease.',
    examples: ['Seasonal pop-ups', 'Inline kiosks', 'Cart programs', 'Concept testing'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    gold: false,
  },
]

const advantages = [
  { title: 'Tax-Free Shopping', desc: 'No tax on clothing or shoes in Minnesota — a built-in draw for value-conscious and luxury shoppers alike.' },
  { title: '100+ MN-Exclusive Stores', desc: 'Nearly 100 brands exist only at MOA in Minnesota, making it the destination for shopping tourism.' },
  { title: 'Captive Dwell Time', desc: 'Average visit duration far exceeds a standard mall. Entertainment keeps shoppers on-property longer.' },
  { title: 'International Traffic', desc: '10% international visitors spending 2.5× more per day — a built-in luxury tier audience.' },
]

export default function LeasingModule() {
  return (
    <ModuleShell
      title="Leasing Paths"
      subtitle="From 500 sq ft kiosks to 20,000+ sq ft flagships — find your perfect position."
      heroImage="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=80"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 2rem 80px' }}>

        {/* Key metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '72px' }}>
          {[
            { v: '$1B+', l: 'Combined Annual Tenant Sales' },
            { v: '2.5M', l: 'Sq Ft Leasable Area' },
            { v: '40M', l: 'Annual Visitors' },
          ].map((s, i) => (
            <div key={s.l} style={{
              padding: '36px 20px', textAlign: 'center', background: '#0A0E1A',
              borderRight: i < 2 ? '1px solid rgba(201,168,76,0.08)' : 'none',
            }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#C9A84C', fontWeight: 300, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Leasing paths */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '32px' }}>
          Leasing Options
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '72px' }}>
          {paths.map((p) => (
            <div
              key={p.type}
              style={{
                display: 'grid', gridTemplateColumns: '200px 1fr',
                background: p.gold ? 'rgba(201,168,76,0.05)' : '#111827',
                border: p.gold ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(201,168,76,0.08)',
                overflow: 'hidden', transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = p.gold ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.08)')}
            >
              <div style={{ position: 'relative', minHeight: '160px' }}>
                <img src={p.image} alt={p.type} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,26,0.45)' }} />
              </div>
              <div style={{ padding: '28px 32px' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 300, color: p.gold ? '#C9A84C' : '#F8F6F2', marginBottom: '10px' }}>{p.type}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.55)', lineHeight: 1.7, marginBottom: '16px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {p.examples.map((ex) => (
                    <span key={ex} style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '10px',
                      padding: '4px 10px', letterSpacing: '0.1em',
                      border: '1px solid rgba(248,246,242,0.12)',
                      color: 'rgba(248,246,242,0.45)',
                    }}>{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOA Retail Advantage */}
        <div style={{ padding: '48px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.2)', marginBottom: '72px' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', textAlign: 'center', marginBottom: '36px' }}>The MOA Retail Advantage</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
            {advantages.map((a) => (
              <div key={a.title} style={{ display: 'flex', gap: '14px' }}>
                <span style={{ color: '#C9A84C', fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>—</span>
                <div>
                  <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', color: '#F8F6F2', fontWeight: 400, marginBottom: '6px' }}>{a.title}</h4>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.5)', lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.4)', marginBottom: '28px' }}>Ready to explore a lease?</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`mailto:${contacts.leasing.email}`} style={{
              display: 'inline-block', padding: '16px 40px',
              background: '#C9A84C', color: '#0A0E1A',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', transition: 'background 0.2s',
            }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#E4C97A')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#C9A84C')}
            >
              Send Leasing Inquiry
            </a>
            <a href={`tel:${contacts.leasing.phone}`} style={{
              display: 'inline-block', padding: '16px 40px',
              background: 'transparent', color: '#C9A84C',
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase',
              textDecoration: 'none', border: '1px solid #C9A84C', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = '#C9A84C'; el.style.color = '#0A0E1A' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'transparent'; el.style.color = '#C9A84C' }}
            >
              Call {contacts.leasing.phone}
            </a>
          </div>
        </div>

      </div>
    </ModuleShell>
  )
}
