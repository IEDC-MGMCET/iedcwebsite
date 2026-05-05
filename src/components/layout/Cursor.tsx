'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rxRef = useRef(0)
  const ryRef = useRef(0)
  const mxRef = useRef(0)
  const myRef = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mxRef.current = e.clientX
      myRef.current = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }
    document.addEventListener('mousemove', onMove)

    let raf: number
    const animRing = () => {
      rxRef.current += (mxRef.current - rxRef.current) * 0.11
      ryRef.current += (myRef.current - ryRef.current) * 0.11
      if (ringRef.current) {
        ringRef.current.style.left = rxRef.current + 'px'
        ringRef.current.style.top = ryRef.current + 'px'
      }
      raf = requestAnimationFrame(animRing)
    }
    raf = requestAnimationFrame(animRing)

    const grow = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '18px'; cursorRef.current.style.height = '18px' }
      if (ringRef.current) { ringRef.current.style.width = '52px'; ringRef.current.style.height = '52px'; ringRef.current.style.opacity = '1' }
    }
    const shrink = () => {
      if (cursorRef.current) { cursorRef.current.style.width = '10px'; cursorRef.current.style.height = '10px' }
      if (ringRef.current) { ringRef.current.style.width = '36px'; ringRef.current.style.height = '36px'; ringRef.current.style.opacity = '0.55' }
    }

    const interactiveEls = () => document.querySelectorAll('a, button, .card')
    const addListeners = () => {
      interactiveEls().forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
    }
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cursor" ref={cursorRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
