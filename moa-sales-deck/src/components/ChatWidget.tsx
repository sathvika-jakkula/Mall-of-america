import { useState, useRef, useEffect } from 'react'
import Groq from 'groq-sdk'
import { MOA_SYSTEM_PROMPT } from '../lib/moaContext'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What attractions are at MOA?',
  'How many visitors does MOA get?',
  'Tell me about leasing opportunities',
  'What events can be hosted at MOA?',
]

// Light cream palette used throughout the widget
const C = {
  panelBg:    '#FAF8F5',       // warm off-white
  headerBg:   '#F3EFE8',       // slightly deeper cream for header
  inputBg:    '#FFFFFF',       // pure white input
  assistantBg:'#EDE9E1',       // muted cream for assistant bubbles
  userBg:     '#C9A84C',       // gold for user bubbles
  border:     'rgba(201,168,76,0.3)',
  borderFaint:'rgba(201,168,76,0.15)',
  textPrimary:'#0A0E1A',       // navy
  textMuted:  'rgba(10,14,26,0.5)',
  textFaint:  'rgba(10,14,26,0.35)',
  suggBg:     '#FFFFFF',
  suggBorder: 'rgba(201,168,76,0.25)',
}

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return
    const userMsg: Message = { role: 'user', content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)
    setStreamingText('')

    try {
      const groq = new Groq({
        apiKey: import.meta.env.VITE_GROQ_API_KEY,
        dangerouslyAllowBrowser: true,
      })

      const stream = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: MOA_SYSTEM_PROMPT },
          ...updated.map((m) => ({ role: m.role, content: m.content })),
        ],
        stream: true,
        max_tokens: 512,
        temperature: 0.7,
      })

      let full = ''
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content ?? ''
        full += delta
        setStreamingText(full)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: full }])
      setStreamingText('')
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: "Sorry, I couldn't connect right now. Please check your API key or try again." },
      ])
      setStreamingText('')
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const isEmpty = messages.length === 0 && !streamingText

  return (
    <>
      {/* Floating launcher */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '16px',
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexDirection: 'row-reverse',
        }}
      >
        {/* Circle button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Open MOA assistant"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: open ? C.panelBg : '#C9A84C',
            border: open ? `1px solid ${C.border}` : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            transition: 'background 0.25s',
            flexShrink: 0,
          }}
        >
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <line x1="2" y1="2" x2="14" y2="14" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="14" y1="2" x2="2" y2="14" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 6.145 2 11.25c0 2.117.75 4.07 2 5.638V21l4.5-2.5A10.7 10.7 0 0 0 12 18.75c5.523 0 10-4.145 10-9.25S17.523 2 12 2Z" fill="#0A0E1A" />
            </svg>
          )}
        </button>

        {/* Label pill — only when closed */}
        {!open && (
          <div
            style={{
              background: C.panelBg,
              border: `1px solid ${C.border}`,
              padding: '11px 18px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(true)}
          >
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 600, color: '#C9A84C', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
              Ask about MOA
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500, color: C.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>
              AI Assistant · Always On
            </p>
          </div>
        )}
      </div>

      {/* Chat panel */}
      <div
        style={{
          position: 'fixed',
          bottom: '92px',
          right: '16px',
          zIndex: 60,
          width: 'min(400px, calc(100vw - 32px))',
          height: '520px',
          background: C.panelBg,
          border: `1px solid ${C.border}`,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.25s ease, transform 0.25s ease',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '14px 18px',
            background: C.headerBg,
            borderBottom: `1px solid ${C.borderFaint}`,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#C9A84C',
              boxShadow: '0 0 6px rgba(201,168,76,0.6)',
              flexShrink: 0,
            }}
          />
          <div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '13px', color: '#C9A84C', letterSpacing: '0.1em' }}>
              MOA Assistant
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', letterSpacing: '0.15em', textTransform: 'uppercase', color: C.textMuted, marginTop: '1px' }}>
              Mall of America · Always On
            </p>
          </div>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            background: C.panelBg,
          }}
        >
          {isEmpty && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: C.textMuted, lineHeight: 1.6 }}>
                Ask me anything about Mall of America — attractions, leasing, events, dining, or partnerships.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {SUGGESTED.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 12px',
                      border: `1px solid ${C.suggBorder}`,
                      background: C.suggBg,
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      color: C.textPrimary,
                      transition: 'border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = '#C9A84C'
                      ;(e.currentTarget as HTMLButtonElement).style.background = '#FBF8F2'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = C.suggBorder
                      ;(e.currentTarget as HTMLButtonElement).style.background = C.suggBg
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 13px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  background: msg.role === 'user' ? C.userBg : C.assistantBg,
                  color: msg.role === 'user' ? '#0A0E1A' : C.textPrimary,
                  border: msg.role === 'assistant' ? `1px solid ${C.borderFaint}` : 'none',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Streaming bubble */}
          {streamingText && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  maxWidth: '85%',
                  padding: '10px 13px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  background: C.assistantBg,
                  color: C.textPrimary,
                  border: `1px solid ${C.borderFaint}`,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {streamingText}
                <span style={{ display: 'inline-block', width: '6px', height: '12px', background: '#C9A84C', marginLeft: '2px', animation: 'blink 1s infinite', verticalAlign: 'text-bottom' }} />
              </div>
            </div>
          )}

          {/* Loading dots */}
          {loading && !streamingText && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ padding: '10px 13px', border: `1px solid ${C.borderFaint}`, background: C.assistantBg }}>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C', opacity: 0.6, animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div style={{ borderTop: `1px solid ${C.borderFaint}`, padding: '12px', background: C.headerBg, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about MOA..."
              rows={1}
              disabled={loading}
              style={{
                flex: 1,
                resize: 'none',
                background: C.inputBg,
                border: `1px solid ${C.suggBorder}`,
                color: C.textPrimary,
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                padding: '8px 10px',
                outline: 'none',
                lineHeight: 1.5,
                maxHeight: '80px',
                overflowY: 'auto',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#C9A84C')}
              onBlur={(e) => (e.currentTarget.style.borderColor = C.suggBorder)}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{
                padding: '8px 14px',
                background: !input.trim() || loading ? 'rgba(201,168,76,0.3)' : '#C9A84C',
                border: 'none',
                cursor: !input.trim() || loading ? 'not-allowed' : 'pointer',
                color: '#0A0E1A',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'background 0.2s',
                flexShrink: 0,
                height: '36px',
              }}
            >
              Send
            </button>
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '9px', color: C.textFaint, marginTop: '6px', textAlign: 'center', letterSpacing: '0.05em' }}>
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
      `}</style>
    </>
  )
}
