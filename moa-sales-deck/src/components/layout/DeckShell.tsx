import { useStore } from '../../store'
import { NavTrigger } from '../navigation/NavTrigger'
import { DotNav } from '../navigation/DotNav'
import { ScrollProgress } from './ScrollProgress'
import { sections } from '../../data/sections'

export function DeckShell() {
  const activeSection = useStore((s) => s.activeSection)


  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navSections = sections.filter((s) => s.id !== 'hero')

  return (
    <>
      <ScrollProgress />

      <header
        className="fixed top-0 left-0 right-0 z-[30]"
        style={{
          background: 'var(--nav-bg)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--nav-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            height: '60px',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              color: '#C9A84C',
              fontSize: '14px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 400,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Mall of America
          </button>

          {/* Center section links — desktop only */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
            className="hidden lg:flex"
          >
            {navSections.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: activeSection === s.id ? '#C9A84C' : `rgba(var(--text-rgb),0.55)`,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  borderBottom: activeSection === s.id ? '1px solid #C9A84C' : '1px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== s.id) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== s.id) (e.currentTarget as HTMLButtonElement).style.color = `rgba(var(--text-rgb),0.55)`
                }}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>



            {/* Hamburger */}
            <NavTrigger />
          </div>
        </div>
      </header>

      {/* Dot nav — right rail */}
      <DotNav sections={sections} activeSection={activeSection} />
    </>
  )
}
