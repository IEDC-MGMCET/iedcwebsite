'use client'
import { useEffect, useRef } from 'react'

const reasons = [
  {
    title: 'Real Experience',
    stat: '100%',
    statLabel: 'Hands-On Learning',
    desc: 'No passive lectures. Every program is built around doing — prototyping, pitching, and shipping real work.',
  },
  {
    title: 'Ground Floor',
    stat: '2025',
    statLabel: 'Founded',
    desc: 'We are just getting started. Join now and shape what IEDC MGMCET becomes — not just participate in it.',
  },
  {
    title: 'Zero Barriers',
    stat: '₹0',
    statLabel: 'Membership Fee',
    desc: 'No prior experience needed. No fees. Just curiosity, drive, and the willingness to build something real.',
  },
  {
    title: 'IEDC Network',
    stat: 'Kerala',
    statLabel: 'Wide Ecosystem',
    desc: 'Backed by IEDC Kerala — a statewide network of innovation cells, mentors, and startup opportunities.',
  },
]

export default function WhySection() {
  const headingRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const els = [headingRef.current, subRef.current, gridRef.current, noteRef.current]
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }
      })
    }, { threshold: 0.15 })

    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(28px)'
      el.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="why"
      style={{
        padding: '8rem 8vw',
        background: 'var(--green)',       /* logo teal */
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />

      {/* Glow blobs */}
      <div style={{ position: 'absolute', width: 340, height: 340, background: 'radial-gradient(circle,rgba(201,162,39,0.12),transparent 70%)', top: -120, left: -120, borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', width: 300, height: 300, background: 'radial-gradient(circle,rgba(201,162,39,0.08),transparent 70%)', bottom: -80, right: -60, borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        {/* Header */}
        <div ref={headingRef}>
          <p style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span style={{ display: 'block', width: 20, height: 1.5, background: 'var(--gold)' }} />
            Why Now?
          </p>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            color: '#ffffff',
            margin: 0,
          }}>
            Why Join{' '}
            <span style={{
              background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Right Now
            </span>
          </h2>
        </div>

        <p ref={subRef} style={{
          fontSize: '0.92rem',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.75,
          marginTop: '1.2rem',
          maxWidth: 500,
        }}>
          The startup ecosystem is exploding in Kerala. Don&apos;t watch from the sidelines.
        </p>

        {/* Reason cards */}
        <div
          ref={gridRef}
          className="why-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginTop: '3.5rem',
          }}
        >
          {reasons.map((r) => (
            <div
              key={r.title}
              className="why-card"
              style={{
                padding: '2rem',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(6px)',
                transition: 'border-color 0.3s, background 0.3s',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.6rem',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(201,162,39,0.35)'
                el.style.background = 'rgba(255,255,255,0.07)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.08)'
                el.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              {/* Title row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <h3 style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.35rem',
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  margin: 0,
                }}>
                  {r.title}
                </h3>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.8rem',
                    lineHeight: 1,
                    color: 'var(--gold)',
                    letterSpacing: '0.04em',
                  }}>
                    {r.stat}
                  </div>
                  <div style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    marginTop: '0.1rem',
                  }}>
                    {r.statLabel}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0.2rem 0' }} />

              {/* Description */}
              <p style={{
                fontSize: '0.82rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p ref={noteRef} style={{
          marginTop: '3rem',
          textAlign: 'center',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.22)',
          textTransform: 'uppercase',
        }}>
          ✦ &nbsp; Every founder you admire had a Day 0. &nbsp;
          <em style={{ color: 'var(--gold-light)', opacity: 0.7, fontStyle: 'normal' }}>This is yours.</em>
          &nbsp; ✦
        </p>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}