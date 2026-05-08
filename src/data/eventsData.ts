// ─── EVENTS DATA ─────────────────────────────────────────────────────────────
export type EventType = 'Hackathon' | 'Pitch Night' | 'Workshop' | 'Expo' | 'Bootcamp' | 'Networking' | 'Visit' | 'Orientation' | 'Session' | 'Launch'
export type EventStatus = 'past' | 'ongoing' | 'upcoming'

export type Event = {
  id: string
  day: string
  month: string
  year: string
  title: string
  shortTitle: string
  venue: string
  description: string
  tag: string
  tagColor: string
  tagTextColor: string
  status: EventStatus   // 'past' | 'ongoing' | 'upcoming'
  registerLink?: string
  details?: string
  emoji?: string
  featured?: boolean
}

export const events: Event[] = [
  {
    id: 'hackrush',
    day: '23', month: 'Jan', year: '2026',
    title: 'HackRush — 16-Hour Innovation Sprint',
    shortTitle: 'HackRush',
    venue: 'MGMCET, Pampakuda',
    description: '16-hour innovation sprint — ideate, build, and demo under pressure.',
    tag: 'Hackathon', tagColor: '#ef4444', tagTextColor: '#fff',
    status: 'past',
    emoji: '⚡',
    details: 'HackRush is a 16-hour non-stop innovation sprint where teams race against the clock to turn ideas into working prototypes. Focused on speed, creativity, and execution — participants ideate, build, and demo a solution to a real-world problem. Open to all disciplines. Form a team of 2–4 and bring your best ideas. Sucessfully Completed with 100+ Participants from multiple colleges',
    featured: true,
  },
  {
    id: 'case-study-2023',
    day: '01', month: 'Dec', year: '2023',
    title: 'Student Entrepreneurship Case Study Presentations',
    shortTitle: 'Case Study Presentations',
    venue: 'MGMCET, Pampakuda',
    description: 'Nine teams presented case studies on student entrepreneurship success stories.',
    tag: 'Session', tagColor: '#8b5cf6', tagTextColor: '#fff',
    status: 'past',
    emoji: '📊',
    details: 'Nine teams presented case studies on Student Entrepreneurship covering: Meesho, Walking Stick, Agrima Infotech, Practo, Bluegape, Fixit, Blackbox with Intelligence Vehicle System, Genrobotics, and Qkopy. Each presentation explored the founding story, challenges, and impact of these ventures.',
  },
  {
    id: 'problathon-launch-2023',
    day: '19', month: 'Oct', year: '2023',
    title: 'Problathon Launch',
    shortTitle: 'Problathon',
    venue: 'MGMCET, Pampakuda',
    description: 'Launch of the Problathon program with 8 IEDC working teams.',
    tag: 'Launch', tagColor: '#f59e0b', tagTextColor: '#1c1c1a',
    status: 'past',
    emoji: '🚀',
    details: 'The Problathon program was launched by IEDC Nodal Officer Arun Chandrakumar, who discussed the aims, rules, and regulations of the initiative. Eight IEDC member working teams were formed to participate in the Problathon — a problem-solving marathon focused on real-world challenges.',
    featured: true,
  },
  {
    id: 'hackathon-session-2023',
    day: '11', month: 'Oct', year: '2023',
    title: 'Hackathon Awareness Session',
    shortTitle: 'Hackathon Session',
    venue: 'MGMCET, Pampakuda',
    description: 'A session on the importance of hackathons and how they shape careers.',
    tag: 'Session', tagColor: '#8b5cf6', tagTextColor: '#fff',
    status: 'past',
    emoji: '💡',
    details: 'Session conducted by Professor Shajahan CM covering the importance of hackathons — how they help students gain access to new ideas, discover career opportunities, and achieve recognition.',
  },
  {
    id: 'orientation-2023',
    day: '25', month: 'Sep', year: '2023',
    title: 'IEDC Orientation for First Year Students',
    shortTitle: 'Freshers Orientation',
    venue: 'MGMCET, Pampakuda',
    description: 'Orientation session introducing first-year students to IEDC and KSUM grants.',
    tag: 'Orientation', tagColor: '#10b981', tagTextColor: '#fff',
    status: 'past',
    emoji: '🎓',
    details: 'The meeting was initiated by Nodal Officer Assistant Professor Arun Chandrakumar. Mathew Joseph and Denitta Johnson explained the aims of IEDC and grants provided by KSUM. IEDC members Misba Banu P and Serah David presented the idea of a Napkin Dispensing Machine. Students divided into five teams for a group discussion on Waste Management.',
  },
  {
    id: 'committee-formation-2023',
    day: '27', month: 'Aug', year: '2023',
    title: 'IEDC Committee Formation 2023–24',
    shortTitle: 'Committee Formation',
    venue: 'MGMCET, Pampakuda',
    description: 'Formation of the IEDC Executive Committee for the academic year 2023–24.',
    tag: 'Launch', tagColor: '#f59e0b', tagTextColor: '#1c1c1a',
    status: 'past',
    emoji: '🏛️',
    details: 'The IEDC committee for the academic year 2023–24 was officially formed. Elected positions: Chief Executive Lead — Mathew Joseph, Technical Lead — Muhammed Aadhil P, Quality and Operational Lead — Alwin George, Finance Lead — Agnes C A, Creative and Innovation — Denitta Johnson, Branding and Marketing — Shamilin Shaji.',
  },
  {
    id: 'fablab-visit-2023',
    day: '19', month: 'Apr', year: '2023',
    title: 'Fab Lab Visit — Kerala Technology Innovation Zone',
    shortTitle: 'Fab Lab Visit',
    venue: 'KTIZ, Kochi',
    description: 'IEDC members visited the Fabrication Laboratory at Kerala Technology Innovation Zone.',
    tag: 'Visit', tagColor: '#0ea5e9', tagTextColor: '#fff',
    status: 'past',
    emoji: '🏭',
    details: 'Student members of IEDC MGMCET visited the Fabrication Laboratory (Fab Lab) at Kerala Technology Innovation Zone (KTIZ), Kochi. Fab Lab is a technical prototyping platform for innovation and invention under Kerala Startup Mission (KSUM). Members got hands-on exposure to advanced prototyping tools and technologies.',
  },
]