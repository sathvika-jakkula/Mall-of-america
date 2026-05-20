import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'
import SectionWrapper from '../../components/layout/SectionWrapper'

const restaurants = [
  { name: 'Rainforest Cafe', type: 'Adventure Dining', desc: 'Jungle surroundings, animatronic wildlife, and theatrical dining for every generation.' },
  { name: 'Benihana', type: 'Hibachi · Japanese', desc: 'Teppanyaki chefs perform tableside — high-energy, shareable, unforgettable.' },
  { name: 'Twin City Grill', type: 'Minnesota Classic', desc: 'Wild rice soup, walleye, and craft beer. Genuine Minnesota on a plate.' },
]

export function DiningSection() {
  const heroRef     = useRef<HTMLDivElement>(null)
  const headRef     = useRef<HTMLDivElement>(null)
  const mosaicRef   = useRef<HTMLDivElement>(null)
  const contentRef  = useRef<HTMLDivElement>(null)
  const restsRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero headline
      gsap.fromTo(headRef.current,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%', once: true } }
      )

      // Mosaic images stagger
      gsap.fromTo(
        mosaicRef.current?.querySelectorAll('.mosaic-img') ?? [],
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out', stagger: 0.12,
          scrollTrigger: { trigger: mosaicRef.current, start: 'top 78%', once: true } }
      )

      // Right content slides in
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.85, ease: 'power2.out',
          scrollTrigger: { trigger: contentRef.current, start: 'top 78%', once: true } }
      )

      // Restaurants stagger up
      gsap.fromTo(
        restsRef.current?.querySelectorAll('.rest-item') ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: restsRef.current, start: 'top 82%', once: true } }
      )

      // Subtle Ken Burns on hero image
      gsap.to(heroRef.current?.querySelector('.hero-img') ?? null, {
        scale: 1.06, ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top', end: 'bottom top', scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="dining" className="!p-0 !overflow-visible">

      {/* ── HERO BANNER ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          height: '65vh',
          minHeight: '480px',
          overflow: 'hidden',
          background: '#07090F',
        }}
      >
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90"
          alt="Fine dining at Mall of America"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            transformOrigin: 'center center',
          }}
        />
        {/* Dark gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,6,12,0.92) 0%, rgba(5,6,12,0.4) 45%, rgba(5,6,12,0.15) 100%)',
        }} />

        {/* Headline over hero */}
        <div
          ref={headRef}
          style={{
            position: 'absolute', bottom: '3.5rem', left: 0, right: 0,
            textAlign: 'center', padding: '0 2rem',
            opacity: 0,
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1rem',
          }}>
            Dining &amp; Lifestyle
          </p>
          <h2 style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)',
            fontWeight: 300, color: '#F8F6F2', lineHeight: 1.1,
          }}>
            60+ Restaurants.{' '}
            <em style={{ color: '#C9A84C' }}>Zero compromises.</em>
          </h2>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'rgba(201,168,76,0.06)',
        borderTop: '1px solid rgba(201,168,76,0.15)',
        borderBottom: '1px solid rgba(201,168,76,0.15)',
      }}>
        {[
          { v: '60+', l: 'Dining Venues' },
          { v: '40M', l: 'Visitors Annually' },
          { v: '2.5 hr', l: 'Avg Dwell Time' },
          { v: 'Every', l: 'Cuisine Represented' },
        ].map((s, i) => (
          <div key={s.l} style={{
            textAlign: 'center',
            padding: '1.75rem 1rem',
            borderRight: i < 3 ? '1px solid rgba(201,168,76,0.1)' : 'none',
          }}>
            <div style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
              fontWeight: 300, color: '#C9A84C', lineHeight: 1,
            }}>
              {s.v}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '9px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(248,246,242,0.35)', marginTop: '6px',
            }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      {/* ── MOSAIC + CONTENT ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '580px',
        background: '#07090F',
      }}>

        {/* Left: image mosaic */}
        <div
          ref={mosaicRef}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '3px',
          }}
        >
          {/* Large top-left */}
          <div
            className="mosaic-img"
            style={{ gridRow: '1 / 3', gridColumn: '1 / 2', overflow: 'hidden', opacity: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=85"
              alt="Japanese cuisine"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
            />
          </div>
          {/* Top right */}
          <div
            className="mosaic-img"
            style={{ gridRow: '1 / 2', gridColumn: '2 / 3', overflow: 'hidden', opacity: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=700&q=85"
              alt="Cocktail bar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
            />
          </div>
          {/* Bottom right */}
          <div
            className="mosaic-img"
            style={{ gridRow: '2 / 3', gridColumn: '2 / 3', overflow: 'hidden', opacity: 0 }}
          >
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=85"
              alt="Food plating"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
            />
          </div>
        </div>

        {/* Right: editorial content */}
        <div
          ref={contentRef}
          style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: '4rem 5vw',
            borderLeft: '1px solid rgba(201,168,76,0.08)',
            opacity: 0,
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '9px',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1.5rem',
          }}>
            The Experience
          </p>

          <p style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
            fontWeight: 300, fontStyle: 'italic',
            color: '#F8F6F2', lineHeight: 1.45,
            marginBottom: '1.75rem',
          }}>
            "A full day at MOA is a full day of dining — breakfast, lunch, dinner, and everything between."
          </p>

          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            lineHeight: 1.8, color: 'rgba(248,246,242,0.5)',
            marginBottom: '2.5rem',
          }}>
            From quick-serve food halls to white-tablecloth experiences, MOA's 60+ restaurants generate significant captive revenue — and keep guests on-property longer than any competitor in the market.
          </p>

          {/* Category tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}>
            {['Fine Dining', 'Casual', 'Fast-Casual', 'Bar & Lounge', 'International', 'Food Hall'].map((c) => (
              <span key={c} style={{
                border: '1px solid rgba(201,168,76,0.25)', padding: '5px 12px',
                fontFamily: 'Inter, sans-serif', fontSize: '10px',
                letterSpacing: '0.12em', color: 'rgba(248,246,242,0.5)',
              }}>
                {c}
              </span>
            ))}
          </div>

          {/* Gold rule */}
          <div style={{ height: '1px', background: 'rgba(201,168,76,0.15)', marginBottom: '2rem' }} />

          {/* Mini restaurant list */}
          <div ref={restsRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {restaurants.map((r) => (
              <div
                key={r.name}
                className="rest-item"
                style={{
                  display: 'flex', alignItems: 'baseline', gap: '1rem',
                  opacity: 0,
                }}
              >
                <span style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '1.05rem', fontWeight: 300, color: '#F8F6F2',
                  whiteSpace: 'nowrap',
                }}>
                  {r.name}
                </span>
                <span style={{
                  flex: 1, height: '1px',
                  background: 'rgba(201,168,76,0.15)',
                  alignSelf: 'center',
                }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '0.1em', color: '#C9A84C',
                  whiteSpace: 'nowrap',
                }}>
                  {r.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESTAURANT DETAIL CARDS ── */}
      <div style={{
        background: '#0A0E1A',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '4rem 4vw',
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px', background: 'rgba(201,168,76,0.1)',
        }}>
          {restaurants.map((r, i) => (
            <div key={r.name} style={{
              background: '#0A0E1A',
              padding: '2.25rem 2rem',
              position: 'relative',
            }}>
              <span style={{
                position: 'absolute', top: '1.5rem', right: '1.5rem',
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '3rem', fontWeight: 300,
                color: 'rgba(201,168,76,0.06)', lineHeight: 1,
                userSelect: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '0.6rem',
              }}>
                {r.type}
              </p>
              <h4 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '1.4rem', fontWeight: 300,
                color: '#F8F6F2', lineHeight: 1.2, marginBottom: '0.9rem',
              }}>
                {r.name}
              </h4>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '12px',
                lineHeight: 1.7, color: 'rgba(248,246,242,0.4)',
              }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </SectionWrapper>
  )
}
