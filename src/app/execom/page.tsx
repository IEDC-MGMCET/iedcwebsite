import type { Metadata } from 'next'
import { execomMetadata } from '@/lib/metadata'
import ExecomClient from './ExecomClient'

export const metadata: Metadata = execomMetadata

export default function ExecomPage() {
  return <ExecomClient />
}
