'use client'

import { CldImage } from 'next-cloudinary'
import RevealWrapper from '@/components/ui/RevealWrapper'
import ExecomCard from '@/components/ui/ExecomCard'
import { execomMembers } from '@/data/execomData'
import { nodalOfficers } from '@/data/nodalOfficersData'

const currentTeam = execomMembers.filter(m => m.isCurrent)
const pastMembers  = execomMembers.filter(m => !m.isCurrent)
const pastYears    = [...new Set(pastMembers.map(m => m.year))].sort((a, b) => b.localeCompare(a))

export default function ExecomClient() {
  return (
    <RevealWrapper>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div
        style={{
          paddingTop: '10rem',
          paddingBottom: '6rem',
          paddingLeft: '8vw',
          paddingRight: '8vw',
          background: 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 50%,#E9EDE5 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle,rgba(14,158,6,.10),transparent 70%)', top: -180, right: '4vw', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, background: 'radial-gradient(circle,rgba(201,162,39,.09),transparent 70%)', bottom: -80, left: '6vw', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p className="section-tag">The People</p>
          <h1
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(3.5rem,7vw,6.5rem)',
              lineHeight: 0.93,
              letterSpacing: '0.04em',
              color: 'var(--text)',
              marginTop: '0.5rem',
            }}
          >
            Executive{' '}
            <span style={{ color: 'var(--gold)' }}>Committee</span>
          </h1>
          <p style={{ marginTop: '1.2rem', fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--muted)', maxWidth: 480, lineHeight: 1.85 }}>
            Meet the team driving innovation, community, and entrepreneurship at IEDC MGMCET.
          </p>
        </div>
      </div>

      {/* ── Nodal Officers ───────────────────────────────────────── */}
      <section style={{ padding: '6rem 8vw 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-light)', whiteSpace: 'nowrap' }}>
              Nodal Officers
            </span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(14,158,6,0.25), transparent)' }} />
          </div>

          <div className="nodal-officers-grid">
            {nodalOfficers.map((nodal) => (
              <div
                key={nodal.id}
                className="reveal nodal-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.8fr',
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: '0 18px 50px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  minHeight: 240,
                }}
              >
                {/* Left */}
                <div
                  style={{
                    background: 'linear-gradient(145deg, rgba(34,197,94,0.18), rgba(201,162,39,0.14))',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2.5rem 2rem',
                    gap: '0.75rem',
                    position: 'relative',
                  }}
                >
                  {/* Round image wrapper */}
                  <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.65)', boxShadow: '0 6px 20px rgba(0,0,0,0.12)', flexShrink: 0 }}>
                    <CldImage
                      src={nodal.image}
                      alt={nodal.name}
                      width={96}
                      height={96}
                      style={{ objectFit: 'cover', objectPosition: 'top center', display: 'block', width: '100%', height: '100%' }}
                    />
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: '#111827' }}>
                      {nodal.name}
                    </div>
                    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginTop: '0.2rem' }}>
                      {nodal.role}
                    </div>
                    {nodal.designation && (
                      <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.12em', color: '#64748b', marginTop: '0.15rem' }}>
                        {nodal.designation}
                      </div>
                    )}
                    {nodal.department && (
                      <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.1em', color: '#94a3b8', marginTop: '0.1rem' }}>
                        {nodal.department}
                      </div>
                    )}
                  </div>

                  <div style={{ position: 'absolute', top: 14, right: 14, fontFamily: '"DM Mono", monospace', fontSize: '0.5rem', letterSpacing: '0.15em', color: '#64748b', background: 'rgba(255,255,255,0.7)', padding: '0.2rem 0.6rem', borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)' }}>
                    {nodal.year}
                  </div>
                </div>

                {/* Right: quote */}
                {nodal.quote && (
                  <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ display: 'block', width: 16, height: 1.5, background: '#16a34a' }} />
                      Vision
                    </div>
                    <blockquote style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: 'clamp(0.88rem,1.4vw,1.05rem)', color: '#111827', lineHeight: 1.8, borderLeft: '3px solid rgba(34,197,94,0.5)', paddingLeft: '1.2rem', margin: 0, fontStyle: 'italic' }}>
                      &quot;{nodal.quote}&quot;
                    </blockquote>
                    <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.56rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#94a3b8' }}>
                      IEDC MGMCET · Batch {nodal.year}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Execom ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 8vw 8rem', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted-light)', whiteSpace: 'nowrap' }}>
              Execom Team · {currentTeam[0]?.year}
            </span>
            <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(14,158,6,0.2), transparent)' }} />
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.15em', color: 'var(--muted-light)', whiteSpace: 'nowrap' }}>
              {currentTeam.length} members
            </span>
          </div>

          <div className="execom-grid">
            {currentTeam.map(m => (
              <ExecomCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>
      {false && (
  <>
    {/* ── Past Execoms ─────────────────────────────────────────── */}
    <section
      style={{
        padding: '7rem 8vw 9rem',
        background: 'var(--bg2)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p className="section-tag reveal">Alumni</p>

        <h2
          className="section-title reveal"
          style={{ marginBottom: '1rem' }}
        >
          Past <span style={{ color: 'var(--gold)' }}>Execoms</span>
        </h2>

        <p
          className="reveal"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '0.9rem',
            color: 'var(--muted)',
            lineHeight: 1.8,
            maxWidth: 480,
            marginBottom: '4rem',
          }}
        >
          Every batch that came before shaped what IEDC MGMCET is today.
          Here are the teams who built the foundation.
        </p>

        {pastYears.map((year) => {
          const batch = pastMembers.filter((m) => m.year === year)

          return (
            <div key={year} style={{ marginBottom: '4rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: '1.4rem',
                    color: 'var(--gold)',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                  }}
                >
                  {year}
                </div>

                <div
                  style={{
                    flex: 1,
                    height: 1,
                    background:
                      'linear-gradient(to right, rgba(201,162,39,0.3), transparent)',
                  }}
                />

                <span
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted-light)',
                    textTransform: 'uppercase',
                  }}
                >
                  {batch.length} member
                  {batch.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="past-execom-grid">
                {batch.map((m) => (
                  <div
                    key={m.id}
                    className="reveal past-card"
                    style={{
                      background: 'rgba(255,255,255,0.6)',
                      border: '1px solid rgba(0,0,0,0.07)',
                      borderRadius: 12,
                      padding: '1.4rem 1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      backdropFilter: 'blur(6px)',
                      transition: 'box-shadow 0.25s, border-color 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 8px 30px rgba(0,0,0,0.08)'
                      e.currentTarget.style.borderColor =
                        'rgba(201,162,39,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = ''
                      e.currentTarget.style.borderColor =
                        'rgba(0,0,0,0.07)'
                    }}
                  >
                    {/* Round image */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0,
                        border: '2px solid rgba(201,162,39,0.2)',
                      }}
                    >
                      <CldImage
                        src={m.image}
                        alt={m.name}
                        width={48}
                        height={48}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'top center',
                          display: 'block',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'Syne, sans-serif',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          color: 'var(--text)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {m.name}
                      </div>

                      <div
                        style={{
                          fontFamily: '"DM Mono", monospace',
                          fontSize: '0.52rem',
                          letterSpacing: '0.1em',
                          color: 'var(--muted-light)',
                          textTransform: 'uppercase',
                          marginTop: '0.2rem',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {m.role}
                      </div>
                    </div>

                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: 'rgba(34,197,94,0.10)',
                          border:
                            '1.5px solid rgba(34,197,94,0.25)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#16a34a',
                          textDecoration: 'none',
                          flexShrink: 0,
                          transition: 'transform 0.2s, background 0.2s',
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  </>
)}
      <style>{`
        .nodal-officers-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 0;
        }
        .nodal-card { grid-template-columns: 1fr 1.8fr; }
        @media (max-width: 640px) {
          .nodal-card { grid-template-columns: 1fr !important; }
        }
        .execom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1.5rem 1.2rem;
        }
        @media (max-width: 480px) {
          .execom-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .past-execom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .past-execom-grid { grid-template-columns: 1fr; }
        }
      `}</style>

    </RevealWrapper>
  )
}