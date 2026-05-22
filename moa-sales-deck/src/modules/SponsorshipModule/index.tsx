import { ModuleShell } from '../_shared/ModuleShell'
import { contacts } from '../../data/contacts'

const tiers = [
  {
    level: 'Premier',
    name: 'Presenting Partner',
    highlight: true,
    features: ['Exclusive category rights', 'Premium digital + static signage', 'Dedicated activation space', 'Co-branded events programming', 'Direct audience targeting via MOA media'],
  },
  {
    level: 'Strategic',
    name: 'Associate Partner',
    highlight: false,
    features: ['Category sponsorship', 'Digital signage rotation', 'Event activation rights', 'Co-marketing opportunities'],
  },
  {
    level: 'Activation',
    name: 'Event Partner',
    highlight: false,
    features: ['Single or multi-event activation', 'Sampling & demo rights', 'Social media integration', 'Brand visibility to event audiences'],
  },
]

const activations = [
  { title: 'Experiential Pop-Ups', desc: 'Temporary branded spaces in high-traffic corridors and atriums.' },
  { title: 'Product Sampling', desc: 'Intercept 40M annual visitors with hands-on product trials.' },
  { title: 'Live Competitions', desc: 'Esports, talent competitions, and branded challenges.' },
  { title: 'Signage & Digital Media', desc: 'Premium placements across 5.6M sq ft of property.' },
]

export default function SponsorshipModule() {
  return (
    <ModuleShell
      title="Sponsorship &amp; Partnerships"
      subtitle="The highest-ROI brand partnership in North American retail."
      heroImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80"
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 2rem 80px' }}>

        {/* Audience stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '72px' }}>
          {[
            { v: '40M', l: 'Annual Visitors' },
            { v: '$162', l: 'Avg Spend Per Visit' },
            { v: '78%', l: 'Affluent Shoppers (HHI $100k+)' },
            { v: '2.5×', l: 'International Spend Multiplier' },
          ].map((s) => (
            <div key={s.l} style={{ padding: '36px 20px', textAlign: 'center', background: '#0A0E1A' }}>
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#C9A84C', fontWeight: 300, marginBottom: '8px' }}>{s.v}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.4)' }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Partnership tiers */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '32px' }}>
          Partnership Tiers
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '72px' }}>
          {tiers.map((t) => (
            <div
              key={t.name}
              style={{
                padding: '36px 32px',
                background: t.highlight ? 'rgba(201,168,76,0.07)' : '#111827',
                border: t.highlight ? '1px solid #C9A84C' : '1px solid rgba(201,168,76,0.15)',
                display: 'flex', flexDirection: 'column', gap: '0',
              }}
            >
              {t.highlight && (
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C9A84C', background: 'rgba(201,168,76,0.12)', padding: '5px 12px', alignSelf: 'flex-start', marginBottom: '20px' }}>
                  Recommended
                </div>
              )}
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)', marginBottom: '8px' }}>{t.level}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', color: '#F8F6F2', fontWeight: 300, marginBottom: '28px' }}>{t.name}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {t.features.map((f) => (
                  <li key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>—</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.6)', lineHeight: 1.6 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Activations */}
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '32px' }}>
          Activation Possibilities
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(201,168,76,0.12)', marginBottom: '72px' }}>
          {activations.map((a) => (
            <div key={a.title} style={{ padding: '28px 24px', background: '#0A0E1A', transition: 'background 0.25s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#111827')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A0E1A')}
            >
              <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '16px', color: '#F8F6F2', fontWeight: 300, marginBottom: '10px' }}>{a.title}</h4>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(248,246,242,0.5)', lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', color: '#F8F6F2', fontWeight: 300, marginBottom: '8px' }}>
            {contacts.partnerships.name}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#C9A84C', letterSpacing: '0.1em', marginBottom: '28px' }}>
            {contacts.partnerships.title} · {contacts.partnerships.phone}
          </p>
          <a
            href={`mailto:${contacts.partnerships.email}`}
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
            Start a Partnership Conversation
          </a>
        </div>

      </div>
    </ModuleShell>
  )
}
