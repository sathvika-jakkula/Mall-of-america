import { ModuleShell } from '../_shared/ModuleShell'
import { Button } from '../../components/ui/Button'
import { contacts } from '../../data/contacts'

const paths = [
  {
    type: 'Luxury Flagship',
    desc: 'Full-line luxury retail alongside Gucci, Coach, Burberry & CHANEL. Tax-free shopping. 40M affluent consumers.',
    examples: ['Designer apparel', 'Luxury jewelry', 'Prestige beauty', 'High-end accessories'],
    color: 'var(--color-moa-gold)',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=80',
  },
  {
    type: 'Standard Retail',
    desc: 'Join 520+ specialty stores serving the largest single retail destination in North America.',
    examples: ['Fashion & apparel', 'Electronics & tech', 'Home & lifestyle', 'Sports & outdoor'],
    color: '#9CA3AF',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
  },
  {
    type: 'F&B',
    desc: 'Dining is a primary destination driver at MOA. Join 60+ restaurants serving 40M annual visitors.',
    examples: ['Full-service dining', 'Quick service', 'Food court', 'Specialty concepts'],
    color: '#9CA3AF',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
  },
  {
    type: 'Pop-Up & Kiosk',
    desc: 'Low commitment, high exposure. Test your brand in front of 40M consumers before committing to a full lease.',
    examples: ['Seasonal pop-ups', 'Inline kiosks', 'Cart programs', 'Concept testing'],
    color: '#9CA3AF',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
  },
]

export default function LeasingModule() {
  return (
    <ModuleShell title="Leasing Paths" id="leasing">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">
        {/* Hero */}
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-light text-[var(--color-moa-cream)] mb-4" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            Find your<br /><em>perfect position.</em>
          </h2>
          <p className="text-[var(--color-moa-gray-light)] max-w-xl mx-auto text-base leading-relaxed">
            From 500 sq ft kiosks to 20,000+ sq ft flagships, MOA offers leasing options across every retail category and commitment level.
          </p>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { v: '$1B+', l: 'Combined Annual Tenant Sales' },
            { v: '2.5M', l: 'Sq Ft Leasable Area' },
            { v: '40M', l: 'Annual Visitors' },
          ].map((s) => (
            <div key={s.l} className="border border-[rgba(201,168,76,0.2)] p-6">
              <div className="text-4xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{s.v}</div>
              <div className="text-xs tracking-wider uppercase text-[var(--color-moa-gray-light)] mt-2">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Leasing paths */}
        <div className="space-y-6">
          <p className="text-[var(--color-moa-gold)] text-xs tracking-[0.35em] uppercase mb-8 text-center">Leasing Paths</p>
          {paths.map((p) => (
            <div key={p.type} className="flex flex-col md:flex-row border border-[rgba(201,168,76,0.15)] overflow-hidden hover:border-[rgba(201,168,76,0.4)] transition-colors duration-300">
              <div className="relative md:w-48 h-40 md:h-auto flex-shrink-0">
                <img src={p.image} alt={p.type} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex-1 p-7">
                <h3 className="text-[var(--color-moa-cream)] text-xl font-light mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif', color: p.type === 'Luxury Flagship' ? 'var(--color-moa-gold)' : undefined }}>
                  {p.type}
                </h3>
                <p className="text-[var(--color-moa-gray-light)] text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.examples.map((ex) => (
                    <span key={ex} className="text-xs px-3 py-1 border border-[rgba(248,246,242,0.1)] text-[var(--color-moa-gray-light)]">{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why MOA for retail */}
        <div className="bg-[rgba(201,168,76,0.04)] border border-[rgba(201,168,76,0.2)] p-10">
          <h3 className="text-[var(--color-moa-cream)] text-2xl font-light mb-6 text-center" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            The MOA Retail Advantage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Tax-Free Shopping', desc: 'No tax on clothing or shoes in Minnesota — a built-in draw for value-conscious and luxury shoppers.' },
              { title: '100+ MN-Exclusive Stores', desc: 'Nearly 100 brands exist only at MOA in Minnesota, making it THE destination for shopping tourism.' },
              { title: 'Captive Dwell Time', desc: 'Average visit duration far exceeds a standard mall. Entertainment keeps shoppers on-property longer.' },
              { title: 'International Traffic', desc: '10% international visitors spending 2.5× more per day — a built-in luxury tier audience.' },
            ].map((p) => (
              <div key={p.title} className="flex gap-4">
                <span className="text-[var(--color-moa-gold)] mt-0.5">—</span>
                <div>
                  <h4 className="text-[var(--color-moa-cream)] text-sm font-medium mb-1">{p.title}</h4>
                  <p className="text-[var(--color-moa-gray-light)] text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[var(--color-moa-gray-light)] text-sm mb-6">Ready to explore a lease?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`mailto:${contacts.leasing.email}`}>
              <Button variant="gold">Send Leasing Inquiry</Button>
            </a>
            <a href={`tel:${contacts.leasing.phone}`}>
              <Button variant="outline">Call {contacts.leasing.phone}</Button>
            </a>
          </div>
        </div>
      </div>
    </ModuleShell>
  )
}
