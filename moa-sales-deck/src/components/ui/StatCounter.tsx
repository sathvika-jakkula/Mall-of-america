import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'

interface Props {
  value: number
  prefix?: string
  suffix?: string
  label: string
  className?: string
}

export function StatCounter({ value, prefix = '', suffix = '', label, className = '' }: Props) {
  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!numRef.current) return
    const obj = { val: 0 }
    const formatted = value >= 1_000_000
      ? (n: number) => `${(n / 1_000_000).toFixed(0)}M`
      : (n: number) => Math.round(n).toLocaleString()

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: value,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: numRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate() {
          if (numRef.current) {
            numRef.current.textContent = `${prefix}${formatted(obj.val)}${suffix}`
          }
        },
      })
    })
    return () => ctx.revert()
  }, [value, prefix, suffix])

  return (
    <div className={`flex flex-col ${className}`}>
      <span
        ref={numRef}
        className="text-5xl md:text-6xl font-light text-[var(--color-moa-cream)] tabular-nums"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        {prefix}0{suffix}
      </span>
      <span className="text-sm tracking-widest uppercase text-[var(--color-moa-gray-light)] mt-2">
        {label}
      </span>
    </div>
  )
}
