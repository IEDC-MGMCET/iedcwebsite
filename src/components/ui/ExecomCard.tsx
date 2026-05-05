'use client'
import { useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { ExecomMember } from '@/data'

export default function ExecomCard({ member }: { member: ExecomMember }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="reveal"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/3.8',
        cursor: 'default',
        padding: '6px 6px 0 0',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 6,
          bottom: 6,
          borderRadius: 14,
          background: 'linear-gradient(145deg, rgba(34,197,94,0.18), rgba(201,162,39,0.15))',
          transition: 'transform 0.38s cubic-bezier(0.34,1.4,0.64,1)',
          transform: hovered ? 'translate(3px, -3px)' : 'translate(0,0)',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: 6,
          left: 0,
          right: 6,
          bottom: 0,
          borderRadius: 14,
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #ffffff 0%, #f6f7f2 100%)',
          zIndex: 1,
          transition: 'transform 0.38s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.38s ease',
          transform: hovered ? 'translate(-2px, 3px)' : 'translate(0,0)',
          boxShadow: hovered ? '0 18px 45px rgba(0,0,0,0.12)' : '0 6px 18px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {/* Image */}
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <CldImage
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              filter: hovered ? 'none' : 'saturate(0.85) contrast(0.95) brightness(0.92)',
              transition: 'filter 0.38s ease, transform 0.38s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            padding: '0.75rem 0.9rem',
            background: hovered
              ? 'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(201,162,39,0.10))'
              : '#ffffff',
            transition: 'background 0.35s ease',
          }}
        >
          <div
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.46rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: hovered ? '#16a34a' : '#94a3b8',
              marginBottom: '0.2rem',
            }}
          >
            {member.year}
          </div>

          <div
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: '#111827',
              marginBottom: '0.1rem',
            }}
          >
            {member.name}
          </div>

          <div
            style={{
              fontFamily: '"DM Mono", monospace',
              fontSize: '0.5rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: hovered ? '#ca8a04' : '#64748b',
              marginBottom: hovered ? '0.6rem' : '0',
            }}
          >
            {member.role}
          </div>

          {/* Social Icons */}
          <div
            style={{
              display: 'flex',
              gap: '0.45rem',
              maxHeight: hovered ? '40px' : '0px',
              overflow: 'hidden',
              opacity: hovered ? 1 : 0,
              transition: 'max-height 0.35s ease, opacity 0.3s ease',
            }}
          >
            {/* LinkedIn */}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="LinkedIn"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'rgba(34,197,94,0.10)',
                  border: '1.5px solid rgba(34,197,94,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#16a34a',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}

            {/* GitHub */}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="GitHub"
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'rgba(201,162,39,0.10)',
                  border: '1.5px solid rgba(201,162,39,0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ca8a04',
                  textDecoration: 'none',
                  flexShrink: 0,
                }}
              >
                <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}