'use client'
import { useState } from 'react'
import RevealWrapper from '@/components/ui/RevealWrapper'
import EventCard from '@/components/ui/EventCard'
import { events } from '@/data/eventsData'

const ALL_TAGS = ['All', ...Array.from(new Set(events.map(e => e.tag)))]

export default function EventsClient() {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All'
    ? events
    : events.filter(e => e.tag === activeTag)

  return (
    <RevealWrapper>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div
        style={{
          paddingTop: '11rem',
          paddingBottom: '5rem',
          paddingLeft: '8vw',
          paddingRight: '8vw',
          background: 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 50%,#E9EDE5 100%)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', width: 600, height: 600,
          background: 'radial-gradient(circle,rgba(201,162,39,.12),transparent 70%)',
          top: -250, right: '5vw', borderRadius: '50%', filter: 'blur(100px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400,
          background: 'radial-gradient(circle,rgba(14,158,6,.07),transparent 70%)',
          bottom: -100, left: '3vw', borderRadius: '50%', filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="section-tag" style={{ justifyContent: 'center' }}>
            What&apos;s Happening
          </p>

          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.8rem,7vw,6.5rem)',
              lineHeight: 0.92,
              letterSpacing: '0.04em',
              color: 'var(--text)',
              marginTop: '0.6rem',
            }}
          >
            Our <span style={{ color: 'var(--gold)' }}>Events</span>
          </h1>

          <p
            style={{
              marginTop: '1.4rem',
              fontFamily: 'Syne, sans-serif',
              fontSize: '1rem',
              color: 'var(--muted)',
              maxWidth: 520,
              lineHeight: 1.85,
              margin: '1.4rem auto 0',
            }}
          >
            Workshops, hackathons, pitch nights, and more. Find your next opportunity to learn, build, and grow.
          </p>

          {/* ── Filter Pills ── */}
          <div
            style={{
              display: 'flex',
              gap: '0.55rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: '2.8rem',
            }}
          >
            {ALL_TAGS.map(tag => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  style={{
                    padding: '0.5rem 1.4rem',
                    borderRadius: 999,
                    border: '1.5px solid',
                    borderColor: isActive ? 'transparent' : 'rgba(0,0,0,0.11)',
                    background: isActive
                      ? 'linear-gradient(90deg, var(--green-dark), var(--green))'
                      : 'rgba(255,255,255,0.8)',
                    color: isActive ? '#fff' : 'var(--muted)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    fontFamily: 'Syne, sans-serif',
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    transition: 'all 0.22s ease',
                    boxShadow: isActive
                      ? '0 6px 20px rgba(14,158,6,0.28)'
                      : '0 1px 4px rgba(0,0,0,0.05)',
                    backdropFilter: 'blur(8px)',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      const t = e.currentTarget
                      t.style.borderColor = 'rgba(14,158,6,0.35)'
                      t.style.color = 'var(--green)'
                      t.style.background = 'rgba(14,158,6,0.05)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      const t = e.currentTarget
                      t.style.borderColor = 'rgba(0,0,0,0.11)'
                      t.style.color = 'var(--muted)'
                      t.style.background = 'rgba(255,255,255,0.8)'
                    }
                  }}
                >
                  {tag}
                </button>
              )
            })}
          </div>

          {/* Live count */}
          <p
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted-light)',
              marginTop: '1.2rem',
            }}
          >
            {filtered.length} event{filtered.length !== 1 ? 's' : ''} · {activeTag === 'All' ? 'All categories' : activeTag}
          </p>
        </div>
      </div>

      {/* ── Events Grid ──────────────────────────────────────────── */}
      <section
        style={{
          padding: '5rem 8vw 10rem',
          paddingTop: '0',
          background: 'var(--bg2)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '6rem 0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>🔍</span>
              <p
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: '1rem',
                  color: 'var(--text)',
                }}
              >
                No events in this category yet
              </p>
              <p
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  color: 'var(--muted-light)',
                  textTransform: 'uppercase',
                }}
              >
                Check back soon or browse all events
              </p>
              <button
                onClick={() => setActiveTag('All')}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.6rem 1.6rem',
                  borderRadius: 999,
                  border: '1.5px solid rgba(14,158,6,0.3)',
                  background: 'none',
                  color: 'var(--green)',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                Show All Events
              </button>
            </div>
          ) : (
            <div className="events-page-grid" key={activeTag}>
              {filtered.map((event, i) => (
                <div
                  key={event.id}
                  style={{
                    animation: `cardFadeIn 0.4s ease both`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Force cards visible — EventCard applies reveal classes internally
           which start at opacity:0. We bypass the observer and let
           cardFadeIn handle the entrance animation instead. */
        .events-page-grid *[class],
        .events-page-grid > div > * {
          opacity: 1 !important;
          transform: none !important;
          transition: none !important;
          visibility: visible !important;
        }

        .events-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .events-page-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .events-page-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </RevealWrapper>
  )
}