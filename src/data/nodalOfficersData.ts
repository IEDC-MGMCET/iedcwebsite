// ─── NODAL OFFICERS ──────────────────────────────────────────────────────────
export type NodalOfficer = {
  id: string
  name: string
  role: string          // e.g. "Nodal Officer", "Nodal Officer II"
  image: string
  year: string          // tenure year e.g. "26-27"
  quote?: string
  bio?: string          // optional extended bio
  email?: string
  phone?: string
  department?: string
  designation?: string  // faculty designation e.g. "Assistant Professor"
  linkedin?: string
  github?: string
  instagram?: string
}

export const nodalOfficers: NodalOfficer[] = [
  {
    id: 'nodal-1',
    name: 'Jishnu S Jyothish',
    role: 'Nodal Officer I',
    image: 'NodalOfficer',
    department: 'Computer Science and Engineering',
    designation: 'Assistant Professor',
    year: '26-27',
    quote: "Our mission is simple — give every student at MGMCET the tools, courage, and community to build something that matters. Innovation is not a skill, it's a mindset we cultivate together.",
    linkedin: '#',
    github: '#',
  },
  {
    id: 'nodal-2',
    name: 'Lakshmi G Ashok',
    role: 'Nodal Officer II',
    image: 'NodalOfficer2',
    department: 'Sciences and Humanities',
    designation: 'Assistant Professor',
    year: '26-27',
    quote: "We believe every student has the potential to create meaningful change. Our mission is to inspire confidence, encourage bold ideas, and build a culture where innovation thrives through collaboration and purpose.",
    linkedin: '#',
    github: '#',
  },
]