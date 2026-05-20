import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'
import { visitorOrigin } from '../../data/stats'
import SectionWrapper from '../../components/layout/SectionWrapper'

const stats = [
  { number: 40, suffix: 'M', label: 'Annual Visitors', detail: 'More than most US cities' },
  { number: 162, prefix: '$', suffix: '', label: 'Avg Spend Per Visit', detail: 'International guests spend 2.5×' },
  { number: 25, suffix: 'M', label: 'Out-of-State Guests', detail: '62% of all visitors' },
  { number: 30, suffix: 'M+', label: 'Within One Day\'s Drive', detail: 'Unmatched catchment area' },
]

const access = [
  { value: '3 mi', fact: 'from MSP International Airport', icon: '✈' },
  { value: '12 min', fact: 'by light rail from airport terminals', icon: '🚆' },
  { value: '13,000', fact: 'on-site parking spaces', icon: '🅿' },
]

export function WhyMOASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const statsRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', once: true } }
      )

      // Stats stagger entrance
      if (statsRowRef.current) {
        gsap.fromTo(
          statsRowRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: statsRowRef.current, start: 'top 80%', once: true } }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="why-moa" className="min-h-screen flex flex-col justify-center">
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }}
      />

      <div ref={sectionRef} className="relative z-10 max-w-6xl mx-auto w-full">

        {/* Eyebrow */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: '#C9A84C',
          marginBottom: '1.5rem',
        }}>
          The Opportunity
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1.12,
            maxWidth: '760px',
            marginBottom: '4.5rem',
            opacity: 0,
          }}
        >
          North America's most visited destination.{' '}
          <em style={{ color: '#C9A84C' }}>The numbers speak for themselves.</em>
        </h2>

        {/* Stat row */}
        <div
          ref={statsRowRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid rgba(201,168,76,0.2)',
            marginBottom: '5rem',
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <StatBlock key={i} {...s} index={i} />
          ))}
        </div>

        {/* Two-column: access facts + visitor origin */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left: geographic access */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '2rem',
            }}>
              Access & Location
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {access.map((a, i) => (
                <AccessFact key={i} {...a} index={i} />
              ))}
            </div>

            {/* International callout */}
            <div style={{
              marginTop: '2.5rem',
              padding: '1.5rem',
              border: '1px solid rgba(201,168,76,0.25)',
              background: 'rgba(201,168,76,0.04)',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '2.2rem',
                fontWeight: 300,
                color: '#C9A84C',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                2.5×
              </div>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                lineHeight: 1.6,
                color: 'rgba(248,246,242,0.55)',
              }}>
                International visitors spend 2.5× more per day than local guests — making MOA the #1 international shopping destination in the US Midwest.
              </p>
            </div>
          </div>

          {/* Right: visitor origin */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '2rem',
            }}>
              Visitor Origin
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
              {visitorOrigin.map((item, i) => (
                <VisitorBar key={i} {...item} index={i} />
              ))}
            </div>

            {/* Dwell time note */}
            <div style={{
              marginTop: '2.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(201,168,76,0.12)',
              display: 'flex',
              gap: '2rem',
            }}>
              <div>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#F8F6F2',
                  lineHeight: 1,
                }}>2.5 hrs</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)', marginTop: '4px' }}>
                  Avg dwell time
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#F8F6F2',
                  lineHeight: 1,
                }}>4 levels</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)', marginTop: '4px' }}>
                  5.6M sq ft
                </div>
              </div>
              <div>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#F8F6F2',
                  lineHeight: 1,
                }}>520+</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)', marginTop: '4px' }}>
                  Stores
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ── Animated stat block ── */
function StatBlock({ number, prefix = '', suffix, label, detail, index }: {
  number: number; prefix?: string; suffix: string; label: string; detail: string; index: number
}) {
  const numRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!numRef.current) return
    const ctx = gsap.context(() => {
      const obj = { val: 0 }
      gsap.to(obj, {
        val: number,
        duration: 1.8,
        ease: 'power2.out',
        delay: index * 0.12,
        scrollTrigger: { trigger: numRef.current, start: 'top 85%', once: true },
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
          }
        },
      })
    })
    return () => ctx.revert()
  }, [number, prefix, suffix, index])

  return (
    <div style={{
      padding: '2rem 0',
      paddingRight: '2rem',
      borderRight: index < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
      paddingLeft: index > 0 ? '2rem' : '0',
    }}>
      <div
        ref={numRef}
        style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(2.8rem, 4.5vw, 4rem)',
          fontWeight: 300,
          color: '#C9A84C',
          lineHeight: 1,
          marginBottom: '0.6rem',
        }}
      >
        {prefix}0{suffix}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#F8F6F2',
        marginBottom: '0.4rem',
        opacity: 0.8,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '11px',
        color: 'rgba(248,246,242,0.35)',
        lineHeight: 1.5,
      }}>
        {detail}
      </div>
    </div>
  )
}

/* ── Geographic access fact ── */
function AccessFact({ value, fact, icon, index }: { value: string; fact: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', delay: index * 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [index])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        padding: '1.25rem 0',
        borderBottom: '1px solid rgba(201,168,76,0.1)',
        opacity: 0,
      }}
    >
      <span style={{ fontSize: '1.1rem', flexShrink: 0, opacity: 0.7 }}>{icon}</span>
      <div>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: '1.4rem',
          fontWeight: 300,
          color: '#F8F6F2',
          marginRight: '0.5rem',
        }}>
          {value}
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '12px',
          color: 'rgba(248,246,242,0.45)',
        }}>
          {fact}
        </span>
      </div>
    </div>
  )
}

/* ── Visitor origin bar ── */
function VisitorBar({ label, percent, color, index }: { label: string; percent: number; color: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(barRef.current,
        { width: '0%' },
        { width: `${percent}%`, duration: 1.3, ease: 'power2.out', delay: index * 0.1,
          scrollTrigger: { trigger: barRef.current, start: 'top 88%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [percent, index])

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.75)', letterSpacing: '0.05em' }}>
          {label}
        </span>
        <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: '14px', color, fontWeight: 300 }}>
          {percent}%
        </span>
      </div>
      <div style={{ height: '2px', background: 'rgba(255,255,255,0.07)', width: '100%', borderRadius: '1px', overflow: 'hidden' }}>
        <div ref={barRef} style={{ height: '100%', background: color, width: 0, borderRadius: '1px' }} />
      </div>
    </div>
  )
}
