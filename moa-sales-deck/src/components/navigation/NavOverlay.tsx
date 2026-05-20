import { useEffect, useRef } from 'react'
import { useStore } from '../../store'
import { gsap } from '../../utils/gsap'
import { sections } from '../../data/sections'
import type { SectionId, ModuleId } from '../../types'

const modules = [
  { id: 'events' as ModuleId, label: 'Events & Activation', sub: 'Concerts · Brand Activations · Corporate' },
  { id: 'sponsorship' as ModuleId, label: 'Sponsorship', sub: 'Partnership Tiers · Audience Data · ROI' },
  { id: 'leasing' as ModuleId, label: 'Leasing Paths', sub: 'Luxury · Retail · F&B · Pop-Up' },
  { id: 'venue' as ModuleId, label: 'Venue Spaces', sub: 'Executive Center · Parkview · Hotels' },
]

export function NavOverlay() {
  const isNavOpen = useStore((s) => s.isNavOpen)
  const setNavOpen = useStore((s) => s.setNavOpen)
  const setActiveModule = useStore((s) => s.setActiveModule)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return
    if (isNavOpen) {
      gsap.set(overlayRef.current, { pointerEvents: 'auto', display: 'flex' })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.fromTo(
        contentRef.current.querySelectorAll('.nav-item'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', delay: 0.1 }
      )
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { pointerEvents: 'none', display: 'none' })
        },
      })
    }
  }, [isNavOpen])

  const goToSection = (id: SectionId) => {
    setNavOpen(false)
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const openModule = (id: ModuleId) => {
    setNavOpen(false)
    setTimeout(() => setActiveModule(id), 300)
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(10, 14, 26, 0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        display: 'none',
        opacity: 0,
        pointerEvents: 'none',
        flexDirection: 'column',
      }}
    >
      {/* Top bar inside overlay */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          height: '60px',
          borderBottom: '1px solid rgba(201,168,76,0.12)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            color: '#C9A84C',
            fontSize: '14px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
          }}
        >
          Mall of America
        </span>

        <button
          onClick={() => setNavOpen(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '5px',
            width: '36px',
            height: '36px',
            background: 'none',
            border: '1px solid rgba(201,168,76,0.4)',
            cursor: 'pointer',
            padding: '8px',
          }}
          aria-label="Close navigation"
        >
          <span style={{ display: 'block', width: '100%', height: '1px', background: '#C9A84C', transform: 'translateY(6px) rotate(45deg)' }} />
          <span style={{ display: 'block', width: '100%', height: '1px', background: '#C9A84C', opacity: 0 }} />
          <span style={{ display: 'block', width: '100%', height: '1px', background: '#C9A84C', transform: 'translateY(-6px) rotate(-45deg)' }} />
        </button>
      </div>

      {/* Main nav content */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0',
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          padding: '4rem 2rem',
          alignContent: 'center',
        }}
        className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left: main sections */}
        <div style={{ paddingRight: '4rem', borderRight: '1px solid rgba(201,168,76,0.1)' }}>
          <p
            className="nav-item"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '2rem',
            }}
          >
            The Deck
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {sections.filter((s) => s.id !== 'hero').map((s) => (
              <button
                key={s.id}
                onClick={() => goToSection(s.id)}
                className="nav-item group"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                  fontWeight: 300,
                  color: 'rgba(248,246,242,0.8)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: '0.3rem 0',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#C9A84C')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(248,246,242,0.8)')}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: deep-dive modules */}
        <div style={{ paddingLeft: '4rem' }}>
          <p
            className="nav-item"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '9px',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C9A84C',
              marginBottom: '2rem',
            }}
          >
            Deep Dives
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => openModule(m.id)}
                className="nav-item"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  const t = e.currentTarget as HTMLButtonElement
                  ;(t.querySelector('.mod-title') as HTMLElement).style.color = '#C9A84C'
                }}
                onMouseLeave={(e) => {
                  const t = e.currentTarget as HTMLButtonElement
                  ;(t.querySelector('.mod-title') as HTMLElement).style.color = 'rgba(248,246,242,0.8)'
                }}
              >
                <span
                  className="mod-title"
                  style={{
                    display: 'block',
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                    fontWeight: 300,
                    color: 'rgba(248,246,242,0.8)',
                    transition: 'color 0.2s',
                    marginBottom: '2px',
                  }}
                >
                  {m.label} <span style={{ color: '#C9A84C', fontSize: '0.85em' }}>→</span>
                </span>
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    color: 'rgba(248,246,242,0.3)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {m.sub}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '1.5rem 2rem',
          borderTop: '1px solid rgba(201,168,76,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(248,246,242,0.25)',
          }}
        >
          60 East Broadway · Bloomington, MN 55425
        </span>
        <span
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'rgba(201,168,76,0.4)',
          }}
        >
          mallofamerica.com
        </span>
      </div>
    </div>
  )
}
