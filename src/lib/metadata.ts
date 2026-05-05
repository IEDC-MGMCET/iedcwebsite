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

// ─── Root / default metadata ──────────────────────────────────────────────────
export const defaultMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    template: '%s — IEDC MGMCET',
  },
  description:
    "The official Innovation & Entrepreneurship Development Centre at MGM College of Engineering and Technology, Pampakuda. Join Kerala's most active student startup cell — hackathons, mentorship, pitch nights, and more.",

  keywords: sharedKeywords,
  authors: [{ name: 'IEDC MGMCET', url: BASE_URL }],
  creator: 'IEDC MGMCET',
  publisher: 'IEDC MGMCET',

  // Canonical
  alternates: {
    canonical: BASE_URL,
  },

  // Indexing
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

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'IEDC MGMCET',
    title: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    description:
      "The official student startup cell & Innovation Centre at MGM College of Engineering and Technology, Pampakuda, Kerala. Hackathons, mentorship, pitch nights and more.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
        type: 'image/png',
      },
    ],
  },

  // Twitter / X
  twitter: {
    card: 'summary_large_image',
    site: '@iedc_mgmcet',
    creator: '@iedc_mgmcet',
    title: 'IEDC MGMCET — Innovation & Entrepreneurship Development Centre',
    description:
      "The official student startup cell & Innovation Centre at MGM College of Engineering and Technology, Pampakuda, Kerala.",
    images: [`${BASE_URL}/og-image.png`],
  },

  // Verification (add tokens from Google Search Console / Bing Webmaster)
  verification: {
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
    // other: { 'msvalidate.01': 'YOUR_BING_TOKEN' },
  },

  category: 'education',
}

// ─── Per-page metadata ────────────────────────────────────────────────────────

export const eventsMetadata: Metadata = {
  title: 'Events',
  description:
    'Upcoming hackathons, workshops, and bootcamps at IEDC MGMCET. Register now and accelerate your startup journey at MGM College of Engineering and Technology, Pampakuda.',
  keywords: [
    ...sharedKeywords,
    'hackathon 2025 Kerala',
    'hackathon 2026 Kerala',
    'startup workshop Ernakulam',
    'HackRush 2026',
    'demo day MGMCET',
    'student events Pampakuda',
  ],
  alternates: { canonical: `${BASE_URL}/events` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/events`,
    siteName: 'IEDC MGMCET',
    title: 'Events — IEDC MGMCET',
    description: 'Hackathons, bootcamps, Workshops and more at IEDC MGMCET, Pampakuda, Kerala.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IEDC MGMCET Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events — IEDC MGMCET',
    description: 'Hackathons, bootcamps, Workshops at IEDC MGMCET, Pampakuda, Kerala.',
    images: [`${BASE_URL}/og-image.png`],
  },
}

export const execomMetadata: Metadata = {
  title: 'Executive Committee',
  description:
    "Meet the student leaders driving innovation at IEDC MGMCET — the Executive Committee of MGM College of Engineering and Technology's startup cell, Pampakuda, Kerala.",
  keywords: [
    ...sharedKeywords,
    'IEDC execom',
    'student leaders Kerala engineering',
    'MGMCET student committee',
    'IEDC 2026 team',
  ],
  alternates: { canonical: `${BASE_URL}/execom` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/execom`,
    siteName: 'IEDC MGMCET',
    title: 'Executive Committee — IEDC MGMCET',
    description: 'Meet the team behind IEDC MGMCET — builders, designers, strategists and dreamers.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'IEDC MGMCET Executive Committee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Executive Committee — IEDC MGMCET',
    description: 'Meet the team behind IEDC MGMCET.',
    images: [`${BASE_URL}/og-image.png`],
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
    'startup funding Kerala student',
  ],
  alternates: { canonical: `${BASE_URL}/submit-idea` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/submit-idea`,
    siteName: 'IEDC MGMCET',
    title: 'Submit Your Startup Idea — IEDC MGMCET',
    description: 'Share your idea with IEDC MGMCET and get mentorship, resources, and a launchpad.',
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Submit Startup Idea — IEDC MGMCET',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Your Startup Idea — IEDC MGMCET',
    description: 'Share your idea with IEDC MGMCET and get mentorship, resources, and a launchpad.',
    images: [`${BASE_URL}/og-image.png`],
  },
}

// ─── JSON-LD helpers for per-page use ─────────────────────────────────────────
// Import and drop <script> tag in page-level layout or page.tsx

export const eventsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventSeries',
  name: 'IEDC MGMCET Events',
  organizer: {
    '@type': 'Organization',
    name: 'IEDC MGMCET',
    url: BASE_URL,
  },
  location: {
    '@type': 'Place',
    name: 'MGM College of Engineering and Technology',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pampakuda',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
  },
}

export const submitIdeaJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Submit Your Startup Idea — IEDC MGMCET',
  description: 'Submit your startup idea to IEDC MGMCET for mentorship and incubation support.',
  url: `${BASE_URL}/submit-idea`,
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Submit Idea', item: `${BASE_URL}/submit-idea` },
    ],
  },
}