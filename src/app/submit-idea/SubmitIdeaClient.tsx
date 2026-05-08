'use client'
import { useState, useRef, useCallback, forwardRef } from 'react'
import Link from 'next/link'
import RevealWrapper from '@/components/ui/RevealWrapper'
import { ideaPrompts } from '@/data'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'


// ─── Constants ────────────────────────────────────────────────────────────────
const domains = [
  'Artificial Intelligence / ML', 'FinTech', 'HealthTech', 'EdTech',
  'CleanTech / Sustainability', 'AgriTech', 'Logistics & Supply Chain',
  'SaaS / B2B', 'Consumer / D2C', 'Deep Tech / Hardware', 'Social Impact', 'Other',
]
const stages = [
  'Just an idea (no prototype)', 'Validated concept (user research done)',
  'Early prototype / MVP', 'Beta with early users', 'Revenue generating',
]
const teamSizes = ['Solo Founder', '2 members', '3 members', '4–6 members', '7+ members']

const whyItems = [
  { icon: '🧭', label: 'Mentorship', title: 'Expert Mentorship', desc: 'Get paired with experienced founders, investors, and domain experts who will actively guide your journey from idea to execution.', accent: 'var(--green)' },
  { icon: '🛠', label: 'Resources', title: 'Lab & Infrastructure', desc: 'Access our innovation lab, cloud credits, prototyping tools, and a dedicated co-working space available round the clock.', accent: 'var(--gold)' },
  { icon: '🚀', label: 'Launchpad', title: 'Demo Days & Pitches', desc: 'Pitch at hackathons, investor connects, and demo days across Kerala and beyond throughout the academic year.', accent: 'var(--green)' },
  { icon: '🤝', label: 'Network', title: 'Builder Community', desc: 'Join an alumni network of builders, designers, and founders spanning every batch — your co-founder might be one message away.', accent: 'var(--gold)' },
]
const steps = [
  { n: '01', label: 'Submit', desc: 'Fill out this form with your idea details.' },
  { n: '02', label: 'Review', desc: 'Our team reviews your submission in 3–5 days.' },
  { n: '03', label: 'Connect', desc: 'We reach out and schedule a quick intro call.' },
  { n: '04', label: 'Build', desc: 'You get access to resources, mentors, and the lab.' },
]

// ─── File Drop Zone ────────────────────────────────────────────────────────────
function FileDropZone({ id, label, accept, hint, icon, file, onChange }: {
  id: string; label: string; accept: string; hint: string; icon: string
  file: File | null; onChange: (f: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]; if (f) onChange(f)
  }, [onChange])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label htmlFor={id} style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `1.5px dashed ${dragging ? 'var(--green)' : file ? 'rgba(43,56,62,0.45)' : 'rgba(0,0,0,0.12)'}`,
          borderRadius: 10, padding: '1.6rem 1.5rem', cursor: 'pointer',
          background: dragging ? 'rgba(43,56,62,0.04)' : file ? 'rgba(43,56,62,0.03)' : 'rgba(255,255,255,0.6)',
          transition: 'border-color 0.25s, background 0.25s',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}
      >
        <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{file ? '✅' : icon}</span>
        <div>
          <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: file ? 'var(--green-dark)' : 'var(--text)', margin: 0 }}>
            {file ? file.name : 'Drop file here or click to browse'}
          </p>
          <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', color: 'var(--muted-light)', letterSpacing: '0.08em', marginTop: '0.3rem' }}>
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : hint}
          </p>
        </div>
        {file && (
          <button onClick={e => { e.stopPropagation(); onChange(null) }}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-light)', fontSize: '1.1rem', lineHeight: 1, padding: '0.2rem' }}
            aria-label="Remove file">×</button>
        )}
      </div>
      <input ref={inputRef} id={id} type="file" accept={accept} style={{ display: 'none' }} onChange={e => onChange(e.target.files?.[0] ?? null)} />
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function SubmitIdeaClient() {
  const Formdisabled = useState(true);
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [generatedIdea, setGeneratedIdea] = useState('')
  const [typing, setTyping] = useState(false)
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const [pitchDeck, setPitchDeck] = useState<File | null>(null)
  const [prototype, setPrototype] = useState<File | null>(null)
  const [supportDoc, setSupportDoc] = useState<File | null>(null)
  const [teamRows, setTeamRows] = useState([{ name: '', role: '', email: '' }])

  // Form field refs
  const refs = {
    fname: useRef<HTMLInputElement>(null),
    femail: useRef<HTMLInputElement>(null),
    phone: useRef<HTMLInputElement>(null),
    dept: useRef<HTMLInputElement>(null),
    year: useRef<HTMLInputElement>(null),
    linkedin: useRef<HTMLInputElement>(null),
    github: useRef<HTMLInputElement>(null),
    teamsize: useRef<HTMLSelectElement>(null),
    teamname: useRef<HTMLInputElement>(null),
    idea: useRef<HTMLInputElement>(null),
    domain: useRef<HTMLSelectElement>(null),
    stage: useRef<HTMLSelectElement>(null),
    problem: useRef<HTMLTextAreaElement>(null),
    solution: useRef<HTMLTextAreaElement>(null),
    market: useRef<HTMLTextAreaElement>(null),
    revenue: useRef<HTMLTextAreaElement>(null),
    competition: useRef<HTMLTextAreaElement>(null),
    demourl: useRef<HTMLInputElement>(null),
    ask: useRef<HTMLTextAreaElement>(null),
    anyadd: useRef<HTMLTextAreaElement>(null),
    consent: useRef<HTMLInputElement>(null),
  }

  const sparkIdea = () => {
    if (typing) return
    setTyping(true)
    const idea = ideaPrompts[Math.floor(Math.random() * ideaPrompts.length)]
    let i = 0; setGeneratedIdea('')
    const interval = setInterval(() => {
      setGeneratedIdea(idea.text.slice(0, i + 1)); i++
      if (i >= idea.text.length) { clearInterval(interval); setTyping(false) }
    }, 20)
  }

  const handleSubmit = async () => {
    if (!refs.consent.current?.checked) { setError('Please accept the consent checkbox.'); return }
    if (!refs.fname.current?.value || !refs.femail.current?.value || !refs.idea.current?.value) {
      setError('Please fill in all required fields.'); return
    }
    setError(''); setSubmitting(true)
    try {
      await addDoc(collection(db, 'submissions'), {
        submittedAt: serverTimestamp(),
        status: 'pending',
        founder: {
          name: refs.fname.current?.value || '',
          email: refs.femail.current?.value || '',
          phone: refs.phone.current?.value || '',
          dept: refs.dept.current?.value || '',
          year: refs.year.current?.value || '',
          linkedin: refs.linkedin.current?.value || '',
          github: refs.github.current?.value || '',
        },
        team: {
          size: refs.teamsize.current?.value || '',
          name: refs.teamname.current?.value || '',
          members: teamRows,
        },
        idea: {
          name: refs.idea.current?.value || '',
          domain: refs.domain.current?.value || '',
          stage: refs.stage.current?.value || '',
          problem: refs.problem.current?.value || '',
          solution: refs.solution.current?.value || '',
          market: refs.market.current?.value || '',
          revenue: refs.revenue.current?.value || '',
          competition: refs.competition.current?.value || '',
          demoUrl: refs.demourl.current?.value || '',
        },
        ask: refs.ask.current?.value || '',
        additonal: refs.anyadd.current?.value || '',
        files: {
          pitchDeck: pitchDeck?.name || null,
          prototype: prototype?.name || null,
          supportDoc: supportDoc?.name || null,
        },
      })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const addTeamRow = () => { if (teamRows.length < 6) setTeamRows(r => [...r, { name: '', role: '', email: '' }]) }
  const removeTeamRow = (i: number) => setTeamRows(r => r.filter((_, idx) => idx !== i))

  if (submitted) {
    return (
      <RevealWrapper>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 60%,#E9EDE5 100%)', padding: '4rem 8vw', textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-dark), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '2rem', color: 'white', boxShadow: '0 20px 60px rgba(43,56,62,0.3)' }}>✓</div>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3rem,6vw,5rem)', letterSpacing: '0.06em', color: 'var(--text)', lineHeight: 0.95 }}>
            Idea <span style={{ color: 'var(--gold)' }}>Received!</span>
          </h1>
          <p style={{ fontFamily: 'Syne, sans-serif', marginTop: '1.2rem', color: 'var(--muted)', maxWidth: 440, lineHeight: 1.8, fontSize: '0.95rem' }}>
            Your submission is with us. Expect a response within <strong>3–5 working days</strong>. Keep building!
          </p>
          <Link href="/" style={{ display: 'inline-block', fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green)', textDecoration: 'none', marginTop: '2.5rem', border: '1px solid rgba(43,56,62,0.3)', borderRadius: 4, padding: '0.7rem 1.6rem', transition: 'background 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,56,62,0.06)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '' }}>
            ← Back to Home
          </Link>
        </div>
      </RevealWrapper>
    )
  }

  return (
    <RevealWrapper>
      {/* ── Hero ── */}
      <div style={{ paddingTop: '10rem', paddingBottom: '6rem', paddingLeft: '8vw', paddingRight: '8vw', background: 'linear-gradient(145deg,#F7F7F2 0%,#EEF0E9 55%,#E9EDE5 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle,rgba(43,56,62,.07),transparent 70%)', top: -220, right: '2vw', borderRadius: '50%', filter: 'blur(90px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, background: 'radial-gradient(circle,rgba(201,162,39,.1),transparent 70%)', bottom: -80, left: '6vw', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-tag">{Formdisabled ? 'Application will be opening soon!!' : 'Applications Open'}</p>
          <h1 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3.5rem,7.5vw,7rem)', lineHeight: 0.92, letterSpacing: '0.04em', color: 'var(--text)', position: 'relative', zIndex: 1, marginTop: '0.6rem' }}>
            Submit Your<br /><span style={{ color: 'var(--gold)' }}>Startup Idea</span>
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginTop: '2.5rem', alignItems: 'start' }} className="hero-grid">
            <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, position: 'relative', zIndex: 1, maxWidth: 480 }}>
              Every big thing starts with a small idea. Don&apos;t wait for perfect — share what you&apos;ve got and we&apos;ll help you build, refine, and launch it into the world.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {steps.map((s, i) => (
                <div key={s.n} onMouseEnter={() => setActiveStep(i)} onMouseLeave={() => setActiveStep(null)}
                  style={{ flex: '1 1 120px', background: activeStep === i ? 'rgba(43,56,62,0.06)' : 'rgba(255,255,255,0.7)', border: `1px solid ${activeStep === i ? 'rgba(43,56,62,0.25)' : 'rgba(0,0,0,0.07)'}`, borderRadius: 10, padding: '1rem', cursor: 'default', transition: 'background 0.25s, border-color 0.25s' }}>
                  <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.6rem', color: activeStep === i ? 'var(--green)' : 'rgba(0,0,0,0.12)', lineHeight: 1, transition: 'color 0.25s' }}>{s.n}</div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.78rem', color: 'var(--text)', marginTop: '0.4rem' }}>{s.label}</div>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', color: 'var(--muted-light)', lineHeight: 1.6, marginTop: '0.25rem', letterSpacing: '0.02em' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Why Submit ── */}
      <section style={{ padding: '7rem 8vw', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-tag reveal">Why Submit?</p>
          <h2 className="section-title reveal" style={{ marginBottom: '3rem' }}>What You <span style={{ color: 'var(--gold)' }}>Unlock</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1.2rem' }}>
            {whyItems.map(item => (
              <div key={item.title} className="card reveal" style={{ padding: '2rem 1.8rem', position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${item.accent}, transparent)`, borderRadius: '12px 12px 0 0' }} />
                <div style={{ width: 42, height: 42, borderRadius: 10, background: `rgba(${item.accent === 'var(--green)' ? '43,56,62' : '201,162,39'},.1)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', marginBottom: '1.2rem' }}>{item.icon}</div>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: item.accent, marginBottom: '0.4rem' }}>{item.label}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, fontFamily: 'Syne, sans-serif', color: 'var(--text)', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.75, fontFamily: 'Syne, sans-serif' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Idea Spark ── */}
      <section style={{ padding: '7rem 8vw', background: 'var(--bg)', borderTop: '1px solid rgba(201,162,39,.08)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="spark-grid">
            <div>
              <p className="section-tag reveal">Blank Canvas?</p>
              <h2 className="section-title reveal" style={{ marginBottom: '1.2rem' }}>Spark an <span style={{ color: 'var(--gold)' }}>Idea First</span></h2>
              <p className="reveal" style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8, maxWidth: 400 }}>
                Not sure what to build? Let our idea engine give you a starting point. Each spark is seeded from real startup problems across domains.
              </p>
              <button onClick={sparkIdea} disabled={typing} className="reveal"
                style={{ marginTop: '2rem', padding: '0.85rem 2.2rem', background: typing ? 'rgba(43,56,62,0.4)' : 'linear-gradient(90deg,var(--green-dark),var(--green))', color: '#fff', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', border: 'none', borderRadius: 4, cursor: typing ? 'not-allowed' : 'pointer', fontFamily: 'Syne, sans-serif', transition: 'transform 0.3s, box-shadow 0.3s', display: 'block' }}
                onMouseEnter={e => { if (!typing) { const t = e.target as HTMLElement; t.style.transform = 'translateY(-2px)'; t.style.boxShadow = '0 10px 30px rgba(43,56,62,.3)' } }}
                onMouseLeave={e => { const t = e.target as HTMLElement; t.style.transform = ''; t.style.boxShadow = '' }}>
                {typing ? '⟳  Generating…' : '✦  Spark an Idea'}
              </button>
            </div>
            <div className="reveal" style={{ position: 'relative' }}>
              <div style={{ background: 'rgba(255,255,255,.92)', border: '1.5px solid rgba(43,56,62,.18)', borderRadius: 14, padding: '2rem', minHeight: 160, boxShadow: '0 20px 60px rgba(0,0,0,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '1.2rem' }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff5f57' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#febc2e' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28c840' }} />
                  <span style={{ marginLeft: 'auto', fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.2em', color: 'var(--muted-light)', textTransform: 'uppercase' }}>idea spark</span>
                </div>
                <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: generatedIdea ? 'var(--text)' : 'var(--muted-light)', lineHeight: 1.6, minHeight: 80 }}>
                  {generatedIdea || 'Your idea will appear here…'}
                  {typing && <span style={{ display: 'inline-block', width: 2, height: '1em', background: 'var(--green)', marginLeft: 2, verticalAlign: 'middle', animation: 'blink 0.7s step-end infinite' }} />}
                </p>
                {generatedIdea && !typing && (
                  <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.18em', color: 'var(--green)', textTransform: 'uppercase', marginTop: '1rem' }}>✦ Use this as a starting point ↓</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Application Form ── */}
      <section style={{ padding: '7rem 8vw 9rem', background: 'linear-gradient(160deg,var(--bg2) 0%,rgba(43,56,62,.03) 100%)', borderTop: '1px solid rgba(0,0,0,.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '4rem' }}>
            <div>
              <p className="section-tag reveal">The Application</p>
              <h2 className="section-title reveal">Tell Us About Your <span style={{ color: 'var(--gold)' }}>Idea</span></h2>
            </div>
            <p className="reveal" style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: 'var(--muted-light)', textTransform: 'uppercase', maxWidth: 240, lineHeight: 1.8, textAlign: 'right' }}>
              All fields marked * are required. We review every submission personally.
            </p>
          </div>

          {error && (
            <div style={{ marginBottom: '2rem', padding: '1rem 1.4rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, color: '#dc2626', fontFamily: 'Syne, sans-serif', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '4rem', alignItems: 'start' }} className="form-layout">
            {/* LEFT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <FormBlock label="01" title="Founder Information">
                <div className="form-row-2">
                  <FloatField id="f-fname" label="Full Name *" type="text" ref={refs.fname} />
                  <FloatField id="f-femail" label="Email Address *" type="email" ref={refs.femail} />
                </div>
                <div className="form-row-2">
                  <FloatField id="f-phone" label="Phone Number *" type="tel" ref={refs.phone} />
                  <FloatField id="f-dept" label="Department *" type="text" ref={refs.dept} />
                </div>
                <div className="form-row-2">
                  <FloatField id="f-year" label="Year of Study *" type="text" ref={refs.year} />
                  <FloatField id="f-linkedin" label="LinkedIn Profile" type="url" ref={refs.linkedin} />
                </div>
                <FloatField id="f-github" label="GitHub / Portfolio (optional)" type="url" ref={refs.github} />
              </FormBlock>

              <FormBlock label="02" title="Team Details">
                <div className="form-row-2">
                  <FloatSelect id="f-teamsize" label="Team Size *" options={teamSizes} ref={refs.teamsize} />
                  <FloatField id="f-teamname" label="Team / Startup Name" type="text" ref={refs.teamname} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.2rem' }}>Co-Founder Details</p>
                  {teamRows.map((_, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.8rem', alignItems: 'center' }}>
                      <FloatField id={`t-name-${i}`} label="Name" type="text" />
                      <FloatField id={`t-role-${i}`} label="Role" type="text" />
                      <FloatField id={`t-email-${i}`} label="Email" type="email" />
                      {teamRows.length > 1 && (
                        <button onClick={() => removeTeamRow(i)} style={{ background: 'none', border: '1px solid rgba(0,0,0,.1)', borderRadius: 6, cursor: 'pointer', color: 'var(--muted-light)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }} aria-label="Remove member">×</button>
                      )}
                    </div>
                  ))}
                  {teamRows.length < 6 && (
                    <button onClick={addTeamRow} style={{ alignSelf: 'flex-start', fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--green)', background: 'none', border: '1px solid rgba(43,56,62,.25)', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer' }}>
                      + Add Co-Founder
                    </button>
                  )}
                </div>
              </FormBlock>
            </div>

            {/* RIGHT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              <FormBlock label="03" title="Your Idea">
                <div className="form-row-2">
                  <FloatField id="f-idea" label="Startup / Idea Name *" type="text" ref={refs.idea} />
                  <FloatSelect id="f-domain" label="Domain / Sector *" options={domains} ref={refs.domain} />
                </div>
                <FloatSelect id="f-stage" label="Current Stage *" options={stages} ref={refs.stage} />
                <FloatTextarea id="f-problem" label="Problem Statement *" hint="What pain point does this address? Who faces it?" rows={3} ref={refs.problem} />
                <FloatTextarea id="f-solution" label="Your Proposed Solution *" hint="How does your idea solve this problem?" rows={3} ref={refs.solution} />
                <FloatTextarea id="f-market" label="Target Market & Users *" hint="Who will use this? What is the market size?" rows={2} ref={refs.market} />
                <FloatTextarea id="f-revenue" label="Revenue Model" hint="How do you plan to make money? (optional)" rows={2} ref={refs.revenue} />
                <FloatTextarea id="f-competition" label="Competitors & Differentiation" hint="What alternatives exist, and how are you different?" rows={2} ref={refs.competition} />
              </FormBlock>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginTop: '2.5rem' }} className="form-bottom-row">
            <FormBlock label="04" title="Supporting Documents">
              <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '0.5rem' }}>
                Help us understand your idea better. Upload any relevant files.
              </p>
              <FileDropZone id="file-pitch" label="Pitch Deck (PDF, PPT)" accept=".pdf,.ppt,.pptx" hint="PDF or PowerPoint · Max 20 MB" icon="📊" file={pitchDeck} onChange={setPitchDeck} />
              <FileDropZone id="file-proto" label="Prototype / Demo Screenshot" accept="image/*,.pdf,.fig,.sketch" hint="PNG, JPG, PDF · Max 10 MB" icon="🖼️" file={prototype} onChange={setPrototype} />
              <FileDropZone id="file-support" label="Additional Document (optional)" accept=".pdf,.doc,.docx,.xls,.xlsx,image/*" hint="Market research, financials · Max 15 MB" icon="📎" file={supportDoc} onChange={setSupportDoc} />
            </FormBlock>

            <FormBlock label="05" title="Final Details">
              <FloatField id="f-demourl" label="Live Demo / Prototype URL (if any)" type="url" ref={refs.demourl} />
              <FloatTextarea id="f-ask" label="What are you looking for from IEDC?" hint="Mentorship, funding, co-founder, lab access, etc." rows={2} ref={refs.ask} />
              <FloatTextarea id="f-anyadd" label="Anything else you'd like to add?" hint="Tell us what makes you the right person to build this." rows={2} ref={refs.anyadd} />
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                <input ref={refs.consent} type="checkbox" style={{ marginTop: 3, accentColor: 'var(--green)', width: 14, height: 14, flexShrink: 0 }} />
                <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                  I confirm that this idea is my own or my team&apos;s original work, and I agree to IEDC MGMCET reviewing and storing my submission details. *
                </span>
              </label>
              {Formdisabled ? (
                <p style={{ marginTop: '0.5rem', paddingLeft: '1.5rem', fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)' }}>
                  We will start to accept applications soon. Stay tuned!
                </p>
              ) : <button onClick={handleSubmit} disabled={submitting}
                style={{ marginTop: '1rem', width: '100%', padding: '1.1rem', background: submitting ? 'rgba(43,56,62,0.5)' : 'linear-gradient(90deg,var(--green-dark),var(--green))', color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.85rem', letterSpacing: '0.12em', textTransform: 'uppercase', border: 'none', borderRadius: 8, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseEnter={e => { if (!submitting) { const t = e.currentTarget; t.style.transform = 'translateY(-2px)'; t.style.boxShadow = '0 14px 40px rgba(43,56,62,.3)' } }}
                onMouseLeave={e => { const t = e.currentTarget; t.style.transform = ''; t.style.boxShadow = '' }}>
                {submitting ? '⟳  Submitting…' : 'Submit My Application'}
              </button>}

              <p style={{ textAlign: 'center', fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'var(--muted-light)', marginTop: '0.8rem', textTransform: 'uppercase' }}>
                Every submission is reviewed personally · Response within 3–5 working days
              </p>
            </FormBlock>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 960px) {
          .hero-grid, .spark-grid, .form-layout, .form-bottom-row { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 640px) { .form-row-2 { grid-template-columns: 1fr !important; } }
        .form-group-float { position: relative; }
        .form-input-float { width: 100%; padding: 1.1rem 1rem 0.5rem; background: rgba(255,255,255,0.75); border: 1.5px solid rgba(0,0,0,0.1); border-radius: 8px; font-family: 'Syne', sans-serif; font-size: 0.88rem; color: var(--text); outline: none; transition: border-color 0.25s, box-shadow 0.25s; box-sizing: border-box; appearance: none; }
        .form-input-float:focus { border-color: rgba(43,56,62,0.5); box-shadow: 0 0 0 3px rgba(43,56,62,0.08); background: #fff; }
        .form-label-float { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-family: 'DM Mono', monospace; font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted-light); pointer-events: none; transition: top 0.2s, font-size 0.2s, color 0.2s; }
        .form-input-float:focus + .form-label-float, .form-input-float:not(:placeholder-shown) + .form-label-float { top: 0.48rem; font-size: 0.5rem; color: var(--green); }
        textarea.form-input-float { resize: vertical; padding-top: 1.4rem; }
        textarea.form-input-float + .form-label-float { top: 1rem; transform: none; }
        textarea.form-input-float:focus + .form-label-float, textarea.form-input-float:not(:placeholder-shown) + .form-label-float { top: 0.4rem; }
        select.form-input-float { cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 0.9rem center; padding-right: 2.5rem; }
      `}</style>
    </RevealWrapper>
  )
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function FormBlock({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="reveal" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 14, padding: '2.2rem 2rem', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.3rem', color: 'var(--green)', lineHeight: 1 }}>{label}</span>
        <div style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(43,56,62,0.2), transparent)' }} />
        <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.82rem', color: 'var(--text)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

const FloatField = forwardRef<HTMLInputElement, { id: string; label: string; type: string }>(
  ({ id, label, type }, ref) => (
    <div className="form-group-float">
      <input ref={ref} id={id} type={type} placeholder=" " className="form-input-float" />
      <label htmlFor={id} className="form-label-float">{label}</label>
    </div>
  )
)
FloatField.displayName = 'FloatField'

const FloatTextarea = forwardRef<HTMLTextAreaElement, { id: string; label: string; hint?: string; rows?: number }>(
  ({ id, label, hint, rows = 3 }, ref) => (
    <div className="form-group-float" style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      <textarea ref={ref} id={id} placeholder=" " rows={rows} className="form-input-float" style={{ minHeight: rows * 28 }} />
      <label htmlFor={id} className="form-label-float">{label}</label>
      {hint && <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.08em', color: 'var(--muted-light)', paddingLeft: '0.2rem' }}>{hint}</p>}
    </div>
  )
)
FloatTextarea.displayName = 'FloatTextarea'

const FloatSelect = forwardRef<HTMLSelectElement, { id: string; label: string; options: string[] }>(
  ({ id, label, options }, ref) => (
    <div className="form-group-float">
      <select ref={ref} id={id} className="form-input-float" defaultValue="">
        <option value="" disabled> </option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <label htmlFor={id} className="form-label-float">{label}</label>
    </div>
  )
)
FloatSelect.displayName = 'FloatSelect'