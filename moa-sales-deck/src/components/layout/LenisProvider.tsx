import { createContext, useEffect, useRef, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../utils/gsap'

export const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const l = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })
    lenisRef.current = l
    setLenis(l)

    gsap.ticker.add((time) => l.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)
    ScrollTrigger.normalizeScroll(false)
    l.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove((time) => l.raf(time * 1000))
      l.destroy()
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
