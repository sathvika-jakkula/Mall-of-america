import { ModuleShell } from '../_shared/ModuleShell'
import { Button } from '../../components/ui/Button'
import { contacts } from '../../data/contacts'

export default function EventsModule() {
  return (
    <ModuleShell title="Events & Activation" id="events">
      <div className="max-w-5xl mx-auto px-8 py-16 space-y-20">
        {/* Hero */}
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-light text-[var(--color-moa-cream)] mb-4" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
            400+ Events.<br /><em>Every Year.</em>
          </h2>
          <p className="text-[var(--color-moa-gray-light)] max-w-xl mx-auto text-base leading-relaxed">
            From celebrity appearances to concert series, product launches to conventions — MOA is North America's most activated destination.
          </p>
        </div>

        {/* Event types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { type: 'Concerts & Live Music', desc: 'Multiple stages and venues throughout the property accommodate intimate performances to large-scale productions.', icon: '🎵' },
            { type: 'Brand Activations', desc: 'Pop-ups, experiential installations, product sampling, and live competitions in front of 40M captive consumers.', icon: '⚡' },
            { type: 'Corporate Events', desc: 'Executive Center + Parkview venues. Radisson Blu & JW Marriott for conferences, dinners, and offsites.', icon: '🏢' },
            { type: 'Celebrity Appearances', desc: 'Proven track record drawing A-list celebrities for signings, launches, and special appearances.', icon: '⭐' },
            { type: 'Product Launches', desc: 'Command national attention. Combine physical activation with 40M annual footfall and media amplification.', icon: '🚀' },
            { type: 'Community & Holiday', desc: 'MOA programs 365 days of events across cultural celebrations, holidays, sports, and community milestones.', icon: '🎄' },
          ].map((e) => (
            <div key={e.type} className="border border-[rgba(201,168,76,0.15)] p-6 hover:border-[var(--color-moa-gold)] transition-colors duration-300">
              <div className="text-2xl mb-3">{e.icon}</div>
              <h3 className="text-[var(--color-moa-cream)] text-lg font-light mb-2" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>{e.type}</h3>
              <p className="text-[var(--color-moa-gray-light)] text-sm leading-relaxed">{e.desc}</p>
            </div>
          ))}
        </div>

        {/* Super Bowl highlight */}
        <div className="bg-[rgba(201,168,76,0.05)] border border-[rgba(201,168,76,0.2)] p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>1.5M</div>
              <div className="text-xs tracking-widest uppercase text-[var(--color-moa-cream)] mt-1">Visitors</div>
            </div>
            <div>
              <div className="text-5xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>10</div>
              <div className="text-xs tracking-widest uppercase text-[var(--color-moa-cream)] mt-1">Days</div>
            </div>
            <div>
              <div className="text-3xl font-light text-[var(--color-moa-gold)]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Super Bowl LII</div>
              <div className="text-xs tracking-widest uppercase text-[var(--color-moa-cream)] mt-1">Minneapolis 2018</div>
            </div>
          </div>
          <p className="text-center text-[var(--color-moa-gray-light)] text-sm mt-6 max-w-lg mx-auto">
            When Super Bowl came to Minneapolis, MOA was the official destination. Brands activated at scale. Attendance shattered records. This is what you get access to.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-[var(--color-moa-gray-light)] text-sm mb-6">Ready to activate at MOA?</p>
          <a href={`mailto:${contacts.events.email}`}>
            <Button variant="gold">Book an Event Consultation</Button>
          </a>
        </div>
      </div>
    </ModuleShell>
  )
}
