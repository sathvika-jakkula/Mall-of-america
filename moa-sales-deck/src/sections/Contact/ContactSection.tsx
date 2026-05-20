import { useRef, useEffect, useState } from 'react'
import { gsap } from '../../utils/gsap'
import { useStore } from '../../store'
import { contacts } from '../../data/contacts'
import SectionWrapper from '../../components/layout/SectionWrapper'
import type { InquiryType } from '../../types'

const tracks: { id: InquiryType; label: string; sub: string; name: string; email: string; phone: string }[] = [
  {
    id: 'retail',
    label: 'Retail Leasing',
    sub: 'Flagship · Luxury · Pop-Up · Mid-Tier',
    name: 'Leasing Team',
    email: contacts.leasing.email,
    phone: contacts.leasing.phone,
  },
  {
    id: 'sponsorship',
    label: 'Sponsorship',
    sub: 'Brand Partnerships · Activations · Media',
    name: contacts.partnerships.name,
    email: contacts.partnerships.email,
    phone: contacts.partnerships.phone,
  },
  {
    id: 'events',
    label: 'Events & Venues',
    sub: 'Concerts · Corporate · Productions',
    name: 'Events Team',
    email: contacts.events.email,
    phone: contacts.events.phone,
  },
]

export function ContactSection() {
  const heroRef    = useRef<HTMLDivElement>(null)
  const bodyRef    = useRef<HTMLDivElement>(null)
  const inquiryType   = useStore((s) => s.inquiryType)
  const setInquiryType = useStore((s) => s.setInquiryType)
  const submitted     = useStore((s) => s.submitted)
  const setSubmitted  = useStore((s) => s.setSubmitted)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', message: '' })

  const active = tracks.find((t) => t.id === inquiryType)!

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.h-item') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: heroRef.current, start: 'top 78%', once: true } }
      )
      gsap.fromTo(
        bodyRef.current?.querySelectorAll('.reveal') ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.09,
          scrollTrigger: { trigger: bodyRef.current, start: 'top 78%', once: true } }
      )
      gsap.to('.contact-bg', {
        scale: 1.06, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  return (
    <SectionWrapper id="contact" className="!p-0 !overflow-visible">

      {/* ── CLOSING HERO ── */}
      <div
        ref={heroRef}
        style={{ position: 'relative', height: '70vh', minHeight: '480px', overflow: 'hidden' }}
      >
        <img
          className="contact-bg"
          src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1800&q=90"
          alt="Mall of America"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 60%',
            transformOrigin: 'center center',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(5,6,12,0.5) 0%, rgba(5,6,12,0.2) 30%, rgba(5,6,12,0.82) 100%)',
        }} />

        {/* Eyebrow */}
        <p style={{
          position: 'absolute', top: '2rem', left: '4vw',
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.35em', textTransform: 'uppercase', color: '#C9A84C',
        }}>Connect</p>

        {/* Bottom headline */}
        <div style={{
          position: 'absolute', bottom: '3.5rem', left: 0, right: 0,
          textAlign: 'center', padding: '0 2rem',
        }}>
          <h2 className="h-item" style={{
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            fontWeight: 300, color: '#F8F6F2', lineHeight: 1.1,
            marginBottom: '1rem', opacity: 0,
          }}>
            Let's build something{' '}
            <em style={{ color: '#C9A84C' }}>extraordinary together.</em>
          </h2>
          <p className="h-item" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '13px',
            color: 'rgba(248,246,242,0.5)', letterSpacing: '0.06em', opacity: 0,
          }}>
            40 million visitors. One address. Tell us how you'd like to be part of it.
          </p>
        </div>
      </div>

      {/* ── BODY ── */}
      <div ref={bodyRef} style={{ background: '#0A0E1A', padding: '5rem 4vw' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* Contact channels */}
          <p className="reveal" style={{
            fontFamily: 'Inter, sans-serif', fontSize: '9px',
            letterSpacing: '0.35em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '1.5rem', opacity: 0,
          }}>
            Choose Your Path
          </p>

          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1px', background: 'rgba(201,168,76,0.12)',
            marginBottom: '4rem', opacity: 0,
          }}>
            {tracks.map((t) => {
              const isActive = inquiryType === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setInquiryType(t.id)}
                  style={{
                    background: isActive ? 'rgba(201,168,76,0.07)' : '#0A0E1A',
                    padding: '2rem',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    borderTop: isActive ? '2px solid #C9A84C' : '2px solid transparent',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,168,76,0.03)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = '#0A0E1A'
                  }}
                >
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '9px',
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.5)',
                    marginBottom: '0.6rem',
                    transition: 'color 0.2s',
                  }}>
                    {t.label}
                  </p>
                  <p style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '1.15rem', fontWeight: 300,
                    color: '#F8F6F2', lineHeight: 1.2,
                    marginBottom: '0.6rem',
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    color: 'rgba(248,246,242,0.35)', marginBottom: '1.25rem',
                    lineHeight: 1.4,
                  }}>
                    {t.sub}
                  </p>
                  <a href={`mailto:${t.email}`} style={{
                    display: 'block', fontFamily: 'Inter, sans-serif',
                    fontSize: '11px', color: '#C9A84C',
                    textDecoration: 'none', marginBottom: '3px',
                    letterSpacing: '0.04em',
                  }}>
                    {t.email}
                  </a>
                  <span style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '11px',
                    color: 'rgba(248,246,242,0.3)',
                  }}>
                    {t.phone}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Form */}
          <div className="reveal" style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '5rem', alignItems: 'start', opacity: 0,
          }}>

            {/* Left: context */}
            <div>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '9px',
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: '#C9A84C', marginBottom: '1.25rem',
              }}>
                Send a Message
              </p>
              <h3 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                fontWeight: 300, color: '#F8F6F2', lineHeight: 1.2,
                marginBottom: '1.25rem',
              }}>
                {active.label} inquiry
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '13px',
                lineHeight: 1.8, color: 'rgba(248,246,242,0.4)',
                marginBottom: '2.5rem',
              }}>
                We'll connect you directly with the right team within one business day.
              </p>

              {/* Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '—', text: '60 East Broadway, Bloomington MN 55425' },
                  { icon: '—', text: '12 min from MSP Airport via light rail' },
                  { icon: '—', text: 'mallofamerica.com' },
                ].map((f) => (
                  <div key={f.text} style={{ display: 'flex', gap: '0.75rem' }}>
                    <span style={{ color: '#C9A84C', fontFamily: 'Inter, sans-serif', fontSize: '12px', flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(248,246,242,0.4)', lineHeight: 1.5 }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div>
              {submitted ? (
                <div style={{
                  border: '1px solid rgba(201,168,76,0.25)',
                  padding: '3.5rem', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '2rem', fontWeight: 300,
                    color: '#C9A84C', marginBottom: '1rem',
                  }}>
                    Thank you.
                  </div>
                  <p style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '13px',
                    lineHeight: 1.7, color: 'rgba(248,246,242,0.45)',
                  }}>
                    Your inquiry has been received. We'll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                  {[
                    { id: 'name', label: 'Name', type: 'text', ph: 'Your full name' },
                    { id: 'company', label: 'Company', type: 'text', ph: 'Brand or agency' },
                    { id: 'email', label: 'Email', type: 'email', ph: 'Work email' },
                  ].map((f) => (
                    <div key={f.id}>
                      <label style={{
                        display: 'block', fontFamily: 'Inter, sans-serif',
                        fontSize: '9px', letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)',
                        marginBottom: '0.6rem',
                      }}>
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        value={form[f.id as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        required
                        style={{
                          width: '100%', background: 'transparent',
                          border: 'none', borderBottom: '1px solid rgba(248,246,242,0.15)',
                          padding: '0.75rem 0', color: '#F8F6F2',
                          fontFamily: 'Inter, sans-serif', fontSize: '13px',
                          outline: 'none',
                        }}
                        onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderBottomColor = '#C9A84C')}
                        onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(248,246,242,0.15)')}
                      />
                    </div>
                  ))}

                  <div>
                    <label style={{
                      display: 'block', fontFamily: 'Inter, sans-serif',
                      fontSize: '9px', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: 'rgba(248,246,242,0.35)',
                      marginBottom: '0.6rem',
                    }}>
                      Message
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Tell us about your ${active.label.toLowerCase()} goals...`}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      style={{
                        width: '100%', background: 'transparent',
                        border: 'none', borderBottom: '1px solid rgba(248,246,242,0.15)',
                        padding: '0.75rem 0', color: '#F8F6F2',
                        fontFamily: 'Inter, sans-serif', fontSize: '13px',
                        outline: 'none', resize: 'none',
                      }}
                      onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = '#C9A84C')}
                      onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = 'rgba(248,246,242,0.15)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      background: '#C9A84C',
                      color: '#0A0E1A',
                      border: 'none',
                      padding: '1rem 2.5rem',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      opacity: isSubmitting ? 0.6 : 1,
                      alignSelf: 'flex-start',
                      transition: 'opacity 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#E4C97A' }}
                    onMouseLeave={(e) => { if (!isSubmitting) (e.currentTarget as HTMLButtonElement).style.background = '#C9A84C' }}
                  >
                    {isSubmitting ? 'Sending…' : `Submit Inquiry`}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: '#07090F',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: '2rem 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <span style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontStyle: 'italic', fontSize: '1rem', color: '#C9A84C',
        }}>
          Mall of America
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.12em', color: 'rgba(248,246,242,0.2)',
        }}>
          © 2024 Mall of America · 60 East Broadway, Bloomington, MN
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '10px',
          letterSpacing: '0.12em', color: 'rgba(201,168,76,0.4)',
        }}>
          40M Visitors · 520+ Stores · America's Largest Mall
        </span>
      </div>

    </SectionWrapper>
  )
}
