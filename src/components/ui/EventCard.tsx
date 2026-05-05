'use client'
import { useState } from 'react'
import { Event } from '@/data'
import EventModal from './EventModal'

export default function EventCard({ event, animClass = 'reveal' }: { event: Event; animClass?: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className={`event-card-new ${animClass}`}
        onClick={() => setOpen(true)}
        style={{
          background: '#f5f5ec',
          border: '1px solid rgba(0,0,0,0.07)',
          borderRadius: 16,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.25s, box-shadow 0.25s',
          position: 'relative',
        }}
        onMouseEnter={e => {
          const t = e.currentTarget
          t.style.transform = 'translateY(-4px)'
          t.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
        }}
        onMouseLeave={e => {
          const t = e.currentTarget
          t.style.transform = ''
          t.style.boxShadow = ''
        }}
      >
        {/* Tag badge — top right */}
        <div style={{
          position: 'absolute', top: 14, right: 14, zIndex: 2,
          background: event.tagColor, color: event.tagTextColor,
          padding: '0.22rem 0.75rem', borderRadius: 20,
          fontSize: '0.65rem', fontWeight: 700,
          fontFamily: 'Syne, sans-serif', letterSpacing: '0.04em',
        }}>
          {event.tag}
        </div>

        {/* Top banner with calendar */}
        <div style={{
          height: 130,
          background: 'linear-gradient(135deg, #e8eed8 0%, #dce8c8 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* iOS-style calendar icon */}
          <div style={{
            width: 64, height: 68,
            borderRadius: 10,
            overflow: 'hidden',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Red header */}
            <div style={{
              background: '#e53935',
              height: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <span style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {event.month}
              </span>
              {/* binding rings */}
              <div style={{ position: 'absolute', left: 14, top: -3, width: 4, height: 8, background: '#b71c1c', borderRadius: 2 }} />
              <div style={{ position: 'absolute', right: 14, top: -3, width: 4, height: 8, background: '#b71c1c', borderRadius: 2 }} />
            </div>
            {/* White body with day */}
            <div style={{
              flex: 1, background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.8rem', color: '#1c1c1a', lineHeight: 1 }}>
                {event.day}
              </span>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1.1rem 1.2rem 1.4rem' }}>
          <h3 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.15rem', letterSpacing: '0.06em',
            color: '#1c1c1a', marginBottom: '0.4rem', lineHeight: 1.2,
          }}>
            {event.shortTitle}
          </h3>

          {/* Date + venue */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            fontSize: '0.72rem', color: '#888', marginBottom: '0.8rem',
            fontFamily: '"DM Mono", monospace',
          }}>
            <span style={{
              background: 'rgba(0,0,0,0.07)', padding: '0.1rem 0.5rem',
              borderRadius: 4, fontSize: '0.65rem',
            }}>
              {event.day} {event.month} {event.year}
            </span>
            <span>•</span>
            <span>{event.venue}</span>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#666', lineHeight: 1.6 }}>
            {event.description}
          </p>

          <div style={{
            marginTop: '1rem',
            fontSize: '0.72rem', color: 'var(--green)',
            fontWeight: 700, fontFamily: 'Syne, sans-serif',
            display: 'flex', alignItems: 'center', gap: '0.3rem',
          }}>
            View Details <span>›</span>
          </div>
        </div>
      </div>

      {open && <EventModal event={event} onClose={() => setOpen(false)} />}
    </>
  )
}
