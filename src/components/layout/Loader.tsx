'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let fadeTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>

    const dismiss = () => {
      if (fading) return
      setFading(true)
      hideTimer = setTimeout(() => setVisible(false), 700)
    }

    fadeTimer = setTimeout(dismiss, 1600)

    if (document.readyState === 'complete') {
      dismiss()
    } else {
      window.addEventListener('load', dismiss, { once: true })
    }

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
      window.removeEventListener('load', dismiss)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!visible) return null

  return (
    <div
      id="loader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: fading ? 0 : 1,
        visibility: fading ? 'hidden' : 'visible',
        transition: 'opacity 0.7s ease, visibility 0.7s ease',
        pointerEvents: fading ? 'none' : 'all',
        touchAction: 'none',
        overflow: 'hidden',
      }}
    >

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem' }}>

        {/* Logo + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', animation: 'loaderFadeUp 0.6s ease forwards', opacity: 0 }}>
          <Image
            src="/IEDC_logo.png"
            alt="IEDC"
            width={44}
            height={44}
            style={{ display: 'block', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
            <span style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: '1.6rem',
              letterSpacing: '0.1em',
              color: 'var(--text)',
            }}>
              IEDC MGMCET
            </span>
            <span style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--muted-light)',
            }}>
              Innovation Cell
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{
          width: 180,
          height: 2,
          background: 'rgba(0,0,0,0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          animation: 'loaderFadeUp 0.6s ease 0.15s forwards',
          opacity: 0,
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            borderRadius: 2,
            animation: 'loaderBar 1.4s ease forwards',
            width: 0,
          }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: 'var(--muted-light)',
          margin: 0,
          animation: 'loaderFadeUp 0.6s ease 0.3s forwards',
          opacity: 0,
        }}>
          Pampakuda · Kerala
        </p>
      </div>

      <style>{`
        @keyframes loaderFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderBar {
          0%   { width: 0%; }
          60%  { width: 80%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  )
}