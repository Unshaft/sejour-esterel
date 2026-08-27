'use client'

import { useEffect, useRef } from 'react'

/**
 * Révèle les éléments `.scroll-animate` contenus dans le nœud référencé,
 * au premier passage dans le viewport. Repris du site de mariage.
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(options: {
  threshold?: number
  rootMargin?: string
} = {}) {
  const ref = useRef<T>(null)
  const { threshold = 0.12, rootMargin = '0px 0px -40px 0px' } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    element.querySelectorAll('.scroll-animate').forEach((target) => observer.observe(target))
    if (element.classList.contains('scroll-animate')) observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return ref
}
