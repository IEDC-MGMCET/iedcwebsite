import type { Metadata } from 'next'

const BASE_URL = 'https://iedc.mgmcet.ac.in'

const sharedKeywords = [
  'IEDC MGMCET',
  'IEDC MGM CET',
  'IEDC Pampakuda',
  'iedc mgmcet',
  'iedc mgm cet',
  'iedc pampakuda',
  'IEDC mgmcet',
  'IEDC mgm cet',
  'iedc MGMCET',
  'iedc MGM CET',
  'iedc Pampakuda',
  'Innovation Entrepreneurship Development Centre',
  'MGM College of Engineering and Technology',
  'Pampakuda',
  'Kerala startup',
  'student startup Kerala',
  'IEDC Kerala',
  'engineering college startup cell',
  'KSUM',
  'startup incubation Kerala',
  'hackathon Kerala college',
  'student innovation cell',
  'MGMCET',
  'MGMCET Pampakuda',
  'Ernakulam startup',
]

export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    template: '%s — IEDC MGMCET',
  },
  description:
    'IEDC MGMCET is the official Innovation & Entrepreneurship Development Centre at MGM College of Engineering and Technology, Pampakuda. Join Kerala\'s most active student startup cell — hackathons, mentorship, pitch nights, and more.',
  keywords: sharedKeywords,
  authors: [{ name: 'IEDC MGMCET', url: BASE_URL }],
  creator: 'IEDC MGMCET',
  publisher: 'IEDC MGMCET',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'IEDC MGMCET',
    title: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    description:
      'The official student startup cell at MGM College of Engineering and Technology, Pampakuda, Kerala. Hackathons, mentorship, pitch nights and more.',
    images: [
      {
        url: '/og-image.png', // create a 1200x630 branded image and put in /public
        width: 1200,
        height: 630,
        alt: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    description:
      'The official student startup cell at MGM College of Engineering and Technology, Pampakuda, Kerala.',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'education',
}

// ─── Per-page metadata helpers ────────────────────────────────────────────────

export const eventsMetadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming hackathons, pitch nights, workshops, and bootcamps at IEDC MGMCET. Register now and accelerate your startup journey at MGM College of Engineering and Technology, Pampakuda.',
  keywords: [
    ...sharedKeywords,
    'hackathon 2026 Kerala',
    'pitch night college Kerala',
    'startup workshop Ernakulam',
    'Hackrush 2026',
    'demo day MGMCET',
  ],
  alternates: { canonical: `${BASE_URL}/events` },
  openGraph: {
    url: `${BASE_URL}/events`,
    title: 'Events — IEDC MGMCET',
    description: 'Hackathons, bootcamps, pitch nights and more at IEDC MGMCET, Pampakuda, Kerala.',
  },
}

export const execomMetadata: Metadata = {
  title: 'Executive Committee',
  description:
    'Meet the student leaders driving innovation at IEDC MGMCET — the Executive Committee of MGM College of Engineering and Technology\'s startup cell, Pampakuda, Kerala.',
  keywords: [
    ...sharedKeywords,
    'IEDC execom',
    'student leaders Kerala engineering',
    'MGMCET student committee',
  ],
  alternates: { canonical: `${BASE_URL}/execom` },
  openGraph: {
    url: `${BASE_URL}/execom`,
    title: 'Executive Committee — IEDC MGMCET',
    description: 'Meet the team behind IEDC MGMCET — builders, designers, strategists and dreamers.',
  },
}

export const submitIdeaMetadata: Metadata = {
  title: 'Submit Your Startup Idea',
  description:
    'Have a startup idea? Submit it to IEDC MGMCET and get access to mentorship, lab resources, and funding opportunities at MGM College of Engineering and Technology, Pampakuda, Kerala.',
  keywords: [
    ...sharedKeywords,
    'submit startup idea Kerala',
    'student startup idea submission',
    'IEDC idea portal',
    'startup mentorship Kerala college',
  ],
  alternates: { canonical: `${BASE_URL}/submit-idea` },
  openGraph: {
    url: `${BASE_URL}/submit-idea`,
    title: 'Submit Your Startup Idea — IEDC MGMCET',
    description: 'Share your idea with IEDC MGMCET and get mentorship, resources, and a launchpad.',
  },
}
