'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { db, auth } from '@/lib/firebase' // Added auth import
import { collection, getDocs, orderBy, query, Timestamp } from 'firebase/firestore'
import { onAuthStateChanged, signOut } from 'firebase/auth' // Added Firebase Auth imports
import { FiLogOut, FiDownload, FiEye, FiRefreshCw, FiUser, FiMail, FiCalendar } from 'react-icons/fi'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Submission {
  id: string
  submittedAt: Timestamp | null
  status: string
  founder: { name: string; email: string; phone: string; dept: string; year: string; linkedin: string; github: string }
  team: { size: string; name: string; members: { name: string; role: string; email: string }[] }
  idea: { name: string; domain: string; stage: string; problem: string; solution: string; market: string; revenue: string; competition: string; demoUrl: string }
  ask: string
  additonal: string
  files: { pitchDeck: string | null; prototype: string | null; supportDoc: string | null }
}

// ─── PDF Generator ────────────────────────────────────────────────────────────
async function downloadPDF(s: Submission) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const W = 210, margin = 20, contentW = W - margin * 2
  let y = 0

  const teal  = [43, 56, 62]   as [number,number,number]
  const gold  = [201, 162, 39] as [number,number,number]
  const white = [255, 255, 255] as [number,number,number]
  const dark  = [26, 34, 36]   as [number,number,number]
  const muted = [100, 116, 139] as [number,number,number]
  const light = [248, 248, 244] as [number,number,number]

  // ── Header band ──
  doc.setFillColor(...teal)
  doc.rect(0, 0, W, 42, 'F')

  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('IEDC MGMCET', margin, 16)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 200)
  doc.text('INNOVATION & ENTREPRENEURSHIP DEVELOPMENT CENTRE', margin, 22)

  doc.setFillColor(...gold)
  doc.rect(margin, 26, contentW, 0.5, 'F')

  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('STARTUP IDEA SUBMISSION', margin, 35)

  y = 52

  // ── Idea name banner ──
  doc.setFillColor(...light)
  doc.roundedRect(margin, y, contentW, 16, 2, 2, 'F')
  doc.setTextColor(...teal)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(s.idea.name || 'Untitled Idea', margin + 6, y + 10)

  doc.setTextColor(...muted)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  const dateStr = s.submittedAt ? new Date(s.submittedAt.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'
  doc.text(`Submitted: ${dateStr}  ·  Domain: ${s.idea.domain}  ·  Stage: ${s.idea.stage}`, margin + 6, y + 14)
  y += 22

  // ── Section helper ──
  const section = (title: string) => {
    doc.setFillColor(...teal)
    doc.rect(margin, y, 3, 6, 'F')
    doc.setTextColor(...teal)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.text(title.toUpperCase(), margin + 6, y + 4.5)
    doc.setDrawColor(...gold)
    doc.setLineWidth(0.3)
    doc.line(margin + 6 + doc.getTextWidth(title.toUpperCase()) + 3, y + 4, margin + contentW, y + 4)
    y += 10
  }

  const field = (label: string, value: string, indent = 0) => {
    if (!value) return
    const lines = doc.splitTextToSize(value, contentW - indent - 6)
    const blockH = 4.5 + lines.length * 4.5 + 3
    if (y + blockH > 275) { doc.addPage(); y = 20 }

    doc.setTextColor(...muted)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text(label.toUpperCase(), margin + indent, y)
    y += 4
    doc.setTextColor(...dark)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(lines, margin + indent, y)
    y += lines.length * 4.5 + 3
  }

  const row2 = (l1: string, v1: string, l2: string, v2: string) => {
    const half = contentW / 2 - 3
    const saved = y
    field(l1, v1); const y1 = y
    y = saved
    const origMargin = margin
    // right column
    const lines1 = v1 ? doc.splitTextToSize(v1, half) : []
    const lines2 = v2 ? doc.splitTextToSize(v2, half) : []
    if (y + Math.max(lines1.length, lines2.length) * 4.5 + 10 > 275) { doc.addPage(); y = 20 }
    doc.setTextColor(...muted); doc.setFont('helvetica','normal'); doc.setFontSize(7)
    doc.text(l1.toUpperCase(), margin, y)
    doc.text(l2.toUpperCase(), margin + half + 6, y)
    y += 4
    doc.setTextColor(...dark); doc.setFont('helvetica','normal'); doc.setFontSize(9)
    if (v1) doc.text(doc.splitTextToSize(v1, half), margin, y)
    if (v2) doc.text(doc.splitTextToSize(v2, half), margin + half + 6, y)
    y += Math.max(lines1.length, lines2.length) * 4.5 + 3
  }

  // ── 1. Founder ──
  section('1. Founder Information')
  row2('Full Name', s.founder.name, 'Email', s.founder.email)
  row2('Phone', s.founder.phone, 'Department', s.founder.dept)
  row2('Year of Study', s.founder.year, 'LinkedIn', s.founder.linkedin)
  if (s.founder.github) field('GitHub / Portfolio', s.founder.github)
  y += 2

  // ── 2. Team ──
  section('2. Team Details')
  row2('Team Size', s.team.size, 'Team / Startup Name', s.team.name)
  if (s.team.members?.length) {
    s.team.members.forEach((m, i) => {
      if (m.name || m.role || m.email) row2(`Co-Founder ${i+1} Name`, m.name, 'Role', m.role)
    })
  }
  y += 2

  // ── 3. Idea ──
  section('3. Startup Idea')
  row2('Idea Name', s.idea.name, 'Domain', s.idea.domain)
  field('Current Stage', s.idea.stage)
  field('Problem Statement', s.idea.problem)
  field('Proposed Solution', s.idea.solution)
  field('Target Market & Users', s.idea.market)
  if (s.idea.revenue)     field('Revenue Model', s.idea.revenue)
  if (s.idea.competition) field('Competitors & Differentiation', s.idea.competition)
  if (s.idea.demoUrl)     field('Demo / Prototype URL', s.idea.demoUrl)
  y += 2

  // ── 4. Ask & Additional ──
  section('4. Request & Additional Notes')
  if (s.ask)       field('What they need from IEDC', s.ask)
  if (s.additonal) field('Additional Notes', s.additonal)
  y += 2

  // ── 5. Files ──
  if (s.files?.pitchDeck || s.files?.prototype || s.files?.supportDoc) {
    section('5. Uploaded Files')
    if (s.files.pitchDeck)  field('Pitch Deck', s.files.pitchDeck)
    if (s.files.prototype)  field('Prototype / Screenshot', s.files.prototype)
    if (s.files.supportDoc) field('Additional Document', s.files.supportDoc)
    y += 2
  }

  // ── Footer on every page ──
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFillColor(...teal)
    doc.rect(0, 287, W, 10, 'F')
    doc.setTextColor(...white)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.text('IEDC MGMCET · MGM College of Engineering and Technology, Pampakuda, Kerala', margin, 293)
    doc.text(`Page ${i} of ${totalPages}`, W - margin, 293, { align: 'right' })
  }

  doc.save(`IEDC_Submission_${s.idea.name || s.id}_${dateStr}.pdf`)
}

// ─── View Modal ───────────────────────────────────────────────────────────────
function ViewModal({ s, onClose }: { s: Submission; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const dateStr = s.submittedAt ? new Date(s.submittedAt.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }) : 'N/A'

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <div style={{ width: 3, height: 18, background: 'var(--green)', borderRadius: 2 }} />
        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--green)' }}>{title}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>{children}</div>
    </div>
  )

  const Field = ({ label, value, full }: { label: string; value?: string; full?: boolean }) => (
    value ? (
      <div style={{ gridColumn: full ? '1 / -1' : undefined }}>
        <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)', margin: '0 0 0.25rem' }}>{label}</p>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', color: 'var(--text)', margin: 0, lineHeight: 1.6 }}>{value}</p>
      </div>
    ) : null
  )

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 99000, background: 'rgba(26,34,36,0.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 720, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 32px 80px rgba(0,0,0,0.3)' }}>

        {/* Modal header */}
        <div style={{ padding: '1.4rem 1.8rem', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.5rem', letterSpacing: '0.05em', color: '#fff', margin: 0 }}>{s.idea.name}</h2>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.14em', textTransform: 'uppercase', margin: '0.2rem 0 0' }}>
              {s.founder.name} · {s.idea.domain} · {dateStr}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <button onClick={() => downloadPDF(s)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1rem', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em' }}>
              <FiDownload size={13} /> Download PDF
            </button>
            <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>✕</button>
          </div>
        </div>

        {/* Modal body */}
        <div style={{ overflow: 'auto', padding: '2rem 1.8rem', flex: 1 }}>
          <Section title="1. Founder Information">
            <Field label="Full Name" value={s.founder.name} />
            <Field label="Email" value={s.founder.email} />
            <Field label="Phone" value={s.founder.phone} />
            <Field label="Department" value={s.founder.dept} />
            <Field label="Year" value={s.founder.year} />
            <Field label="LinkedIn" value={s.founder.linkedin} />
            {s.founder.github && <Field label="GitHub" value={s.founder.github} full />}
          </Section>

          <Section title="2. Team">
            <Field label="Team Size" value={s.team.size} />
            <Field label="Team Name" value={s.team.name} />
          </Section>
          {s.team.members?.filter(m => m.name).map((m, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '0.6rem' }}>
              <div><p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)', margin: '0 0 0.2rem' }}>Co-Founder {i+1}</p><p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', color: 'var(--text)', margin: 0 }}>{m.name}</p></div>
              <div><p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)', margin: '0 0 0.2rem' }}>Role</p><p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', color: 'var(--text)', margin: 0 }}>{m.role}</p></div>
              <div><p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)', margin: '0 0 0.2rem' }}>Email</p><p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', color: 'var(--text)', margin: 0 }}>{m.email}</p></div>
            </div>
          ))}

          <Section title="3. Startup Idea">
            <Field label="Idea Name" value={s.idea.name} />
            <Field label="Domain" value={s.idea.domain} />
            <Field label="Stage" value={s.idea.stage} full />
            <Field label="Problem Statement" value={s.idea.problem} full />
            <Field label="Proposed Solution" value={s.idea.solution} full />
            <Field label="Target Market" value={s.idea.market} full />
            {s.idea.revenue     && <Field label="Revenue Model" value={s.idea.revenue} full />}
            {s.idea.competition && <Field label="Competition" value={s.idea.competition} full />}
            {s.idea.demoUrl     && <Field label="Demo URL" value={s.idea.demoUrl} full />}
          </Section>

          {(s.ask || s.additonal) && (
            <Section title="4. Notes">
              {s.ask       && <Field label="What they need from IEDC" value={s.ask} full />}
              {s.additonal && <Field label="Additional Notes" value={s.additonal} full />}
            </Section>
          )}

          {(s.files?.pitchDeck || s.files?.prototype || s.files?.supportDoc) && (
            <Section title="5. Files">
              {s.files.pitchDeck  && <Field label="Pitch Deck" value={s.files.pitchDeck} />}
              {s.files.prototype  && <Field label="Prototype" value={s.files.prototype} />}
              {s.files.supportDoc && <Field label="Support Doc" value={s.files.supportDoc} />}
            </Section>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router = useRouter()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Submission | null>(null)
  const [search, setSearch] = useState('')

  // Check Auth State using Firebase instead of Local Storage
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/admin') // Redirect to login if not authenticated
      }
    })
    return () => unsubscribe()
  }, [router])

  const fetchSubmissions = async () => {
    setLoading(true)
    try {
      const q = query(collection(db, 'submissions'), orderBy('submittedAt', 'desc'))
      const snap = await getDocs(q)
      setSubmissions(snap.docs.map(d => ({ id: d.id, ...d.data() } as Submission)))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchSubmissions() }, [])

  // Firebase Sign Out function
  const logout = async () => {
    try {
      await signOut(auth)
      router.push('/admin')
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  const filtered = submissions.filter(s =>
    s.founder.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.idea.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.idea.domain?.toLowerCase().includes(search.toLowerCase()) ||
    s.founder.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'Syne, sans-serif' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--green)', padding: '0 8vw', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 20px rgba(0,0,0,0.2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Image src="/IEDC_logo.png" alt="IEDC" width={30} height={30} />
            <span style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '1.1rem', letterSpacing: '0.08em', color: '#fff' }}>IEDC Admin</span>
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginLeft: '0.4rem' }}>Dashboard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <button onClick={fetchSubmissions} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '0.45rem 0.9rem', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'Syne, sans-serif' }}>
              <FiRefreshCw size={13} /> Refresh
            </button>
            <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 6, padding: '0.45rem 0.9rem', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '0.78rem', fontFamily: 'Syne, sans-serif' }}>
              <FiLogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '3rem 8vw' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Submissions', value: submissions.length, icon: <FiUser size={18} /> },
            { label: 'This Month', value: submissions.filter(s => s.submittedAt && new Date(s.submittedAt.seconds * 1000).getMonth() === new Date().getMonth()).length, icon: <FiCalendar size={18} /> },
            { label: 'Unique Domains', value: new Set(submissions.map(s => s.idea.domain)).size, icon: <FiMail size={18} /> },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', borderRadius: 12, padding: '1.4rem 1.6rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(43,56,62,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)' }}>{stat.icon}</div>
              <div>
                <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '2rem', lineHeight: 1, color: 'var(--text)', margin: 0 }}>{stat.value}</p>
                <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted-light)', margin: 0 }}>{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by name, idea, domain, email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.85rem 1.2rem', border: '1.5px solid rgba(0,0,0,0.1)', borderRadius: 8, fontFamily: 'Syne, sans-serif', fontSize: '0.9rem', color: 'var(--text)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = 'var(--green)')}
            onBlur={e => (e.target.style.borderColor = 'rgba(0,0,0,0.1)')}
          />
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.2fr 1fr auto', gap: '1rem', padding: '0.9rem 1.4rem', background: 'var(--bg2)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            {['Founder', 'Idea', 'Domain', 'Stage', 'Date', 'Actions'].map(h => (
              <span key={h} style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted-light)' }}>{h}</span>
            ))}
          </div>

          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-light)', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Loading submissions…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-light)', fontFamily: '"DM Mono", monospace', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {search ? 'No results found' : 'No submissions yet'}
            </div>
          ) : (
            filtered.map((s, i) => {
              const dateStr = s.submittedAt ? new Date(s.submittedAt.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'
              return (
                <div key={s.id}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1.2fr 1fr auto', gap: '1rem', padding: '1rem 1.4rem', borderBottom: i < filtered.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none', alignItems: 'center', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(43,56,62,0.02)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <div>
                    <p style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text)', margin: 0 }}>{s.founder.name}</p>
                    <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: 'var(--muted-light)', margin: '0.15rem 0 0' }}>{s.founder.email}</p>
                  </div>
                  <p style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.85rem', color: 'var(--text)', margin: 0, fontWeight: 600 }}>{s.idea.name}</p>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.62rem', color: 'var(--green)', background: 'rgba(43,56,62,0.07)', padding: '0.2rem 0.6rem', borderRadius: 20, letterSpacing: '0.08em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.idea.domain}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.58rem', color: 'var(--muted)', letterSpacing: '0.04em' }}>{s.idea.stage?.split('(')[0].trim()}</span>
                  <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.6rem', color: 'var(--muted-light)', letterSpacing: '0.06em' }}>{dateStr}</span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button onClick={() => setSelected(s)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.8rem', background: 'var(--green)', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      <FiEye size={11} /> View
                    </button>
                    <button onClick={() => downloadPDF(s)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.45rem 0.8rem', background: 'var(--gold)', color: '#fff', border: 'none', borderRadius: 5, cursor: 'pointer', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.65rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
                      <FiDownload size={11} /> PDF
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {selected && <ViewModal s={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}