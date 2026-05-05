'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Journey', href: '/#journey' },
  { label: 'Programs', href: '/#features' },
  { label: 'Team', href: '/execom' },
  { label: 'Events', href: '/events' },
  { label: 'Idea Gen', href: '/#idea-gen' },
  { label: 'Apply', href: '/submit-idea' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '0.9rem 8vw' : '1.2rem 8vw', // ✅ aligned with sections
          display: 'flex',
          justifyContent: 'center',
          background: scrolled
            ? '#ffffff'
            : 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 50%,#E9EDE5 100%)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}>
            <Image src="/IEDC_logo.png" alt="IEDC MGMCET" width={38} height={38} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: '1.3rem',
                  letterSpacing: '0.06em',
                  color: 'var(--text)',
                }}
              >
                IEDC MGMCET
              </span>
              <span
                style={{
                  fontFamily: '"DM Mono", monospace',
                  fontSize: '0.52rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-light)',
                }}
              >
                Innovation Cell
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul
            className="nav-links"
            style={{
              display: 'flex',
              gap: '2.2rem',
              listStyle: 'none',
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 600,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Link
            href="/submit-idea"
            className="desktop-cta"
            style={{
              padding: '0.55rem 1.2rem',
              background: 'var(--green)', // ✅ green button
              color: '#fff',
              borderRadius: '6px',
              fontFamily: 'Syne, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--green-dark)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--green)'
            }}
          >
            Submit Idea
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`hamburger ${menuOpen ? 'open' : ''}`}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            background: '#ffffff',
            padding: '2rem 8vw',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: '1rem',
                color: 'var(--text)',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/submit-idea"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '1rem',
              padding: '0.8rem 1.2rem',
              background: 'var(--green)', // ✅ green mobile button
              color: '#fff',
              borderRadius: '6px',
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Submit Idea
          </Link>
        </div>
      )}

      <style>{`
        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: #333;
          transition: all 0.3s ease;
          display: block;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        @media (max-width: 1029px) {
          .nav-links {
            display: none !important;
          }
          .desktop-cta {
            display: none;
          }
          .hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  )
}