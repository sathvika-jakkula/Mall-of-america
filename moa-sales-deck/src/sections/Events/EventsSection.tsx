import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'
import { useStore } from '../../store'
import SectionWrapper from '../../components/layout/SectionWrapper'

const eventTypes = [
  'Concerts & Live Music',
  'Brand Activations',
  'Corporate Events',
  'Celebrity Appearances',
  'Product Launches',
  'Community & Holiday',
]

const modules = [
  { label: 'Events & Activation', module: 'events' as const, desc: 'Highlights · Booking' },
  { label: 'Sponsorship', module: 'sponsorship' as const, desc: 'Tiers · ROI data' },
  { label: 'Retail Leasing', module: 'leasing' as const, desc: 'Luxury · Pop-Up' },
  { label: 'Venue Spaces', module: 'venue' as const, desc: 'Capacity · AV specs' },
]

export function EventsSection() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const setModule  = useStore((s) => s.setActiveModule)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.h-item') ?? [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: heroRef.current, start: 'top 75%', once: true } }
      )

      // 400+ count-up
      const obj = { val: 0 }
      gsap.to(obj, {
        val: 400, duration: 1.8, ease: 'power2.out',
        scrollTrigger: { trigger: counterRef.current, start: 'top 80%', once: true },
        onUpdate() {
          if (counterRef.current) counterRef.current.textContent = `${Math.round(obj.val)}+`
        },
      })

      // Super Bowl count-up
      const sb = { val: 0 }
      gsap.to(sb, {
        val: 1.5, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
        onUpdate() {
          const el = document.querySelector('.sb-num')
          if (el) el.textContent = `${sb.val.toFixed(1)}M`
        },
      })

      // Content section stagger
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.reveal') ?? [],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true } }
      )

      // Ken Burns
      gsap.to('.events-bg', {
        scale: 1.07, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="events" className="!p-0 !overflow-visible">

      {/* ── HERO ── */}
      <div
        ref={heroRef}
        style={{ position: 'relative', height: '88vh', minHeight: '580px', overflow: 'hidden' }}
      >
        <img
          className="events-bg"
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=90"
          alt="MOA events"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            transformOrigin: 'center center',
          }}
        />
        {/* Vignette — dark edges, clear center */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,6,12,0.6) 0%, rgba(5,6,12,0.1) 30%, rgba(5,6,12,0.1) 55%, rgba(5,6,12,0.85) 100%)',
        }} />

        {/* Eyebrow */}
        <p style={{
          position: 'absolute', top: '2rem', left: '4vw',
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C',
        }}>
          Events &amp; Platform
        </p>

        {/* Centered big counter */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div
            ref={counterRef}
            className="h-item"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(6rem, 20vw, 16rem)',
              fontWeight: 300, color: '#C9A84C',
              lineHeight: 0.85, opacity: 0,
            }}
          >
            0+
          </div>
          <p className="h-item" style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.9rem)',
            letterSpacing: '0.45em', textTransform: 'uppercase',
            color: '#F8F6F2', marginTop: '1.5rem', opacity: 0,
          }}>
            Events Every Year
          </p>
        </div>

        {/* Bottom left: headline */}
        <div style={{ position: 'absolute', bottom: '3rem', left: '4vw', right: '4vw' }}>
          <h2 className="h-item" style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
            fontWeight: 300, color: '#F8F6F2', lineHeight: 1.2,
            maxWidth: '560px', opacity: 0,
          }}>
            A global platform,{' '}
            <em style={{ color: '#C9A84C' }}>not just a building.</em>
          </h2>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div ref={contentRef} style={{ background: '#0A0E1A', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: '1050px', margin: '0 auto' }}>

          {/* Two columns */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '5rem', alignItems: 'start', marginBottom: '4rem',
          }}>

            {/* Left: stats + event types */}
            <div>
              {/* Stats */}
              <div className="reveal" style={{
                display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
                borderBottom: '1px solid rgba(201,168,76,0.15)',
                paddingBottom: '2.5rem', marginBottom: '2.5rem', opacity: 0,
              }}>
                {[
                  { v: '400+', l: 'Events / Year' },
                  { v: '365', l: 'Days Active' },
                  { v: '40M', l: 'Audience' },
                ].map((s, i) => (
                  <div key={s.l} style={{
                    paddingRight: i < 2 ? '1.5rem' : 0,
                    borderRight: i < 2 ? '1px solid rgba(201,168,76,0.12)' : 'none',
                    paddingLeft: i > 0 ? '1.5rem' : 0,
                  }}>
                    <div style={{
                      fontFamily: '"Playfair Display", Georgia, serif',
                      fontSize: 'clamp(1.8rem, 2.5vw, 2.4rem)',
                      fontWeight: 300, color: '#C9A84C', lineHeight: 1,
                    }}>{s.v}</div>
                    <div style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '9px',
                      letterSpacing: '0.18em', textTransform: 'uppercase',
                      color: 'rgba(248,246,242,0.35)', marginTop: '5px',
                    }}>{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Event types */}
              <p className="reveal" style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '1.25rem', opacity: 0,
              }}>
                What We Host
              </p>
              <ul className="reveal" style={{
                margin: 0, padding: 0, listStyle: 'none',
                display: 'flex', flexDirection: 'column', opacity: 0,
              }}>
                {eventTypes.map((e, i) => (
                  <li key={e} style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '1.05rem', fontWeight: 300,
                    color: 'rgba(248,246,242,0.7)',
                    padding: '0.8rem 0',
                    borderBottom: i < eventTypes.length - 1
                      ? '1px solid rgba(201,168,76,0.09)' : 'none',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <span style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      background: '#C9A84C', flexShrink: 0,
                    }} />
                    {e}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Super Bowl callout */}
            <div className="reveal" style={{ opacity: 0 }}>
              <div style={{
                border: '1px solid rgba(201,168,76,0.25)',
                background: 'rgba(201,168,76,0.03)',
                padding: '3rem',
              }}>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '9px',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: '#C9A84C', marginBottom: '2rem',
                }}>
                  Case Study · Super Bowl LII · Minneapolis 2018
                </p>

                <div className="sb-num" style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(3.5rem, 7vw, 5.5rem)',
                  fontWeight: 300, color: '#F8F6F2', lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>
                  0M
                </div>
                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '11px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#C9A84C', marginBottom: '2rem',
                }}>
                  Visitors · 10 Days
                </p>

                <div style={{
                  height: '1px', background: 'rgba(201,168,76,0.18)',
                  marginBottom: '2rem',
                }} />

                <p style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '13px',
                  lineHeight: 1.8, color: 'rgba(248,246,242,0.45)',
                  marginBottom: '2rem',
                }}>
                  MOA was the Official Destination of Super Bowl LII. Brands activated at scale. National media descended. Attendance shattered every record.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.15)' }}>
                  {[
                    { v: '10', l: 'Days of Activation' },
                    { v: '#1', l: 'Official Destination' },
                  ].map((s) => (
                    <div key={s.l} style={{
                      background: 'rgba(201,168,76,0.03)',
                      padding: '1.25rem 1rem', textAlign: 'center',
                    }}>
                      <div style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: '1.8rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1,
                      }}>{s.v}</div>
                      <div style={{
                        fontFamily: 'Inter, sans-serif', fontSize: '9px',
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        color: 'rgba(248,246,242,0.35)', marginTop: '5px',
                      }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Platform CTAs */}
          <div className="reveal" style={{ opacity: 0 }}>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '9px',
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '1.25rem',
            }}>
              Explore the Platform
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px', background: 'rgba(201,168,76,0.12)',
            }}>
              {modules.map((m) => (
                <button
                  key={m.module}
                  onClick={() => setModule(m.module)}
                  style={{
                    background: '#0A0E1A', padding: '1.75rem',
                    textAlign: 'left', border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.06)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = '#0A0E1A')}
                >
                  <div style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '1rem', fontWeight: 300, color: '#F8F6F2',
                    marginBottom: '0.4rem', display: 'flex',
                    justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    {m.label}
                    <span style={{ color: '#C9A84C', fontSize: '0.9rem' }}>→</span>
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '10px',
                    color: 'rgba(248,246,242,0.3)',
                  }}>
                    {m.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

    </SectionWrapper>
  )
}
