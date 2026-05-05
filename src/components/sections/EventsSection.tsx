'use client'
import Link from 'next/link'
import EventCard from '@/components/ui/EventCard'
import { events } from '@/data'

export default function EventsSection() {
  const preview = events.slice(0, 4)

  return (
    <section
      id="events"
      style={{
        padding: '8rem 8vw',
        background: 'var(--bg2)',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div>
            <span
              style={{
                fontFamily: '"DM Mono", monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.35em',
                color: 'var(--green)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              What&apos;s Happening
            </span>

            <h2
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                lineHeight: 1,
                margin: 0,
              }}
            >
              <span style={{ color: 'var(--text)' }}>OUR </span>
              <span style={{ color: 'var(--gold)' }}>EVENTS</span>
            </h2>
          </div>

          <Link
            href="/events"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 600,
              color: 'var(--gold)',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              fontSize: '0.82rem',
              letterSpacing: '0.08em',
            }}
          >
            View All Events →
          </Link>
        </div>

        {/* GRID */}
        <div
          className="events-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {preview.map((event) => (
            <EventCard
              key={event.id}
              event={{ ...event }}
              animClass="reveal"
            />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 1100px) {
          .events-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .events-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}