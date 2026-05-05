'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function NotFoundContent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = containerRef.current?.querySelectorAll('.anim')
    els?.forEach((el, i) => {
      const e = el as HTMLElement
      e.style.opacity = '0'
      e.style.transform = 'translateY(24px)'
      e.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`
      setTimeout(() => {
        e.style.opacity = '1'
        e.style.transform = 'translateY(0)'
      }, 100 + i * 120)
    })
  }, [])

  return (
    <main
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: 'var(--green)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 8vw',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(201,162,39,0.1), transparent 65%)',
        top: -150, right: -150, borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 65%)',
        bottom: -100, left: -100, borderRadius: '50%',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, width: '100%' }}>

        {/* Logo */}
        <div className="anim" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}>
            <Image src="/IEDC_logo.png" alt="IEDC MGMCET" width={36} height={36} style={{ display: 'block' }} />
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)' }}>
              IEDC MGMCET
            </span>
          </Link>
        </div>

        {/* SVG hero — drop your file at /public/404.svg */}
        <div className="anim" style={{
          width: '100%',
          maxWidth: 360,
          margin: '0 auto 2.5rem',
          aspectRatio: '4/3',
          position: 'relative',
        }}>
          <Image
            src="/404.svg"
            alt="404 illustration"
            fill
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))', animation: 'floatSvg 5s ease-in-out infinite' }}
          />
        </div>
    

        {/* Headline */}
        <h1 className="anim" style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(2.2rem, 6vw, 3.8rem)',
          letterSpacing: '0.05em',
          lineHeight: 1,
          color: '#fff',
          margin: '1rem 0 0',
        }}>
          Looks like you got<br />
          <span style={{
            background: 'linear-gradient(90deg, var(--gold), var(--gold-light))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            lost in the launch
          </span>
        </h1>

        {/* Subtext */}
        <p className="anim" style={{
          fontSize: '0.92rem',
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.75,
          marginTop: '1.2rem',
          maxWidth: 420,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          The page you&apos;re looking for doesn&apos;t exist — or maybe it&apos;s still being built.
          Either way, let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div className="anim" style={{
          marginTop: '2.5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          <Link href="/" style={{
            padding: '0.85rem 2rem',
            background: 'var(--gold)',
            color: '#fff',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 5,
            transition: 'transform 0.25s, box-shadow 0.25s',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px var(--gold-glow)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
          >
            ← Back to Home
          </Link>

          <Link href="/events" style={{
            padding: '0.85rem 2rem',
            background: 'transparent',
            color: 'rgba(255,255,255,0.7)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.78rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            borderRadius: 5,
            border: '1.5px solid rgba(255,255,255,0.2)',
            transition: 'transform 0.25s, border-color 0.25s, color 0.25s',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.45)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            View Events
          </Link>
        </div>

        {/* Bottom note */}
        <p className="anim" style={{
          marginTop: '4rem',
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}>
          ✦ &nbsp; Every founder had a wrong turn. &nbsp;
          <span style={{ color: 'rgba(201,162,39,0.6)' }}>Yours just led here.</span>
          &nbsp; ✦
        </p>
      </div>

      <style>{`
        @keyframes floatSvg {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </main>
  )
}