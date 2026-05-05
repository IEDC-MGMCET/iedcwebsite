import type { Metadata } from 'next'
import { submitIdeaMetadata } from '@/lib/metadata'
import SubmitIdeaClient from './SubmitIdeaClient'

export const metadata: Metadata = submitIdeaMetadata

export default function SubmitIdeaPage() {
  return <SubmitIdeaClient />
}
