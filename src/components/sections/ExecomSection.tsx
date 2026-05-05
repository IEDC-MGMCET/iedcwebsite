'use client'
import Link from 'next/link'
import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import ExecomCard from '@/components/ui/ExecomCard'
import { execomMembers } from '@/data'

const nodal = execomMembers.find(m => m.isNodalOfficer)!
const team = execomMembers.filter(m => m.isCurrent && !m.isNodalOfficer)

export default function ExecomSection() {
  return (
    <section
      id="execom"
      style={{
        padding: '8rem 8vw',
        background: '#F7F7F2',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          <SectionHeader
            tag="The People"
            title={
              <>
                Executive{' '}
                <span style={{ color: 'var(--gold)' }}>Committee</span>
              </>
            }
          />

          <Link
            href="/execom"
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--green)',
              textDecoration: 'none',
              paddingBottom: '0.5rem',
            }}
          >
            View All Members →
          </Link>
        </div>

        {/* Nodal Officer */}
        <div
          className="reveal nodal-card"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.8fr',
            borderRadius: 16,
            overflow: 'hidden',
            marginBottom: '4rem',
            background: '#ffffff',
            boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
            minHeight: 220,
            border: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          {/* Left panel */}
          <div
            style={{
              background: 'linear-gradient(145deg, rgba(43,56,62,0.10), rgba(201,162,39,0.10))',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2.5rem 2rem',
              gap: '0.75rem',
              position: 'relative',
            }}
          >
            <Image
              src={nodal.image}
              alt={nodal.name}
              width={96}
              height={96}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'top center',
                border: '3px solid rgba(255,255,255,0.7)',
                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
              }}
            />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>
                {nodal.name}
              </div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.2rem' }}>
                {nodal.role}
              </div>
            </div>

            {/* Social */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {nodal.linkedin && (
                <a
                  href={nodal.linkedin}
                  aria-label="LinkedIn"
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'rgba(43,56,62,0.08)',
                    border: '1.5px solid rgba(43,56,62,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--green)', textDecoration: 'none',
                    transition: 'transform 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = 'rgba(43,56,62,0.16)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(43,56,62,0.08)' }}
                >
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>

            {/* Year badge */}
            <div style={{
              position: 'absolute', top: 14, right: 14,
              fontFamily: '"DM Mono", monospace', fontSize: '0.52rem',
              letterSpacing: '0.15em', color: 'var(--muted)',
              background: 'rgba(255,255,255,0.7)', padding: '0.2rem 0.6rem',
              borderRadius: 20, border: '1px solid rgba(0,0,0,0.05)',
            }}>
              {nodal.year}
            </div>
          </div>

          {/* Right panel */}
          <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
            <div style={{
              fontFamily: '"DM Mono", monospace', fontSize: '0.58rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <span style={{ display: 'block', width: 16, height: 1.5, background: 'var(--gold)' }} />
              Nodal Officer&apos;s Vision
            </div>

            <blockquote style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 600,
              fontSize: 'clamp(0.9rem,1.5vw,1.1rem)', color: '#334155',
              lineHeight: 1.75, borderLeft: '3px solid var(--green)',
              paddingLeft: '1.2rem', margin: 0, fontStyle: 'italic',
            }}>
              &quot;{nodal.quote}&quot;
            </blockquote>

            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted-light)' }}>
              IEDC MGMCET · Batch {nodal.year}
            </div>
          </div>
        </div>

        {/* Team label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Execom Team · {team[0]?.year}
          </span>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(43,56,62,0.2), transparent)' }} />
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1.8rem 1.2rem' }}>
          {team.map((member) => (
            <ExecomCard key={member.id} member={member} />
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .nodal-card {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}