import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'
import { brandLogos } from '../../data/brands'
import { retailStats } from '../../data/stats'
import { Button } from '../../components/ui/Button'
import { useStore } from '../../store'
import SectionWrapper from '../../components/layout/SectionWrapper'

const panels = [
  {
    num: '01',
    eyebrow: 'Volume',
    stat: '520+',
    statLabel: 'Specialty Stores',
    body: 'From flagship anchors to hidden gems, MOA houses the largest concentration of retail in North America — all under one roof, across 2.5 million square feet.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1400&q=85',
    tag: '4 Levels · 2.5M sq ft leasable',
  },
  {
    num: '02',
    eyebrow: 'Exclusivity',
    stat: '100+',
    statLabel: 'Minnesota-Only Stores',
    body: 'Nearly 100 brands exist nowhere else in Minnesota. Your brand occupies a category of one — unavailable to every competitor in the state.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=85',
    tag: 'Category exclusivity available',
  },
  {
    num: '03',
    eyebrow: 'Tax Advantage',
    stat: '0%',
    statLabel: 'Tax on Clothing & Shoes',
    body: "Minnesota levies no sales tax on apparel. Shoppers know it, plan around it, and drive hours for it. It's an invisible marketing budget built into the address.",
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=85',
    tag: 'Unique to Minnesota',
  },
]

export function RetailSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const logosRef = useRef<HTMLDivElement>(null)
  const setModule = useStore((s) => s.setActiveModule)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current && trackRef.current) {
        const totalWidth = (panels.length - 1) * 100

        gsap.to(trackRef.current, {
          x: `-${totalWidth}vw`,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: `+=${totalWidth * 10}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        })
      }

      // Logo stagger entrance
      if (logosRef.current) {
        gsap.fromTo(
          logosRef.current.querySelectorAll('.brand-logo'),
          { opacity: 0, y: 12 },
          {
            opacity: 1, y: 0, stagger: 0.03, duration: 0.45, ease: 'power2.out',
            scrollTrigger: { trigger: logosRef.current, start: 'top 80%', once: true },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="retail" className="!p-0 !overflow-visible">

      {/* Opening statement */}
      <div
        style={{
          textAlign: 'center',
          padding: '7rem 2rem 6rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(201,168,76,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px', letterSpacing: '0.35em',
          textTransform: 'uppercase', color: '#C9A84C', marginBottom: '1.5rem',
        }}>
          Retail
        </p>
        <h2
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1,
            marginBottom: '0.75rem',
          }}
        >
          $1 Billion<span style={{ color: '#C9A84C' }}>+</span>
        </h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '14px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(248,246,242,0.45)',
        }}>
          in combined annual tenant sales
        </p>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        style={{ position: 'relative', overflow: 'hidden', height: '100vh' }}
      >
        <div
          ref={trackRef}
          style={{ display: 'flex', height: '100%', width: `${panels.length * 100}vw` }}
        >
          {panels.map((p) => (
            <HPanel key={p.num} {...p} />
          ))}
        </div>

        {/* Panel counter — bottom left */}
        <PanelProgress total={panels.length} trackRef={trackRef} />
      </div>

      {/* Stats bar */}
      <div style={{
        background: 'rgba(201,168,76,0.04)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
        padding: '3.5rem 2rem',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }} className="grid-cols-2 md:grid-cols-4">
          {retailStats.map((s, i) => (
            <div
              key={s.label}
              style={{
                textAlign: 'center',
                paddingRight: i < 3 ? '1rem' : '0',
                borderRight: i < 3 ? '1px solid rgba(201,168,76,0.12)' : 'none',
              }}
            >
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 300, color: '#C9A84C', lineHeight: 1,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '10px',
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'rgba(248,246,242,0.4)', marginTop: '0.5rem',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand wall */}
      <div style={{ padding: '5rem 2rem 4rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Tenants
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.3)' }}>
              A selection of 520+ brands
            </p>
          </div>

          <div ref={logosRef} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3.5rem' }}>
            {brandLogos.map((name) => (
              <div
                key={name}
                className="brand-logo"
                style={{
                  opacity: 0,
                  border: '1px solid rgba(248,246,242,0.1)',
                  padding: '6px 14px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.08em',
                  color: 'rgba(248,246,242,0.5)',
                  cursor: 'default',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(201,168,76,0.5)'
                  el.style.color = '#F8F6F2'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = 'rgba(248,246,242,0.1)'
                  el.style.color = 'rgba(248,246,242,0.5)'
                }}
              >
                {name}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.18)' }} />
            <Button variant="outline" onClick={() => setModule('leasing')}>
              Explore Leasing Paths →
            </Button>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.18)' }} />
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ── Editorial split panel ── */
function HPanel({ num, eyebrow, stat, statLabel, body, image, tag }: typeof panels[0]) {
  return (
    <div
      className="h-panel"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        background: '#0A0E1A',
        overflow: 'hidden',
      }}
    >
      {/* Large ghost number — decorative backdrop */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: '3vw',
          bottom: '-0.1em',
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(14rem, 28vw, 26rem)',
          fontWeight: 300,
          color: 'rgba(201,168,76,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {num}
      </span>

      {/* Left: text content */}
      <div
        style={{
          flex: '0 0 42%',
          padding: '0 4vw 0 8vw',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px',
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '1.5rem',
        }}>
          {eyebrow}
        </p>

        <div style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(4.5rem, 9vw, 8rem)',
          fontWeight: 300,
          color: '#F8F6F2',
          lineHeight: 0.9,
          marginBottom: '0.4rem',
        }}>
          {stat}
        </div>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '13px',
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '2rem',
        }}>
          {statLabel}
        </p>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '14px',
          lineHeight: 1.75, color: 'rgba(248,246,242,0.55)',
          maxWidth: '360px', marginBottom: '2.5rem',
        }}>
          {body}
        </p>

        {/* Tag pill */}
        <span style={{
          display: 'inline-block',
          border: '1px solid rgba(201,168,76,0.3)',
          padding: '5px 14px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'rgba(201,168,76,0.7)',
        }}>
          {tag}
        </span>
      </div>

      {/* Right: editorial image frame */}
      <div
        style={{
          flex: '0 0 50%',
          height: '72%',
          position: 'relative',
          zIndex: 2,
          paddingRight: '6vw',
        }}
      >
        {/* Gold border frame — slightly offset */}
        <div style={{
          position: 'absolute',
          top: '-12px', right: 'calc(6vw + 12px)',
          bottom: '12px', left: '-12px',
          border: '1px solid rgba(201,168,76,0.2)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Image */}
        <div
          style={{
            width: '100%', height: '100%',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <img
            src={image}
            alt={eyebrow}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* subtle bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
            background: 'linear-gradient(to top, rgba(10,14,26,0.5), transparent)',
          }} />
        </div>
      </div>
    </div>
  )
}

/* ── Panel progress indicator ── */
function PanelProgress({ total, trackRef }: { total: number; trackRef: React.RefObject<HTMLDivElement | null> }) {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current || !dotsRef.current) return
    const ctx = gsap.context(() => {
      // Sync dot highlighting as track moves
      gsap.to({}, {
        scrollTrigger: {
          trigger: trackRef.current!.parentElement,
          start: 'top top',
          end: `+=${(total - 1) * 100 * 10}`,
          scrub: true,
          onUpdate(self) {
            const active = Math.round(self.progress * (total - 1))
            dotsRef.current?.querySelectorAll('.pdot').forEach((d, i) => {
              const el = d as HTMLElement
              el.style.background = i === active ? '#C9A84C' : 'rgba(248,246,242,0.2)'
              el.style.transform = i === active ? 'scaleX(2.5)' : 'scaleX(1)'
            })
          },
        },
      })
    })
    return () => ctx.revert()
  }, [total, trackRef])

  return (
    <div
      ref={dotsRef}
      style={{
        position: 'absolute', bottom: '2.5rem', left: '8vw',
        display: 'flex', gap: '6px', zIndex: 10,
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="pdot"
          style={{
            width: '24px', height: '2px',
            background: i === 0 ? '#C9A84C' : 'rgba(248,246,242,0.2)',
            borderRadius: '1px',
            transition: 'transform 0.3s, background 0.3s',
            transform: i === 0 ? 'scaleX(2.5)' : 'scaleX(1)',
            transformOrigin: 'left',
          }}
        />
      ))}
    </div>
  )
}
