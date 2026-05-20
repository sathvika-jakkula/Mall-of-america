import { useRef, useEffect, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { luxuryBrands } from '../../data/brands'
import SectionWrapper from '../../components/layout/SectionWrapper'

export function LuxurySection() {
  const headlineRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline entrance
      gsap.fromTo(headlineRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 82%', once: true } }
      )

      // Cards stagger entrance
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.querySelectorAll('.luxury-card'),
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%', once: true } }
        )
      }

      // Banner entrance
      gsap.fromTo(bannerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8,
          scrollTrigger: { trigger: bannerRef.current, start: 'top 85%', once: true } }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="luxury" className="!pt-0 !pb-0 !px-0">

      {/* Dark intro band */}
      <div
        style={{
          padding: '6rem 2rem 4rem',
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #0A0E1A, #07090F)',
        }}
      >
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.35em', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '1.25rem',
        }}>
          Luxury
        </p>
        <div ref={headlineRef} style={{ opacity: 0 }}>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#F8F6F2',
              lineHeight: 1.15,
              maxWidth: '640px',
              margin: '0 auto 1rem',
            }}
          >
            Where global luxury meets{' '}
            <em style={{ color: '#C9A84C' }}>40 million doors.</em>
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: 'rgba(248,246,242,0.4)', letterSpacing: '0.08em',
          }}>
            Flagship tenants from the world's most recognised luxury houses
          </p>
        </div>
      </div>

      {/* Magazine grid */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1fr 1fr',
          gridTemplateRows: '42vh 42vh',
          gap: '3px',
          background: '#03040A',
          padding: '3px',
        }}
      >
        {/* Gucci — tall left */}
        <BrandCard brand={luxuryBrands[0]} style={{ gridRow: '1 / 3', gridColumn: '1 / 2' }} />
        {/* Coach — top middle */}
        <BrandCard brand={luxuryBrands[1]} style={{ gridRow: '1 / 2', gridColumn: '2 / 3' }} />
        {/* Burberry — top right */}
        <BrandCard brand={luxuryBrands[2]} style={{ gridRow: '1 / 2', gridColumn: '3 / 4' }} />
        {/* CHANEL — wide bottom right */}
        <BrandCard brand={luxuryBrands[3]} style={{ gridRow: '2 / 3', gridColumn: '2 / 4' }} wide />
      </div>

      {/* Tax-free + stats strip */}
      <div
        ref={bannerRef}
        style={{
          opacity: 0,
          background: '#07090F',
          borderTop: '1px solid rgba(201,168,76,0.12)',
          padding: '4.5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Quote */}
          <div>
            <span style={{
              display: 'block', fontFamily: 'Inter, sans-serif',
              fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '1.25rem',
            }}>
              The MOA Advantage
            </span>
            <blockquote
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F8F6F2',
                lineHeight: 1.45,
                margin: 0,
                paddingLeft: '1.5rem',
                borderLeft: '2px solid rgba(201,168,76,0.4)',
              }}
            >
              "Minnesota levies no tax on clothing or shoes. Neither do we compromise on selection."
            </blockquote>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { v: '2.5×', l: 'Int\'l guest spend vs. local' },
              { v: '10%', l: 'of visitors are international' },
              { v: '100+', l: 'MN-exclusive retail stores' },
              { v: '$162', l: 'avg spend per visit' },
            ].map((s) => (
              <div key={s.l} style={{ padding: '1.25rem', border: '1px solid rgba(201,168,76,0.12)', background: 'rgba(201,168,76,0.03)' }}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: '1.8rem', fontWeight: 300, color: '#C9A84C', lineHeight: 1,
                }}>
                  {s.v}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '0.1em', color: 'rgba(248,246,242,0.35)',
                  marginTop: '6px', lineHeight: 1.4,
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

/* ── Brand card ── */
function BrandCard({
  brand,
  style,
  wide = false,
}: {
  brand: typeof luxuryBrands[0]
  style?: React.CSSProperties
  wide?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="luxury-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
        opacity: 0,
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={brand.image}
        alt={brand.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Gradient overlay — darkens on rest, lightens slightly on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(5,6,12,0.88) 0%, rgba(5,6,12,0.2) 55%, rgba(5,6,12,0.1) 100%)'
          : 'linear-gradient(to top, rgba(5,6,12,0.92) 0%, rgba(5,6,12,0.45) 50%, rgba(5,6,12,0.2) 100%)',
        transition: 'background 0.5s ease',
      }} />

      {/* Gold top line — appears on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: '#C9A84C',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.4s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: wide ? '2rem 2.5rem' : '1.75rem 1.75rem',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'transform 0.4s ease',
      }}>
        {/* Brand label */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px',
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '6px',
          opacity: hovered ? 1 : 0.7,
          transition: 'opacity 0.3s',
        }}>
          Featured Brand
        </p>

        <h3
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: wide ? 'clamp(2rem, 4vw, 3.2rem)' : 'clamp(1.6rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#F8F6F2',
            lineHeight: 1,
            marginBottom: '0.5rem',
            letterSpacing: '0.02em',
          }}
        >
          {brand.name}
        </h3>

        {/* Tagline — only visible on hover */}
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '12px',
          color: 'rgba(248,246,242,0.55)', lineHeight: 1.5,
          maxWidth: '280px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
        }}>
          {brand.tagline}
        </p>
      </div>
    </div>
  )
}
