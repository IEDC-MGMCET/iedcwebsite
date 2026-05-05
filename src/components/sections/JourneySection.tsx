'use client'
import SectionHeader from '@/components/ui/SectionHeader'
import { journeySteps } from '@/data'

const icons = [
  <svg key="0" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  <svg key="1" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  <svg key="2" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
  <svg key="3" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
]

export default function JourneySection() {
  return (
    <section
      id="journey"
      style={{
        padding: '8rem 8vw',
        background: 'var(--bg)',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Inner container — matches navbar/hero maxWidth */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <SectionHeader tag="Your Path" title={<>The Startup <span style={{ color: 'var(--gold)' }}>Journey</span></>} />

        <div style={{ position: 'relative', marginTop: '4rem' }}>
          {/* Connector line */}
          <div style={{
            position: 'absolute', top: 42, left: 'calc(12.5% + 10px)', right: 'calc(12.5% + 10px)',
            height: 2, zIndex: 1, overflow: 'hidden',
          }} className="journey-connector-hide-mobile">
            <div className="journey-connector-track" />
          </div>

          {/* Connector dots */}
          <div style={{
            position: 'absolute', top: 38, left: 'calc(12.5% + 10px)', right: 'calc(12.5% + 10px)',
            display: 'flex', justifyContent: 'space-between',
          }} className="journey-connector-hide-mobile">
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', border: '2px solid #fff', boxShadow: '0 0 8px var(--gold-glow)' }} />
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1.4rem',
              position: 'relative',
              zIndex: 2,
            }}
            className="journey-grid"
          >
            {journeySteps.map((step, i) => (
              <div
                key={step.num}
                className="card journey-card reveal"
                style={{ padding: '2.5rem 1.8rem', position: 'relative', overflow: 'hidden', transformStyle: 'preserve-3d', willChange: 'transform' }}
              >
                <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '5.5rem', lineHeight: 1, color: 'rgba(14,158,6,0.06)', position: 'absolute', top: '0.5rem', right: '1rem', transition: 'color 0.4s' }}>
                  {step.num}
                </span>
                <div style={{
                  width: 44, height: 44, background: 'rgba(14,158,6,0.1)', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.3rem', color: 'var(--green)', transition: 'background 0.3s, transform 0.3s',
                }}>
                  {icons[i]}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text)' }}>{step.title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .journey-grid { grid-template-columns: 1fr 1fr !important; }
          .journey-connector-hide-mobile { display: none !important; }
        }
        @media (max-width: 520px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}