'use client'
import { useState } from 'react'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { ideaPrompts } from '@/data'

const steps = [
  {
    num: '01',
    title: 'Spark an Idea',
    desc: 'Hit generate and get an AI-crafted startup concept tailored to real market gaps.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Refine Your Vision',
    desc: 'Use the tags and domain hints to shape the idea into something uniquely yours.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Submit & Build',
    desc: 'Ready? Submit your idea to IEDC and get mentorship, funding, and a team behind you.',
    icon: (
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.819m2.562-5.84a14.927 14.927 0 00-2.58 5.841" />
      </svg>
    ),
  },
]

export default function IdeaGeneratorSection() {
  const [text, setText] = useState('Click the button to generate your first idea…')
  const [tags, setTags] = useState<{ label: string; type: string }[]>([])
  const [typing, setTyping] = useState(false)
  const [showBlink, setShowBlink] = useState(false)

  const generate = () => {
    if (typing) return
    setTyping(true)
    setTags([])
    setShowBlink(true)

    const idea = ideaPrompts[Math.floor(Math.random() * ideaPrompts.length)]
    let i = 0
    setText('')
    const interval = setInterval(() => {
      setText(idea.text.slice(0, i + 1))
      i++
      if (i >= idea.text.length) {
        clearInterval(interval)
        setShowBlink(false)
        setTags(idea.tags.map((label: string, idx: number) => ({ label, type: idea.tagsType[idx] })))
        setTyping(false)
      }
    }, 22)
  }

  return (
    <section
      id="idea-gen"
      style={{
        padding: '8rem 8vw',
        background: 'linear-gradient(135deg,var(--bg) 0%,rgba(14,158,6,.04) 50%,rgba(201,162,39,.04) 100%)',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section header */}
        <SectionHeader
          tag="AI Spark"
          title={<>Startup <span style={{ color: 'var(--gold)' }}>Idea Generator</span></>}
        />
        <p
          className="reveal"
          style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.6rem', maxWidth: 480 }}
        >
          Can&apos;t find your idea? Let us spark one — then help you build it.
        </p>

        {/* Two-column layout */}
        <div className="idea-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', marginTop: '4rem', alignItems: 'start' }}>

          {/* LEFT — How it works */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '1.6rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <span style={{ display: 'block', width: 16, height: 1.5, background: 'var(--gold)' }} />
              How it works
            </p>

            {steps.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  alignItems: 'flex-start',
                  padding: '1.4rem 1.6rem',
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(14,158,6,0.1)',
                  marginBottom: '0.8rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Big background number */}
                <span style={{
                  position: 'absolute',
                  top: '-0.5rem',
                  right: '1rem',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '4rem',
                  lineHeight: 1,
                  color: 'rgba(14,158,6,0.05)',
                  pointerEvents: 'none',
                }}>
                  {step.num}
                </span>

                {/* Icon */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: i === 2 ? 'rgba(201,162,39,0.1)' : 'rgba(14,158,6,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: i === 2 ? 'var(--gold)' : 'var(--green)',
                  flexShrink: 0,
                }}>
                  {step.icon}
                </div>

                {/* Text */}
                <div>
                  <h4 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: '0.3rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Subtle note */}
            <p style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.12em',
              color: 'var(--muted-light)',
              marginTop: '0.4rem',
              paddingLeft: '0.2rem',
            }}>
              ✦ Ideas are AI-generated prompts — the real work is yours.
            </p>
          </div>

          {/* RIGHT — Generator */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {/* Terminal card */}
            <div style={{
              background: 'rgba(255,255,255,.88)',
              border: '1.5px solid rgba(14,158,6,.25)',
              borderRadius: 12,
              padding: '2rem 2.2rem',
              boxShadow: '0 8px 40px rgba(14,158,6,.08), 0 2px 12px rgba(0,0,0,.05)',
              position: 'relative',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}>
              {/* macOS dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.2rem' }}>
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
                <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.15em', color: 'var(--muted-light)', marginLeft: '0.5rem', textTransform: 'uppercase' }}>
                  idea.generate()
                </span>
              </div>

              <p style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--muted-light)',
              }}>
                Generated startup idea
              </p>

              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--text)',
                minHeight: '3.6rem',
                lineHeight: 1.45,
              }}>
                {text}
                {showBlink && <span className="idea-cursor-blink" />}
              </div>

              {tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.2rem' }}>
                  {tags.map(t => (
                    <span key={t.label} className={`idea-tag-item${t.type === 'y' ? ' gold' : ''}`}>
                      {t.label}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={generate}
              disabled={typing}
              style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(90deg,var(--green-dark),var(--green))',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: 6,
                cursor: typing ? 'not-allowed' : 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s',
                opacity: typing ? 0.6 : 1,
                fontFamily: 'Syne, sans-serif',
                width: '100%',
              }}
              onMouseEnter={e => { if (!typing) { (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.target as HTMLButtonElement).style.boxShadow = '0 12px 36px rgba(14,158,6,.28)' } }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.transform = ''; (e.target as HTMLButtonElement).style.boxShadow = '' }}
            >
              {typing ? '⟳ Generating…' : '✦ Generate Startup Idea'}
            </button>

            {/* Submit nudge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.4rem',
              borderRadius: 8,
              background: 'rgba(201,162,39,0.07)',
              border: '1px solid rgba(201,162,39,0.2)',
            }}>
              <div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)', margin: 0 }}>
                  Got a real idea?
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', margin: '0.15rem 0 0', lineHeight: 1.5 }}>
                  Submit it — we&apos;ll help you build it.
                </p>
              </div>
              <Link
                href="/submit-idea"
                style={{
                  padding: '0.5rem 1.1rem',
                  background: 'var(--gold)',
                  color: '#fff',
                  borderRadius: 5,
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                Submit →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .idea-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}