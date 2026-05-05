import type { Metadata } from 'next'
import EventsClient from  './EventsClient'

export const metadata: Metadata = {
  title: 'Events — IEDC MGMCET',
  description: 'Upcoming and past events at IEDC MGMCET — hackathons, pitch nights, workshops, and more.',
}

export default function EventsPage() {
  return <EventsClient />
}