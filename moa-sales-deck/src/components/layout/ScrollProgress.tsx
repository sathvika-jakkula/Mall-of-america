import { useEffect, useRef } from 'react'
import { gsap } from '../../utils/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!barRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(barRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-[var(--color-moa-gold)] origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
