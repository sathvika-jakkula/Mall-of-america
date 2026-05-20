import { useStore } from '../../store'

export function NavTrigger() {
  const isNavOpen = useStore((s) => s.isNavOpen)
  const setNavOpen = useStore((s) => s.setNavOpen)

  return (
    <button
      onClick={() => setNavOpen(!isNavOpen)}
      aria-label={isNavOpen ? 'Close navigation' : 'Open navigation'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '5px',
        width: '36px',
        height: '36px',
        background: 'none',
        border: '1px solid rgba(201,168,76,0.3)',
        cursor: 'pointer',
        padding: '8px',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.7)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(201,168,76,0.3)')}
    >
      <span
        style={{
          display: 'block',
          width: '100%',
          height: '1px',
          background: isNavOpen ? '#C9A84C' : '#F8F6F2',
          transformOrigin: 'center',
          transform: isNavOpen ? 'translateY(6px) rotate(45deg)' : 'none',
          transition: 'transform 0.3s, background 0.2s',
        }}
      />
      <span
        style={{
          display: 'block',
          width: '60%',
          height: '1px',
          background: isNavOpen ? '#C9A84C' : '#F8F6F2',
          marginLeft: 'auto',
          opacity: isNavOpen ? 0 : 1,
          transition: 'opacity 0.2s, background 0.2s',
        }}
      />
      <span
        style={{
          display: 'block',
          width: '100%',
          height: '1px',
          background: isNavOpen ? '#C9A84C' : '#F8F6F2',
          transformOrigin: 'center',
          transform: isNavOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
          transition: 'transform 0.3s, background 0.2s',
        }}
      />
    </button>
  )
}
