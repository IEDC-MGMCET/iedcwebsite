import type { Metadata } from 'next'
import { eventsMetadata } from '@/lib/metadata'
import EventsClient from './EventsClient'

export const metadata: Metadata = eventsMetadata

export default function EventsPage() {
  return <EventsClient />
}