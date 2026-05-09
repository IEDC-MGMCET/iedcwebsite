'use client'

import Link from 'next/link'
import Image from 'next/image'

import SectionHeader from '@/components/ui/SectionHeader'
import ExecomCard from '@/components/ui/ExecomCard'
import { execomMembers } from '@/data/execomData'
import { nodalOfficers } from '@/data/nodalOfficersData'
import { cImg } from '@/lib/cloudinary'

const team = execomMembers.filter((m) => m.isCurrent)

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
                <span style={{ color: 'var(--gold)' }}>
                  Committee
                </span>
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

        {/* Nodal Officers — side by side */}
        <div
          className="nodal-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}
        >
          {nodalOfficers.map((nodal) => (
            <div
              key={nodal.id}
              className="reveal nodal-card"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                borderRadius: 16,
                overflow: 'hidden',
                background: '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {/* Top: identity */}
              <div
                style={{
                  background:
                    'linear-gradient(145deg, rgba(43,56,62,0.10), rgba(201,162,39,0.10))',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '1.8rem 2rem',
                  gap: '1.2rem',
                  position: 'relative',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div
  style={{
    width: 100,
    height: 100,
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    border: '3px solid rgba(255,255,255,0.7)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
  }}
>
  <Image
    src={cImg(nodal.image)}
    alt={nodal.name}
    width={100}
    height={100}
    unoptimized
    style={{
      objectFit: 'cover',
      objectPosition: 'top center',
      display: 'block',
    }}
  />
</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Name */}
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      color: 'var(--text)',
                    }}
                  >
                    {nodal.name}
                  </div>

                  {/* IEDC Role */}
                  <div
                    style={{
                      fontFamily: '"DM Mono", monospace',
                      fontSize: '0.52rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--gold)',
                      marginTop: '0.2rem',
                    }}
                  >
                    {nodal.role}
                  </div>

                  {/* Designation */}
                  {nodal.designation && (
                    <div
                      style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '0.5rem',
                        letterSpacing: '0.12em',
                        color: 'var(--muted)',
                        marginTop: '0.18rem',
                      }}
                    >
                      {nodal.designation}
                    </div>
                  )}

                  {/* Department */}
                  {nodal.department && (
                    <div
                      style={{
                        fontFamily: '"DM Mono", monospace',
                        fontSize: '0.48rem',
                        letterSpacing: '0.1em',
                        color: 'var(--muted-light)',
                        marginTop: '0.12rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {nodal.department}
                    </div>
                  )}

                  {/* Social */}
                  <div style={{ display: 'flex', gap: '0.45rem', marginTop: '0.65rem' }}>
                    </div>
                </div>

                {/* Year badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    color: 'var(--muted)',
                    background: 'rgba(255,255,255,0.7)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: 20,
                    border: '1px solid rgba(0,0,0,0.05)',
                  }}
                >
                  {nodal.year}
                </div>
              </div>

              {/* Bottom: quote */}
              <div
                style={{
                  padding: '1.6rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.55rem',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      width: 14,
                      height: 1.5,
                      background: 'var(--gold)',
                    }}
                  />
                  Vision
                </div>

                <blockquote
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(0.78rem,1.2vw,0.9rem)',
                    color: '#334155',
                    lineHeight: 1.75,
                    borderLeft: '3px solid var(--green)',
                    paddingLeft: '1rem',
                    margin: 0,
                    fontStyle: 'italic',
                  }}
                >
                  &quot;{nodal.quote}&quot;
                </blockquote>

                <div
                  style={{
                    fontFamily: '"DM Mono", monospace',
                    fontSize: '0.52rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--muted-light)',
                  }}
                >
                  IEDC MGMCET · Batch {nodal.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <span
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Execom Team · {team[0]?.year}
          </span>

          <div
            style={{
              flex: 1,
              height: 1,
              background:
                'linear-gradient(to right, rgba(43,56,62,0.2), transparent)',
            }}
          />
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '1.8rem 1.2rem',
          }}
          className="execom-team-grid"
        >
          {team.map((member) => (
            <ExecomCard
              key={member.id}
              member={member}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .nodal-grid {
            grid-template-columns: 1fr !important;
          }
          .execom-team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem 0.8rem !important;
          }
        }
      `}</style>
    </section>
  )
}