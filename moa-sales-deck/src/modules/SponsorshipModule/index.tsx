import { ModuleShell } from '../_shared/ModuleShell'
import { Button } from '../../components/ui/Button'
import { contacts } from '../../data/contacts'

const tiers = [
  {
    name: 'Presenting Partner',
    level: 'Premier',
    features: ['Exclusive category rights', 'Premium digital + static signage throughout property', 'Dedicated activation space', 'Co-branded events programming', 'Direct audience targeting via MOA media'],
    highlight: true,
  },
  {
    name: 'Associate Partner',
    level: 'Strategic',
    features: ['Category sponsorship', 'Digital signage rotation', 'Event activation rights', 'Co-marketing opportunities'],
    highlight: false,
  },
  {
    name: 'Event Partner',
    level: 'Activation',
    features: ['Single or multi-event activation', 'Sampling & demonstration rights', 'Social media integration', 'Brand visibility to event audiences'],
    highlight: false,
  },
]

export default function SponsorshipModule() {
  return (
    <ModuleShell title="Sponsorship & Partnerships" id="sponsorship">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">
        {/* Hero */}
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-light text-[var(--color-moa-cream)] mb-4" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            Partner with<br /><em>40 Million Consumers.</em>
          </h2>
          <p className="text-[var(--color-moa-gray-light)] max-w-xl mx-auto text-base leading-relaxed">
            MOA's unique combination of scale, dwell time, and demographic diversity makes it the highest-ROI brand partnership in North American retail.
          </p>
        </div>

        {/* Audience data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { v: '40M', l: 'Annual Visitors' },
            { v: '$162', l: 'Avg Spend Per Visit' },
            { v: '78%', l: 'Affluent Shoppers (HHI $100k+)' },
            { v: '2.5×', l: 'International Spend Multiplier' },
          ].map((s) => (
            <div key={s.l} className="text-center border border-[rgba(201,168,76,0.15)] p-5">
              <div className="text-3xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{s.v}</div>
              <div className="text-xs tracking-wider uppercase text-[var(--color-moa-gray-light)] mt-2">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Partnership tiers */}
        <div>
          <p className="text-[var(--color-moa-gold)] text-xs tracking-[0.35em] uppercase mb-8 text-center">Partnership Tiers</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className="border p-8 flex flex-col"
                style={{
                  borderColor: t.highlight ? 'var(--color-moa-gold)' : 'rgba(201,168,76,0.2)',
                  background: t.highlight ? 'rgba(201,168,76,0.05)' : 'transparent',
                }}
              >
                <div className="text-[var(--color-moa-gold)] text-xs tracking-[0.3em] uppercase mb-2">{t.level}</div>
                <h3 className="text-[var(--color-moa-cream)] text-xl font-light mb-6" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{t.name}</h3>
                <ul className="space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[var(--color-moa-gray-light)]">
                      <span className="text-[var(--color-moa-gold)] mt-0.5 text-xs">—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Activation examples */}
        <div>
          <p className="text-[var(--color-moa-gold)] text-xs tracking-[0.35em] uppercase mb-8 text-center">Activation Possibilities</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Experiential Pop-Ups', desc: 'Temporary branded retail or experience spaces in high-traffic corridors and atriums.' },
              { title: 'Product Sampling', desc: 'Intercept 40M annual visitors with hands-on product trials in targeted zones.' },
              { title: 'Live Competitions & Gaming', desc: 'Esports, talent competitions, and branded challenges with real-time crowd engagement.' },
              { title: 'Signage & Digital Media', desc: 'Premium static and digital placements throughout 5.6M sq ft of property.' },
            ].map((a) => (
              <div key={a.title} className="flex gap-4 p-5 border border-[rgba(201,168,76,0.1)] hover:border-[rgba(201,168,76,0.3)] transition-colors">
                <div>
                  <h4 className="text-[var(--color-moa-cream)] text-sm font-light mb-1">{a.title}</h4>
                  <p className="text-[var(--color-moa-gray-light)] text-sm leading-relaxed">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[var(--color-moa-gray-light)] text-sm mb-2">Speak with our VP of Partnership Sales</p>
          <p className="text-[var(--color-moa-gold)] text-sm mb-6">{contacts.partnerships.name} · {contacts.partnerships.phone}</p>
          <a href={`mailto:${contacts.partnerships.email}`}>
            <Button variant="gold">Start a Partnership Conversation</Button>
          </a>
        </div>
      </div>
    </ModuleShell>
  )
}
