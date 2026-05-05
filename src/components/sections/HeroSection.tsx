'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RippleButton from '@/components/ui/RippleButton'

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const btnsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const nodeCanvasRef = useRef<HTMLCanvasElement>(null)

  // Entrance animations
  useEffect(() => {
    const els = [eyebrowRef.current, headlineRef.current, subRef.current, btnsRef.current, scrollRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = `opacity 0.8s ease ${i * 0.18}s, transform 0.8s ease ${i * 0.18}s`
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 800 + i * 180)
    })
  }, [])

  // Node canvas
  useEffect(() => {
    const canvas = nodeCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }))

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(14,158,6,0.25)'
        ctx.fill()
      })
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 130) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(201,162,39,${0.12 * (1 - d / 130)})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section
      id="hero"
      style={{
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
        background: 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 50%,#E9EDE5 100%)',
        padding: '4rem 8vw 6rem',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* HERO CONTENT */}
        <div
          className="hero-content"
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: 700,
            paddingTop: '5rem',
          }}
        >
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="hero-eyebrow"
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--green)',
              marginBottom: '1.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <span
              style={{
                display: 'block',
                width: 28,
                height: 1.5,
                background: 'var(--green)',
                flexShrink: 0,
              }}
            />
            Innovation &amp; Entrepreneurship Development Centre
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.2rem,8vw,8.5rem)',
              lineHeight: 0.93,
              letterSpacing: '0.04em',
              color: 'var(--text)',
              margin: 0,
            }}
          >
            Build.<br />
            <span style={{ color: 'var(--gold)' }}>Innovate.</span><br />
            <span style={{ color: 'var(--green)' }}>Launch.</span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            className="hero-sub"
            style={{
              marginTop: '2rem',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: 'var(--muted)',
              maxWidth: 440,
            }}
          >
            A launchpad for bold ideas. We turn curious minds into founders —
            through mentorship, community, and relentless execution.
          </p>

          {/* Buttons */}
          <div
            ref={btnsRef}
            className="hero-btns"
            style={{
              marginTop: '2.8rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <RippleButton
              variant="primary"
              onClick={() =>
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Explore Programs
            </RippleButton>

            <Link href="/submit-idea">
              <RippleButton variant="outline">
                Submit Your Idea →
              </RippleButton>
            </Link>
          </div>
        </div>

        {/* HERO IMAGE — desktop only */}
        <div
          className="hero-image"
          style={{
            width: 'clamp(240px, 30vw, 420px)',
            aspectRatio: '4/5',
            flexShrink: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Image
            src="/heroimg.svg"
            alt="Hero Image"
            width={320}
            height={400}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 16,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))',
            }}
          />

          {/* Storyset credit */}
          <a
            href="https://storyset.com/people"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.1em',
              color: 'var(--muted-light)',
              textDecoration: 'none',
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            People illustrations by Storyset
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-image {
            display: none;
          }

          .hero-content {
            padding-top: 3.5rem !important;
            max-width: 100% !important;
          }

          .hero-eyebrow {
            font-size: 0.6rem !important;
            letter-spacing: 0.2em !important;
            flex-wrap: wrap;
            row-gap: 0.4rem;
          }

          .hero-content h1 {
            font-size: clamp(3.4rem, 16vw, 5.5rem) !important;
            line-height: 0.9 !important;
          }

          .hero-sub {
            max-width: 100% !important;
            font-size: 0.95rem !important;
            margin-top: 1.4rem !important;
          }

          .hero-btns {
            margin-top: 2rem !important;
            gap: 0.75rem !important;
          }
        }

        @media (max-width: 480px) {
          .hero-btns {
            flex-direction: column !important;
          }

          .hero-btns a,
          .hero-btns button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}