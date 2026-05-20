import { forwardRef, type ReactNode } from 'react'
import { cn } from '../../utils/cn'
import type { SectionId } from '../../types'

interface Props {
  id: SectionId
  children: ReactNode
  className?: string
  dark?: boolean
}

const SectionWrapper = forwardRef<HTMLElement, Props>(
  ({ id, children, className, dark = true }, ref) => (
    <section
      ref={ref}
      id={id}
      data-section
      className={cn(
        'section relative w-full',
        dark ? 'bg-[var(--color-moa-navy)]' : 'bg-[var(--color-moa-navy-light)]',
        className
      )}
    >
      {children}
    </section>
  )
)
SectionWrapper.displayName = 'SectionWrapper'
export default SectionWrapper
