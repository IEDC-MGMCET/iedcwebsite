import type { Metadata } from 'next'
import { Bebas_Neue, Syne, DM_Mono } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import Cursor from '@/components/layout/Cursor'
import Loader from '@/components/layout/Loader'
import ProgressBar from '@/components/layout/ProgressBar'
import { siteMeta } from '@/data'
import { defaultMetadata } from '@/lib/metadata'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

// Fonts via next/font
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

// Root metadata 
export const metadata: Metadata = {
  ...defaultMetadata,
  title: `${siteMeta.name} — ${siteMeta.fullName}`,
  description: siteMeta.tagline,
}

// JSON-LD structured data 
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'IEDC MGMCET',
  alternateName: ['IEDC MGM CET', 'Innovation & Entrepreneurship Development Centre MGMCET'],
  url: 'https://iedc.mgmcet.ac.in',
  logo: {
    '@type': 'ImageObject',
    url: 'https://iedc.mgmcet.ac.in/IEDC_logo.png',
    width: 512,
    height: 512,
  },
  image: 'https://iedc.mgmcet.ac.in/og-image.png',
  description: siteMeta.tagline,
  foundingDate: '2024',
  email: 'iedc@mgmcet.ac.in',
  sameAs: [
    'https://instagram.com/mgmcet_iedc',
    'https://linkedin.com/company/iedc-mgmcet',
    'https://github.com/iedc-mgmcet',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'MGM College of Engineering and Technology',
    addressLocality: 'Pampakuda',
    addressRegion: 'Kerala',
    postalCode: '686667',
    addressCountry: 'IN',
  },
  parentOrganization: {
    '@type': 'CollegeOrUniversity',
    name: 'MGM College of Engineering and Technology',
    url: 'https://mgmcet.ac.in',
  },
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'IEDC MGMCET',
  url: 'https://iedc.mgmcet.ac.in',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://iedc.mgmcet.ac.in/events?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${syne.variable} ${dmMono.variable}`}
    >
      <head>
        <meta name="apple-mobile-web-app-title" content="IEDC MGME" />
        {/* Preconnect to Cloudinary CDN */}
        <link rel="preconnect" href="https://res.cloudinary.com" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Loader />
        <ProgressBar />
        <Cursor />
        <ConditionalLayout>
          <main>{children}</main>
        </ConditionalLayout>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}