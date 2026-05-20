import { useRef, useEffect, useState } from 'react'
import { gsap } from '../../utils/gsap'
import SectionWrapper from '../../components/layout/SectionWrapper'

const otherAttractions = [
  {
    id: 'sealife',
    name: 'SEA LIFE Minnesota',
    type: "Minnesota's Largest Aquarium",
    facts: ['10,000+ sea creatures', '300-ft ocean tunnel', 'Giant Pacific octopus'],
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=900&q=85',
    span: 'wide',   // 2 cols
  },
  {
    id: 'lego',
    name: 'LEGO Discovery Center',
    type: 'Imagination Without Limits',
    facts: ['Interactive LEGO builds', '4D cinema', 'Master builder workshops'],
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=700&q=85',
    span: 'normal',
  },
  {
    id: 'crayola',
    name: 'Crayola Experience',
    type: 'Color the World',
    facts: ['25+ hands-on activities', 'Crayon making', 'Digital art'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=85',
    span: 'normal',
  },
  {
    id: 'flyover',
    name: 'FlyOver America',
    type: 'Soar Above the Nation',
    facts: ['Flight simulation', 'Spherical theatre', 'Immersive 4D'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
    span: 'wide',   // 2 cols
  },
]

export function AttractionsSection() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text entrance
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 75%', once: true } }
      )

      // Stats stagger
      gsap.fromTo(
        statsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%', once: true } }
      )

      // Grid cards
      gsap.fromTo(
        gridRef.current?.querySelectorAll('.attr-card') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true } }
      )

      // Ken Burns on hero image
      gsap.to('.nick-img', {
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
    <SectionWrapper id="attractions" className="!p-0 !overflow-visible">

      {/* ── HERO: Full-bleed MOA interior ── */}
      <div
        ref={heroRef}
        style={{ position: 'relative', height: '90vh', minHeight: '600px', overflow: 'hidden' }}
      >
        {/* The actual MOA Nickelodeon Universe image */}
        <img
          className="nick-img"
          src="/images/moa-nickelodeon-universe.png"
          alt="Nickelodeon Universe at Mall of America"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            transformOrigin: 'center center',
          }}
        />

        {/* Gradient: dark top bar + dark bottom for text legibility, clear in the middle */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,6,12,0.65) 0%, rgba(5,6,12,0.05) 30%, rgba(5,6,12,0.05) 55%, rgba(5,6,12,0.88) 100%)',
        }} />

        {/* Top eyebrow */}
        <div style={{
          position: 'absolute', top: '2rem', left: '4vw',
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C',
        }}>
          Attractions &amp; Entertainment
        </div>

        {/* Bottom content */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '3rem 4vw',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'flex-end',
          gap: '2rem',
        }}>
          {/* Left: headline */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <h2 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 300, color: '#F8F6F2', lineHeight: 1.05,
              marginBottom: '0.75rem',
            }}>
              Nickelodeon Universe
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '13px',
              color: '#C9A84C', letterSpacing: '0.1em',
            }}>
              America's Largest Indoor Theme Park
            </p>
          </div>

          {/* Right: 3 stats */}
          <div
            ref={statsRef}
            style={{ display: 'flex', gap: '0', flexShrink: 0 }}
          >
            {[
              { n: '7', u: 'Acres', s: 'Indoor' },
              { n: '27', u: 'Rides', s: '& Attractions' },
              { n: '#1', u: 'Largest', s: 'In the US' },
            ].map((s, i) => (
              <div key={s.u} style={{
                textAlign: 'center',
                padding: '1.25rem 1.75rem',
                borderLeft: i > 0 ? '1px solid rgba(201,168,76,0.2)' : 'none',
                background: 'rgba(5,6,12,0.6)',
                backdropFilter: 'blur(8px)',
                opacity: 0,
              }}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                  fontWeight: 300, color: '#C9A84C', lineHeight: 1,
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: '#F8F6F2', marginTop: '4px',
                }}>
                  {s.u}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '9px',
                  color: 'rgba(248,246,242,0.4)', marginTop: '2px',
                }}>
                  {s.s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION BRIDGE ── */}
      <div style={{
        background: '#07090F',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        padding: '2.5rem 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px',
          letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C',
        }}>
          More to Explore
        </p>
        <p style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: 'rgba(248,246,242,0.5)',
        }}>
          Five world-class attractions. All under one roof.
        </p>
      </div>

      {/* ── BENTO GRID: other attractions ── */}
      <div
        ref={gridRef}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '320px 320px',
          gap: '3px',
          background: '#03040A',
          padding: '3px',
        }}
      >
        {/* SEA LIFE — wide, top row cols 1-2 */}
        <AttractionCard
          attraction={otherAttractions[0]}
          style={{ gridColumn: '1 / 3', gridRow: '1 / 2' }}
        />
        {/* LEGO — top row col 3 */}
        <AttractionCard
          attraction={otherAttractions[1]}
          style={{ gridColumn: '3 / 4', gridRow: '1 / 2' }}
        />
        {/* Crayola — top row col 4 */}
        <AttractionCard
          attraction={otherAttractions[2]}
          style={{ gridColumn: '4 / 5', gridRow: '1 / 2' }}
        />
        {/* FlyOver — wide, bottom row cols 3-4 */}
        <AttractionCard
          attraction={otherAttractions[3]}
          style={{ gridColumn: '3 / 5', gridRow: '2 / 3' }}
        />

        {/* Scale infographic cell */}
        <div
          className="attr-card"
          style={{
            gridColumn: '1 / 3',
            gridRow: '2 / 3',
            background: '#07090F',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '3rem',
            opacity: 0,
            borderRight: '3px solid #03040A',
          }}
        >
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '9px',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '2rem',
          }}>
            Scale &amp; Impact
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {[
              { v: '5', l: 'World-class attractions' },
              { v: '2M+', l: 'Attraction visitors / yr' },
              { v: '7 acres', l: 'Indoor theme park alone' },
              { v: '10K+', l: 'Sea creatures at SEA LIFE' },
            ].map((s) => (
              <div key={s.l}>
                <div style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                  fontWeight: 300, color: '#C9A84C', lineHeight: 1,
                }}>
                  {s.v}
                </div>
                <div style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '10px',
                  letterSpacing: '0.1em', color: 'rgba(248,246,242,0.35)',
                  marginTop: '5px', lineHeight: 1.4,
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

/* ── Attraction card ── */
function AttractionCard({
  attraction,
  style,
}: {
  attraction: typeof otherAttractions[0]
  style?: React.CSSProperties
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="attr-card"
      style={{
        position: 'relative',
        overflow: 'hidden',
        opacity: 0,
        cursor: 'default',
        ...style,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={attraction.image}
        alt={attraction.name}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(5,6,12,0.92) 0%, rgba(5,6,12,0.35) 55%, rgba(5,6,12,0.1) 100%)'
          : 'linear-gradient(to top, rgba(5,6,12,0.85) 0%, rgba(5,6,12,0.2) 60%, rgba(5,6,12,0.05) 100%)',
        transition: 'background 0.4s ease',
      }} />

      {/* Gold top border on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: '#C9A84C',
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.45s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '1.75rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.35s ease',
      }}>
        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '9px',
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#C9A84C', marginBottom: '6px',
        }}>
          {attraction.type}
        </p>
        <h4 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
          fontWeight: 300, color: '#F8F6F2', lineHeight: 1.15,
          marginBottom: '0.6rem',
        }}>
          {attraction.name}
        </h4>

        {/* Facts — visible on hover */}
        <ul style={{
          margin: 0, padding: 0, listStyle: 'none',
          display: 'flex', flexDirection: 'column', gap: '4px',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}>
          {attraction.facts.map((f) => (
            <li key={f} style={{
              fontFamily: 'Inter, sans-serif', fontSize: '11px',
              color: 'rgba(248,246,242,0.6)', display: 'flex', gap: '6px',
            }}>
              <span style={{ color: '#C9A84C', marginTop: '1px' }}>—</span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
