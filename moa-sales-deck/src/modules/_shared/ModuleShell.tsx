import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../utils/gsap'
import { useStore } from '../../store'
import type { ModuleId } from '../../types'

interface Props {
  children: ReactNode
  title: string
  subtitle?: string
  heroImage?: string
  id?: ModuleId
}

export function ModuleShell({ children, title, subtitle, heroImage, id: _id }: Props) {
  const setModule = useStore((s) => s.setActiveModule)
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', delay: 0.15 })
      if (heroRef.current) {
        gsap.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 z-[40] overflow-y-auto" data-lenis-prevent style={{ background: '#0A0E1A', fontFamily: 'var(--font-sans)' }}>

      {/* Sticky top bar */}
      <div
        className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10"
        style={{
          height: '60px',
          background: 'rgba(10,14,26,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        <button
          onClick={() => setModule(null)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'Inter, sans-serif', fontSize: '10px',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(248,246,242,0.5)', background: 'none',
            border: 'none', cursor: 'pointer', transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#C9A84C')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,246,242,0.5)')}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M1 5h12M1 5l4-4M1 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '11px', color: '#C9A84C', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
          {title}
        </span>

        <button
          onClick={() => setModule(null)}
          style={{
            width: '32px', height: '32px', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'none', border: '1px solid rgba(201,168,76,0.25)',
            cursor: 'pointer', color: 'rgba(248,246,242,0.5)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9A84C'; (e.currentTarget as HTMLButtonElement).style.color = '#C9A84C' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.25)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(248,246,242,0.5)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="1" y1="1" x2="11" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="11" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Optional hero banner */}
      {heroImage && (
        <div ref={heroRef} style={{ position: 'relative', height: '320px', overflow: 'hidden', opacity: 0 }}>
          <img src={heroImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.5) 60%, #0A0E1A 100%)' }} />
          <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#C9A84C', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>Deep Dive</p>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#F8F6F2', fontWeight: 300, lineHeight: 1.1 }}
              dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'rgba(248,246,242,0.6)', marginTop: '10px', letterSpacing: '0.02em' }}>{subtitle}</p>}
          </div>
        </div>
      )}

      {/* Content */}
      <div ref={containerRef} style={{ opacity: 0 }}>
        {!heroImage && (
          <div style={{ padding: '60px 2rem 0', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: '#C9A84C', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '12px' }}>Deep Dive</p>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#F8F6F2', fontWeight: 300, lineHeight: 1.1 }}
              dangerouslySetInnerHTML={{ __html: title }} />
            {subtitle && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'rgba(248,246,242,0.55)', marginTop: '14px', maxWidth: '560px', margin: '14px auto 0', lineHeight: 1.7 }}>{subtitle}</p>}
            <div style={{ width: '40px', height: '1px', background: '#C9A84C', margin: '32px auto 0' }} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
