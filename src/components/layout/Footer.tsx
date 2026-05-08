'use client'
import Link from 'next/link'
import Image from 'next/image'
import { FiLinkedin, FiInstagram, FiGithub, FiMail, FiMapPin } from 'react-icons/fi'

const quickLinks = [
  { label: 'Journey', href: '/#journey' },
  { label: 'Programs', href: '/#features' },
  { label: 'Events', href: '/events' },
  { label: 'Team', href: '/execom' },
  { label: 'Submit Idea', href: '/submit-idea' },
  { label: 'Startup Handbook', href: '/handbook' },
]

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/iedc-mgmcet/',
    icon: <FiLinkedin size={15} />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/mgmcet_iedc',
    icon: <FiInstagram size={15} />,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/IEDC-MGMCET/',
    icon: <FiGithub size={15} />,
  },
  {
    label: 'iedc@mgmcet.ac.in',
    href: 'mailto:iedc@mgmcet.ac.in',
    icon: <FiMail size={15} />,
  },
]

export default function Footer() {
  return (
    <>
      <div className="glow-divider" />

      <footer style={{
        background: 'var(--green)',
        padding: '5rem 8vw 0',
        boxSizing: 'border-box',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', width: 360, height: 360,
          background: 'radial-gradient(circle, rgba(201,162,39,0.07), transparent 70%)',
          top: -80, right: -80, borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* ── MAIN GRID ── */}
          <div className="footer-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1.8fr 1fr 1fr',
            gap: '4rem',
            paddingBottom: '4rem',
          }}>

            {/* Brand */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
                <Image src="/IEDC_logo.png" alt="IEDC MGMCET" width={40} height={40} style={{ display: 'block' }} />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', letterSpacing: '0.08em', color: '#fff' }}>
                    IEDC MGMCET
                  </span>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)' }}>
                    Innovation Cell
                  </span>
                </div>
              </Link>

              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.62)', lineHeight: 1.8, maxWidth: 280, margin: 0 }}>
                Fostering innovation and entrepreneurship at MGM College of Engineering and Technology.
              </p>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.52)' }}>
                <FiMapPin size={12} style={{ marginTop: '0.15rem', flexShrink: 0, color: 'var(--gold)', opacity: 0.7 }} />
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.1em', lineHeight: 1.6 }}>
                  Pampakuda, Ernakulam<br />Kerala, India
                </span>
              </div>

              {/* Social icons row */}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.4rem' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: 34, height: 34,
                      borderRadius: 8,
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none',
                      transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--gold)'
                      e.currentTarget.style.borderColor = 'rgba(201,162,39,0.4)'
                      e.currentTarget.style.background = 'rgba(201,162,39,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                      e.currentTarget.style.background = 'transparent'
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.58rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--gold)', margin: '0 0 1.4rem',
              }}>
                Pages
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {quickLinks.map(l => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s', fontFamily: 'Syne, sans-serif' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <p style={{
                fontFamily: '"DM Mono", monospace', fontSize: '0.58rem',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--gold)', margin: '0 0 1.4rem',
              }}>
                Connect
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {socials.map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.6rem',
                      fontSize: '0.86rem', color: 'rgba(255,255,255,0.7)',
                      textDecoration: 'none', transition: 'color 0.2s',
                      fontFamily: 'Syne, sans-serif',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  >
                    <span style={{ opacity: 0.6, flexShrink: 0 }}>{s.icon}</span>
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.15)',
            padding: '1.5rem 0',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem',
          }}>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase' }}>
              © 2026 IEDC MGMCET · All rights reserved
            </p>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: 0, textTransform: 'uppercase' }}>
              Made with <span style={{ color: 'var(--gold)' }}>♥</span> by IEDC Execom 26–27
            </p>
          </div>

        </div>
      </footer>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}