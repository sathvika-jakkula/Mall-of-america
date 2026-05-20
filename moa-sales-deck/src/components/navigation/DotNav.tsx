import type { SectionMeta, SectionId } from '../../types'

interface Props {
  sections: SectionMeta[]
  activeSection: SectionId
}

export function DotNav({ sections, activeSection }: Props) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section navigation"
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 30,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        alignItems: 'flex-end',
      }}
      className="hidden lg:flex"
    >
      {sections.map((s) => {
        const isActive = s.id === activeSection
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            aria-label={`Go to ${s.label}`}
            className="group"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0',
            }}
          >
            {/* Label — visible on active or group hover */}
            <span
              className="group-hover:opacity-100 group-hover:translate-x-0"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#F8F6F2',
                opacity: isActive ? 0.85 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(6px)',
                transition: 'opacity 0.25s, transform 0.25s',
                whiteSpace: 'nowrap',
              }}
            >
              {s.label}
            </span>

            {/* Dot */}
            <span
              style={{
                display: 'block',
                borderRadius: '50%',
                width: isActive ? '8px' : '5px',
                height: isActive ? '8px' : '5px',
                backgroundColor: isActive ? '#C9A84C' : 'rgba(248,246,242,0.35)',
                boxShadow: isActive ? '0 0 6px rgba(201,168,76,0.6)' : 'none',
                transition: 'all 0.3s',
                flexShrink: 0,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
