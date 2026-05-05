'use client'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// All valid routes in your app — add new ones here as you build them
const KNOWN_ROUTES = ['/', '/events', '/execom', '/submit-idea']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Check if current path matches any known route (including dynamic segments)
    const isKnownRoute = KNOWN_ROUTES.some(route =>
        pathname === route || pathname.startsWith(route + '/')
    )

    return (
        <>
            {isKnownRoute && <Navbar />}
            {children}
            {isKnownRoute && <Footer />}
        </>
    )
}