'use client'
import { useRef } from 'react'
import { cn } from '@/lib/utils'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'submit' | 'generate' | 'register'
}

export default function RippleButton({ variant = 'primary', className, children, onClick, ...props }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height) * 1.5
      const ripple = document.createElement('span')
      ripple.className = 'ripple'
      ripple.style.width = ripple.style.height = size + 'px'
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px'
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px'
      btnRef.current.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }
    onClick?.(e)
  }

  const variantClass = {
    primary: 'btn-primary',
    outline: 'btn-outline',
    submit: 'btn-submit',
    generate: 'btn-generate',
    register: 'btn-register',
  }[variant]

  return (
    <button ref={btnRef} className={cn(variantClass, className)} onClick={handleClick} {...props}>
      {variant === 'register' ? <span>{children}</span> : children}
    </button>
  )
}
