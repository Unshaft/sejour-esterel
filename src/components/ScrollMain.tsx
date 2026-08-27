'use client'

import type { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/**
 * Wrapper client minimal — fournit le ref IntersectionObserver pour les
 * animations `scroll-animate` ; les enfants restent rendus côté serveur.
 */
export function ScrollMain({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useScrollAnimation<HTMLElement>()
  return (
    <main ref={ref} className={className}>
      {children}
    </main>
  )
}
