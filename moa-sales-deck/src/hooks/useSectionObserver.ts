import { useEffect } from 'react'
import { useStore } from '../store'
import type { SectionId } from '../types'

export function useSectionObserver() {
  const setActiveSection = useStore((s) => s.setActiveSection)
  const markVisited = useStore((s) => s.markVisited)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId
            setActiveSection(id)
            markVisited(id)
          }
        })
      },
      { threshold: 0.4 }
    )

    const sections = document.querySelectorAll('[data-section]')
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [setActiveSection, markVisited])
}
