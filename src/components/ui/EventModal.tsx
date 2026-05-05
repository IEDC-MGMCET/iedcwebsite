'use client'
import { useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { Event } from '@/data'

export default function EventModal({ event, onClose }: { event: Event; onClose: () => void }) {
  useLayoutEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const modal = (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 99000,
        background: 'rgba(26,34,36,0.82)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeInOverlay 0.2s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: 16,
          width: '100%', maxWidth: 500,
          overflow: 'hidden',
          position: 'relative',
          animation: 'slideUpModal 0.28s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12, zIndex: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(0,0,0,0.08)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', color: '#333',
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'transform 0.2s, background 0.2s',
            fontFamily: 'Syne, sans-serif',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#f0f0f0' }}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.background = 'rgba(255,255,255,0.95)' }}
        >
          ✕
        </button>

        {/* Hero banner */}
        <div style={{
          height: 160,
          background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 50%, #1a2224 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />
          <div style={{
            width: 72, height: 76, borderRadius: 12, overflow: 'hidden',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
            display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1,
          }}>
            <div style={{
              background: 'var(--gold)', height: 22,
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <span style={{ color: '#fff', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {event.month}
              </span>
              <div style={{ position: 'absolute', left: 14, top: -3, width: 4, height: 8, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }} />
              <div style={{ position: 'absolute', right: 14, top: -3, width: 4, height: 8, background: 'rgba(0,0,0,0.2)', borderRadius: 2 }} />
            </div>
            <div style={{ flex: 1, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', color: 'var(--text)', lineHeight: 1 }}>
                {event.day}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.6rem 1.8rem 2rem' }}>
          <div style={{ marginBottom: '0.8rem' }}>
            <span style={{
              background: event.tagColor || 'rgba(43,56,62,0.1)',
              color: event.tagTextColor || 'var(--green)',
              padding: '0.25rem 0.85rem', borderRadius: 20,
              fontSize: '0.65rem', fontWeight: 700,
              fontFamily: 'Syne, sans-serif', letterSpacing: '0.06em',
            }}>
              {event.tag}
            </span>
          </div>

          <h2 style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: '1.9rem', letterSpacing: '0.05em',
            color: 'var(--text)', marginBottom: '1.2rem', lineHeight: 1.1,
          }}>
            {event.shortTitle}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginBottom: '1.4rem' }}>
            {[
              { label: 'Date', value: `${event.day} ${event.month} ${event.year}` },
              { label: 'Venue', value: event.venue || 'TBA' },
            ].map(({ label, value }) => (
              <div key={label} style={{ background: 'var(--bg2)', borderRadius: 8, padding: '0.8rem 1rem', border: '1px solid var(--bg3)' }}>
                <div style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-light)', fontFamily: '"DM Mono", monospace', marginBottom: '0.3rem' }}>
                  {label}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text)', fontFamily: 'Syne, sans-serif' }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1.6rem' }}>
            <h4 style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.58rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--green)', marginBottom: '0.6rem',
              display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ display: 'block', width: 14, height: 1.5, background: 'var(--green)' }} />
              About The Event
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.75 }}>
              {event.details || event.description || 'More details coming soon.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button style={{
              flex: 1, padding: '0.85rem',
              background: 'var(--green)', color: '#fff', fontWeight: 700,
              fontSize: '0.78rem', letterSpacing: '0.12em',
              border: 'none', borderRadius: 6, cursor: 'pointer',
              fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
              transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.background = 'var(--green-dark)'; t.style.transform = 'translateY(-2px)'; t.style.boxShadow = '0 8px 24px var(--green-glow)' }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.background = 'var(--green)'; t.style.transform = ''; t.style.boxShadow = '' }}
            >
              Register Now →
            </button>
            <button onClick={onClose} style={{
              padding: '0.85rem 1.4rem', background: 'transparent',
              color: 'var(--muted)', fontWeight: 600, fontSize: '0.78rem',
              letterSpacing: '0.08em', border: '1.5px solid var(--bg3)',
              borderRadius: 6, cursor: 'pointer',
              fontFamily: 'Syne, sans-serif', textTransform: 'uppercase',
              transition: 'border-color 0.2s, color 0.2s',
            }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.borderColor = 'var(--muted-light)'; t.style.color = 'var(--text)' }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.borderColor = 'var(--bg3)'; t.style.color = 'var(--muted)' }}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(24px) scale(0.97) }
          to   { opacity: 1; transform: translateY(0) scale(1) }
        }
      `}</style>
    </div>
  )

  return createPortal(modal, document.body)
}