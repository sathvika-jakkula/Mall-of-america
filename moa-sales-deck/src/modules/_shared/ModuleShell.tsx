import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from '../../utils/gsap'
import { useStore } from '../../store'
import type { ModuleId } from '../../types'

interface Props {
  children: ReactNode
  title: string
  id?: ModuleId  // reserved for future Flip animation targeting
}

export function ModuleShell({ children, title, id: _id }: Props) {
  const setModule = useStore((s) => s.setActiveModule)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="fixed inset-0 z-[40] bg-[var(--color-moa-navy)] overflow-y-auto"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-8 py-5 bg-[rgba(10,14,26,0.95)] backdrop-blur-sm border-b border-[rgba(201,168,76,0.15)]">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setModule(null)}
            className="text-xs tracking-widest uppercase text-[var(--color-moa-gray-light)] hover:text-[var(--color-moa-cream)] transition-colors"
          >
            ← Back to Deck
          </button>
          <span className="text-[rgba(201,168,76,0.3)]">|</span>
          <span className="text-[var(--color-moa-gold)] text-xs tracking-[0.3em] uppercase">{title}</span>
        </div>
        <button
          onClick={() => setModule(null)}
          className="text-[var(--color-moa-cream)] opacity-50 hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div ref={containerRef} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  )
}
