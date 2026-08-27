/**
 * Ornements SVG botaniques — repris du site de mariage (Ornaments.tsx),
 * pour garder exactement les mêmes filets décoratifs entre les sections.
 */

interface OrnamentProps {
  className?: string
  color?: string
}

export function FloralDivider({ className = '', color = '#586049' }: OrnamentProps) {
  return (
    <div className={`ornament-divider ${className}`} aria-hidden="true">
      <svg width="96" height="48" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="20" rx="6" ry="8" fill={color} opacity="0.55" />
        <ellipse cx="40" cy="20" rx="8" ry="6" fill={color} opacity="0.55" />
        <circle cx="40" cy="20" r="3" fill={color} opacity="0.85" />
        <path d="M34 20 Q20 14 4 18" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
        <ellipse cx="16" cy="14" rx="4" ry="6" fill={color} opacity="0.35" transform="rotate(-30 16 14)" />
        <ellipse cx="8" cy="17" rx="3" ry="5" fill={color} opacity="0.35" transform="rotate(-15 8 17)" />
        <path d="M46 20 Q60 14 76 18" stroke={color} strokeWidth="1.5" fill="none" opacity="0.7" />
        <ellipse cx="64" cy="14" rx="4" ry="6" fill={color} opacity="0.35" transform="rotate(30 64 14)" />
        <ellipse cx="72" cy="17" rx="3" ry="5" fill={color} opacity="0.35" transform="rotate(15 72 17)" />
        <path d="M24 16 Q22 12 26 12 Q24 14 24 16Z" fill={color} opacity="0.55" />
        <path d="M56 16 Q58 12 54 12 Q56 14 56 16Z" fill={color} opacity="0.55" />
      </svg>
    </div>
  )
}

export function LeafDivider({ className = '', color = '#586049' }: OrnamentProps) {
  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      <svg width="160" height="32" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="12" r="2" fill={color} opacity="0.85" />
        <path d="M56 12 Q40 12 10 12" stroke={color} strokeWidth="1" fill="none" opacity="0.65" />
        <path d="M48 12 Q46 6 42 8 Q46 9 48 12Z" fill={color} opacity="0.5" />
        <path d="M38 12 Q36 6 32 8 Q36 9 38 12Z" fill={color} opacity="0.5" />
        <path d="M28 12 Q26 6 22 8 Q26 9 28 12Z" fill={color} opacity="0.5" />
        <path d="M48 12 Q46 18 42 16 Q46 15 48 12Z" fill={color} opacity="0.5" />
        <path d="M38 12 Q36 18 32 16 Q36 15 38 12Z" fill={color} opacity="0.5" />
        <path d="M64 12 Q80 12 110 12" stroke={color} strokeWidth="1" fill="none" opacity="0.65" />
        <path d="M72 12 Q74 6 78 8 Q74 9 72 12Z" fill={color} opacity="0.5" />
        <path d="M82 12 Q84 6 88 8 Q84 9 82 12Z" fill={color} opacity="0.5" />
        <path d="M92 12 Q94 6 98 8 Q94 9 92 12Z" fill={color} opacity="0.5" />
        <path d="M72 12 Q74 18 78 16 Q74 15 72 12Z" fill={color} opacity="0.5" />
        <path d="M82 12 Q84 18 88 16 Q84 15 82 12Z" fill={color} opacity="0.5" />
      </svg>
    </div>
  )
}

/**
 * Logo de marque recolorable — le PNG alpha sert de masque sur un aplat
 * de couleur (voir `.brand-logo-mask` dans globals.css).
 */
export function BrandLogo({
  size = 80,
  color = '#586049',
  className = '',
}: {
  size?: number
  color?: string
  className?: string
}) {
  return (
    <div
      role="img"
      aria-label="Logo Marianne & Killian"
      className={`brand-logo-mask ${className}`}
      style={{ width: size, height: size, color }}
    />
  )
}
