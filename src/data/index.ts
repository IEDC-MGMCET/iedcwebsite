// ─── EXECOM MEMBERS DATA ─────────────────────────────────────────────────────
export type ExecomMember = {
  id: string
  name: string
  role: string
  image: string
  year: string
  isCurrent: boolean
  isNodalOfficer?: boolean
  quote?: string
  linkedin?: string
  github?: string
}

export const execomMembers: ExecomMember[] = [
  // ─────────────────────────────────────────
  // NODAL OFFICER
  // ─────────────────────────────────────────
  {
    id: 'nodal',
    name: 'Jishnu S Jyotish',
    role: 'Nodal Officer',
    image: '/execom/26-27/NodalOfficer.jpeg',
    year: '26-27',
    isCurrent: true,
    isNodalOfficer: true,
    quote:
      "Our mission is simple — give every student at MGMCET the tools, courage, and community to build something that matters. Innovation is not a skill, it's a mindset we cultivate together.",
    linkedin: '#',
    github: '#',
  },

  // ─────────────────────────────────────────
  // CURRENT EXECOM 26–27
  // ─────────────────────────────────────────
  {
    id: '1',
    name: 'Adarsh Antony',
    role: 'Chief Executive Officer (CEO)',
    image: '/execom/26-27/AdarshAntony.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '2',
    name: 'Shamilin Shaji',
    role: 'Chief Operations Officer (COO)',
    image: '/execom/26-27/ShamilinShaji.png',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '3',
    name: 'Aiswarya Bijulal',
    role: 'Chief Technical Officer (CTO)',
    image: '/execom/26-27/AiswaryaBijulal.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '4',
    name: 'Anagha PS',
    role: 'Chief Creative Officer (CCO)',
    image: '/execom/26-27/AnaghaPS.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '5',
    name: 'Pavithra KA',
    role: 'Chief Finance Officer (CFO)',
    image: '/execom/26-27/PavithraKA.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '6',
    name: 'Shaun S Sooraj',
    role: 'Chief Marketing Officer (CMO)',
    image: '/execom/26-27/ShaunSSooraj.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '7',
    name: 'Salman A',
    role: 'Community Lead',
    image: '/execom/26-27/SalmanA.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '8',
    name: 'Sana Meharin K',
    role: 'Women Entrepreneurship Lead',
    image: '/execom/26-27/SanaMeharinK.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '9',
    name: 'Kelbin Bijoy C',
    role: 'Associate OO',
    image: '/execom/26-27/KelbinBijoyC.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '10',
    name: 'Aswin CS',
    role: 'Associate TO',
    image: '/execom/26-27/AswinCS.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '11',
    name: 'Aswananda Babu',
    role: 'Associate FO',
    image: '/execom/26-27/AswanandaBabu.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '12',
    name: 'Abhijith AR',
    role: 'Associate CO',
    image: '/execom/26-27/AbhijithAR.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },
  {
    id: '13',
    name: 'Jilna Johnson',
    role: 'Associate Community Lead',
    image: '/execom/26-27/JilnaJohnson.jpeg',
    year: '26-27',
    isCurrent: true,
    linkedin: '#',
    github: '#',
  },

  // ─────────────────────────────────────────
  // PAST EXECOM 25–26
  // ─────────────────────────────────────────
  {
    id: '14',
    name: 'Ananya Suresh',
    role: 'President',
    image: '/execom/arya.jpeg',
    year: '25-26',
    isCurrent: false,
    linkedin: '#',
    github: '#',
  },
  {
    id: '15',
    name: 'Vishnu Mohan',
    role: 'Tech Lead',
    image: '/execom/arya.jpeg',
    year: '25-26',
    isCurrent: false,
    linkedin: '#',
    github: '#',
  },
  {
    id: '16',
    name: 'Lakshmi Pillai',
    role: 'Design Head',
    image: '/execom/arya.jpeg',
    year: '25-26',
    isCurrent: false,
    linkedin: '#',
    github: '#',
  },
  {
    id: '17',
    name: 'Arjun Varma',
    role: 'Events Lead',
    image: '/execom/arya.jpeg',
    year: '25-26',
    isCurrent: false,
    linkedin: '#',
    github: '#',
  },
]

// ─── EVENTS DATA ─────────────────────────────────────────────────────────────
export type EventType = 'Hackathon' | 'Pitch Night' | 'Workshop' | 'Expo' | 'Bootcamp' | 'Networking'
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
  tagColor: string   // tailwind-style hex for pill bg
  tagTextColor: string
  registerLink?: string
  details?: string
  emoji?: string
  featured?: boolean
}

export const events: Event[] = [
  {
    id: 'hackforge-2025', day: '28', month: 'Apr', year: '2025',
    title: 'HackForge 2025 — 36hr Hackathon', shortTitle: 'HackForge 2025',
    venue: 'Main Auditorium',
    description: '36-hour hackathon to build anything that matters.',
    tag: 'Hackathon', tagColor: '#ef4444', tagTextColor: '#fff',
    emoji: '🎪',
    details: 'Join us for the ultimate 36-hour hackathon where innovation meets execution. HackForge 2025 brings together the brightest minds to build products that solve real problems. Five prize tracks, mentorship from industry veterans, and the chance to showcase your idea to investors. Whether you\'re a seasoned developer or a first-timer, this is your arena.',
    featured: true,
  },
  {
    id: 'pitch-perfect-2025', day: '05', month: 'May', year: '2025',
    title: 'Pitch Perfect — Investor Connect', shortTitle: 'Pitch Perfect',
    venue: 'Seminar Hall',
    description: 'Present your startup to angel investors and VCs.',
    tag: 'Pitch Night', tagColor: '#eab308', tagTextColor: '#1c1c1a',
    emoji: '🎤',
    details: 'A curated evening where early-stage startups pitch to a panel of angel investors, VCs, and industry veterans. Selected teams get 5-minute slots. Q&A and networking dinner follows.',
    featured: true,
  },
  {
    id: 'aiml-bootcamp-2025', day: '12', month: 'May', year: '2025',
    title: 'AI/ML Bootcamp — Foundations to Deployment', shortTitle: 'AI/ML Bootcamp',
    venue: 'Computer Lab 3',
    description: 'Foundations to Deployment — hands-on intensive.',
    tag: 'Bootcamp', tagColor: '#06b6d4', tagTextColor: '#fff',
    emoji: '🤖',
    details: 'A 2-day intensive covering ML fundamentals, model training, and deploying AI to production. Bring your laptop. All skill levels welcome. Certificate issued on completion.',
  },
  {
    id: 'demo-day-2025', day: '20', month: 'May', year: '2025',
    title: 'Startup Expo — Demo Day 2025', shortTitle: 'Startup Expo',
    venue: 'Open Ground',
    description: 'Demo Day 2025 — showcase to 500+ guests.',
    tag: 'Expo', tagColor: '#10b981', tagTextColor: '#fff',
    emoji: '🚀',
    details: 'The biggest event of the year. Teams present working prototypes to 500+ attendees including alumni, industry leaders, media, and potential investors. Judged across impact, innovation, and execution.',
    featured: true,
  },
  {
    id: 'design-sprint-2025', day: '27', month: 'May', year: '2025',
    title: 'Design Sprint Workshop', shortTitle: 'Design Sprint Workshop',
    venue: 'Innovation Lab',
    description: 'Learn Google\'s 5-day sprint framework in one day.',
    tag: 'Workshop', tagColor: '#8b5cf6', tagTextColor: '#fff',
    emoji: '✏️',
    details: 'An intensive one-day workshop on Google\'s Design Sprint methodology. You\'ll learn to define problems, ideate solutions, build prototypes, and test with real users — all in a single day.',
  },
  {
    id: 'fintech-forum-2025', day: '03', month: 'Jun', year: '2025',
    title: 'FinTech Forum 2025', shortTitle: 'FinTech Forum 2025',
    venue: 'Seminar Hall',
    description: 'Exploring the future of finance and payments in India.',
    tag: 'Workshop', tagColor: '#8b5cf6', tagTextColor: '#fff',
    emoji: '💳',
    details: 'A half-day forum exploring fintech trends, UPI ecosystem, and opportunities for student entrepreneurs in the financial technology space. Guest speakers from top fintech startups.',
  },
]

// ─── STATS ───────────────────────────────────────────────────────────────────
export const stats = [
  { value: 30, label: 'Events This Year' },
  { value: 12, label: 'Workshops Incoming' },
  { value: 10, label: 'Core Team Members' },
  { value: 100, label: 'Active Members', noAnimation: true },
]

// ─── JOURNEY STEPS ───────────────────────────────────────────────────────────
export const journeySteps = [
  { num: '01', title: 'Ideate', desc: 'Discover problems worth solving. Develop concepts with structured frameworks and peer feedback.' },
  { num: '02', title: 'Team Up', desc: 'Find co-founders with complementary skills. Build a team that shares your vision and drive.' },
  { num: '03', title: 'Build', desc: 'Prototype, iterate, test. Access tools, labs, and expert guidance to ship your MVP fast.' },
  { num: '04', title: 'Launch', desc: 'Pitch investors, win competitions, and take your startup into the real world with our backing.' },
]

// ─── FEATURES ────────────────────────────────────────────────────────────────
export const features = [
  { icon: '💡', title: 'Idea Board', desc: 'Submit, collaborate, and refine ideas in our open innovation sandbox. Every idea deserves an audience.', colorClass: 'fi-gold' },
  { icon: '🚀', title: 'Project Lab', desc: 'Dedicated workspace and compute resources for teams actively building breakthrough products.', colorClass: 'fi-green' },
  { icon: '🎯', title: 'Events', desc: 'Hackathons, bootcamps, pitch nights. Compete, connect and accelerate your startup at every stage.', colorClass: 'fi-muted' },
  { icon: '🧭', title: 'Mentorship', desc: 'Get paired with industry veterans and serial entrepreneurs who have been exactly where you are.', colorClass: 'fi-green' },
]

// ─── IDEA PROMPTS ─────────────────────────────────────────────────────────────
export const ideaPrompts = [
  { text: 'An AI-powered crop disease detection app for Kerala farmers using smartphone cameras.', tags: ['AgriTech', 'AI', 'Kerala', 'Mobile'], tagsType: ['g', 'g', 'y', 'g'] },
  { text: 'A peer-to-peer skill exchange platform where students trade knowledge without money.', tags: ['EdTech', 'Community', 'Web3', 'Barter'], tagsType: ['g', 'g', 'y', 'g'] },
  { text: 'Real-time traffic & flood routing for Kerala\'s monsoon season using IoT sensors.', tags: ['Smart City', 'IoT', 'Kerala', 'Safety'], tagsType: ['g', 'y', 'y', 'g'] },
  { text: 'A mental wellness app for engineering students with anonymous peer support & AI journaling.', tags: ['HealthTech', 'AI', 'B2C', 'SaaS'], tagsType: ['g', 'g', 'y', 'y'] },
  { text: 'Blockchain-based certificate verification system for Indian colleges, tamper-proof and instant.', tags: ['EdTech', 'Blockchain', 'B2B', 'Trust'], tagsType: ['g', 'y', 'y', 'g'] },
  { text: 'A hyperlocal gig marketplace connecting college students to micro-tasks in their campus area.', tags: ['Marketplace', 'FinTech', 'Campus', 'Gen Z'], tagsType: ['y', 'y', 'g', 'g'] },
  { text: 'AI tutor that adapts to Malayalam medium students transitioning to English-heavy engineering.', tags: ['EdTech', 'NLP', 'Kerala', 'Inclusive'], tagsType: ['g', 'g', 'y', 'g'] },
  { text: 'Solar-powered cold storage units for small-scale fishermen in coastal Kerala.', tags: ['CleanTech', 'AgriTech', 'Hardware', 'Impact'], tagsType: ['g', 'g', 'y', 'y'] },
]

// ─── MARQUEE ITEMS ────────────────────────────────────────────────────────────
export const marqueeItems = [
  'Hackathons', 'Startup Incubation', 'Mentorship Programs', 'Pitch Competitions',
  'Workshops', 'Networking Events', 'Innovation Lab',
]

// ─── SITE META ────────────────────────────────────────────────────────────────
export const siteMeta = {
  name: 'IEDC MGMCET',
  fullName: 'Innovation & Entrepreneurship Development Centre',
  college: 'MGM College of Engineering and Technology',
  location: 'Pampakuda, Ernakulam, Kerala',
  tagline: 'A launchpad for bold ideas. We turn curious minds into founders — through mentorship, community, and relentless execution.',
  socials: {
    instagram: '#',
    linkedin: '#',
    github: '#',
    email: 'iedc@mgmcet.ac.in',
  },
}