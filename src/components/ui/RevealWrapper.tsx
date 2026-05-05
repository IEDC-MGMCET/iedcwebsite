'use client'
import { useEffect } from 'react'

export default function RevealWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const observe = () => {
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        observer.observe(el)
      })
    }

    observe()
    // re-observe after a tick for dynamically rendered elements
    const t = setTimeout(observe, 300)
    return () => { observer.disconnect(); clearTimeout(t) }
  }, [])

  return <>{children}</>
}
