'use client'

/**
 * Navigation — disposition « faire-part » du site de mariage : liens répartis
 * symétriquement autour du logo centré, en petites capitales espacées.
 * Le site tient sur une page : les liens sont des ancres.
 */

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandLogo } from './Ornaments'

const LINKS = [
  { href: '#logements', label: 'Où dormir' },
  { href: '#conseils', label: 'Conseils' },
  { href: '#acces', label: 'Accès' },
  { href: '#contact', label: 'Contact' },
]
const LEFT = LINKS.slice(0, 2)
const RIGHT = LINKS.slice(2)

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-wedding-beige-light/85 backdrop-blur-md border-b border-wedding-vert/15 transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_20px_rgba(88,96,73,0.06)]' : 'shadow-none'
      }`}
    >
      {/* ── Desktop ─────────────────────────────────────────────────── */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center h-20 max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-end gap-9">
          {LEFT.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>

        <a
          href="#haut"
          aria-label="Haut de page"
          className="group mx-8 flex items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-vert focus-visible:ring-offset-2"
        >
          <BrandLogo size={42} color="#586049" className="transition-transform duration-300 group-hover:scale-105" />
        </a>

        <div className="flex items-center justify-start gap-9">
          {RIGHT.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </div>
      </div>

      {/* ── Mobile ──────────────────────────────────────────────────── */}
      <div className="md:hidden relative flex items-center justify-center h-16 px-4">
        <a href="#haut" aria-label="Haut de page" className="flex items-center">
          <BrandLogo size={36} color="#586049" />
        </a>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="absolute right-3 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-wedding-vert-dark transition-transform duration-100 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-vert"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden overflow-hidden border-t border-wedding-vert/10 bg-wedding-beige-light animate-fade-in">
          <div className="px-6 py-4 space-y-1 text-center">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 font-label font-medium text-sm uppercase tracking-[0.2em] rounded-lg text-wedding-text-light hover:text-wedding-vert-dark transition-colors active:scale-95"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="relative font-label font-medium text-[11px] uppercase tracking-[0.22em] whitespace-nowrap py-1 rounded text-wedding-text-light hover:text-wedding-vert-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-vert focus-visible:ring-offset-2"
    >
      {label}
    </a>
  )
}
