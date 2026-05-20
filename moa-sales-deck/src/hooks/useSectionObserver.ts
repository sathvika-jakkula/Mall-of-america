import { useEffect } from 'react'
import { useStore } from '../store'
import type { SectionId } from '../types'

export function useSectionObserver() {
  const setActiveSection = useStore((s) => s.setActiveSection)
  const markVisited = useStore((s) => s.markVisited)

  useEffect(() => {
    function update() {
      const els = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'))
      const trigger = window.innerHeight * 0.4
      let active: SectionId | null = null
      for (const el of els) {
        if (el.getBoundingClientRect().top <= trigger) {
          active = el.id as SectionId
        }
      }
      if (active) {
        setActiveSection(active)
        markVisited(active)
      }
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [setActiveSection, markVisited])
}
