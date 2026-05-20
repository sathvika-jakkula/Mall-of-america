import { useRef, useEffect } from 'react'
import { gsap } from '../../utils/gsap'
import { heroStats } from '../../data/stats'

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const scrollPromptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 })
        .fromTo(eyebrowRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
        .fromTo(line1Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
        .fromTo(line2Ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo(subRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo(statsRef.current?.children ?? [], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3')
        .fromTo(scrollPromptRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')

      // Ken Burns on video
      gsap.to(videoRef.current, {
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Bounce scroll cue
      gsap.to('.scroll-cue', {
        y: 8, repeat: -1, yoyo: true, duration: 0.9, ease: 'power1.inOut',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      data-section
      className="relative w-full h-screen min-h-[640px] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Local MOA video */}
      <video
        ref={videoRef}
        className="video-fill"
        style={{ opacity: 0, transformOrigin: 'center center' }}
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1920&q=80"
      >
        <source src="/videos/A World Built For Experiences (2).mp4" type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(10,14,26,0.55) 0%, rgba(10,14,26,0.15) 40%, rgba(10,14,26,0.75) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full">

        {/* Eyebrow */}
        <div ref={eyebrowRef} style={{ opacity: 0 }} className="mb-8">
          <span style={{
            color: '#C9A84C',
            fontSize: '11px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontFamily: 'Inter, sans-serif',
          }}>
            Bloomington, Minnesota · Est. 1992
          </span>
        </div>

        {/* Headline — two separate divs, no inline-block word splits */}
        <div
          ref={line1Ref}
          style={{
            opacity: 0,
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 300,
            lineHeight: 1.08,
            color: '#F8F6F2',
            marginBottom: '0.15em',
          }}
        >
          America's Most
        </div>
        <div
          ref={line2Ref}
          style={{
            opacity: 0,
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.08,
            color: '#F8F6F2',
            marginBottom: '2rem',
          }}
        >
          Visited Destination.
        </div>

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            opacity: 0,
            color: '#9CA3AF',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            letterSpacing: '0.06em',
            maxWidth: '480px',
            margin: '0 auto 3rem',
            lineHeight: 1.7,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          40 million visitors. $1B+ in annual sales.<br />One address that changes everything.
        </p>

        {/* Quick stats */}
        <div ref={statsRef} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem' }}>
          {heroStats.map((s) => (
            <div key={s.label} style={{ opacity: 0, textAlign: 'center' }}>
              <div style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 300,
                color: '#C9A84C',
                lineHeight: 1.2,
              }}>
                {s.prefix}{s.value}{s.suffix}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#6B7280',
                marginTop: '4px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={scrollPromptRef}
        style={{ opacity: 0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span style={{ fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#6B7280', fontFamily: 'Inter, sans-serif' }}>
          Explore
        </span>
        <div
          className="scroll-cue"
          style={{ width: '1px', height: '2rem', background: 'linear-gradient(to bottom, #C9A84C, transparent)' }}
        />
      </div>
    </section>
  )
}
