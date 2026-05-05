import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/layout/ConditionalLayout'
import Cursor from '@/components/layout/Cursor'
import Loader from '@/components/layout/Loader'
import ProgressBar from '@/components/layout/ProgressBar'
import { siteMeta } from '@/data'

export const metadata: Metadata = {
  title: `${siteMeta.name} — ${siteMeta.fullName}`,
  description: siteMeta.tagline,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <ProgressBar />
        <Cursor />
        <ConditionalLayout>
          <main>{children}</main>
        </ConditionalLayout>
      </body>
    </html>
  )
}