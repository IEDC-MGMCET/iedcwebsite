'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin/dashboard')
    } catch (err: any) {
      console.error(err)
      setError("Invalid email or password")
    }

    setLoading(false)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--green)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,162,39,0.1), transparent 65%)', top: -100, right: -100, borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '3rem 2.5rem',
        width: '100%',
        maxWidth: 420,
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '2.5rem' }}>
          <Image src="/IEDC_logo.png" alt="IEDC" width={36} height={36} />
          <div>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.2rem', letterSpacing: '0.08em', color: 'var(--text)' }}>IEDC MGMCET</div>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-light)' }}>Admin Panel</div>
          </div>
        </div>

        <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', letterSpacing: '0.05em', color: 'var(--text)', marginBottom: '0.4rem' }}>Sign In</h1>
        <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.12em', color: 'var(--muted-light)', textTransform: 'uppercase', marginBottom: '2rem' }}>
          Restricted access · Authorised personnel only
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: '0.85rem 1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = 'var(--green)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ padding: '0.85rem 1rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = 'var(--green)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
            />
          </div>

          {error && (
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.8rem', color: '#dc2626', background: 'rgba(239,68,68,0.08)', padding: '0.6rem 0.9rem', borderRadius: 6, margin: 0 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} style={{
            marginTop: '0.5rem',
            padding: '0.95rem',
            background: loading ? 'rgba(43,56,62,0.5)' : 'var(--green)',
            color: '#fff',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: '0.82rem',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: 8,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s',
          }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </div>
    </main>
  )
}