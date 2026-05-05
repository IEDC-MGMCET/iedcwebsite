'use client'
import { useEffect, useRef } from 'react'
import { stats, marqueeItems } from '@/data'

function StatCounter({
  value,
  label,
  noAnimation,
}: {
  value: number
  label: string
  noAnimation?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  useEffect(() => {
    if (noAnimation) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true

          const start = performance.now()
          const duration = 2200

          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 3)

            if (ref.current) {
              ref.current.textContent = String(Math.round(ease * value))
            }

            if (progress < 1) requestAnimationFrame(step)
          }

          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, noAnimation])

  return (
    <div style={{ textAlign: 'center' }} className="reveal">
      <div
        ref={ref}
        style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(3rem,5vw,5rem)',
          lineHeight: 1,
          background: 'linear-gradient(135deg,var(--green),var(--gold))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {noAnimation ? `${value}+` : 0}
      </div>

      <div
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--muted-light)',
          marginTop: '0.3rem',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function MarqueeStats() {
  const doubled = [...marqueeItems, ...marqueeItems]

  return (
    <>
      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}
              <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        {stats.map((s) => (
          <StatCounter
            key={s.label}
            value={s.value}
            label={s.label}
            noAnimation={'noAnimation' in s ? s.noAnimation : undefined}
          />
        ))}
      </div>

      <style>{`
        .marquee-wrap {
          overflow: hidden;
          width: 100%;
          background: #2b383e;
          border-top: 1px solid rgba(201,162,39,0.2);
          border-bottom: 1px solid rgba(201,162,39,0.2);
          padding: 0.85rem 0;
          white-space: nowrap;
        }

        .marquee-track {
          display: inline-flex;
          animation: marquee-scroll 28s linear infinite;
          will-change: transform;
        }

        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: "DM Mono", monospace;
          font-size: 0.7rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.55);
          padding: 0 1.8rem;
        }

        .marquee-dot {
          color: var(--gold);
          font-size: 0.5rem;
          opacity: 0.7;
        }

        .stats-section {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          padding: 4.5rem 8vw;
          background: var(--bg2);
          border-top: 1px solid rgba(201,162,39,0.13);
          border-bottom: 1px solid rgba(201,162,39,0.13);
        }
      `}</style>
    </>
  )
}