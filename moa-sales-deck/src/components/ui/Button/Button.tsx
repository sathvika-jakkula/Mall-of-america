import { type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

interface Props {
  children: ReactNode
  onClick?: () => void
  variant?: 'gold' | 'outline' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function Button({ children, onClick, variant = 'gold', className, type = 'button', disabled }: Props) {
  const base = 'inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-all duration-300 disabled:opacity-40'
  const variants = {
    gold: 'bg-[var(--color-moa-gold)] text-[var(--color-moa-navy)] px-8 py-4 hover:bg-[var(--color-moa-gold-light)]',
    outline: 'border border-[var(--color-moa-gold)] text-[var(--color-moa-gold)] px-8 py-4 hover:bg-[var(--color-moa-gold)] hover:text-[var(--color-moa-navy)]',
    ghost: 'text-[var(--color-moa-cream)] hover:text-[var(--color-moa-gold)] px-0 py-2 border-b border-transparent hover:border-[var(--color-moa-gold)]',
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  )
}
