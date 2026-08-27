import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Cormorant_Garamond, Jost, La_Belle_Aurore } from 'next/font/google'
import './globals.css'

// Typographie « La Correspondance » — identique au site de mariage :
// display italique (Bodoni Moda), corps Cormorant Garamond,
// étiquettes sans-serif espacé (Jost), annotations manuscrites (La Belle Aurore).
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  style: ['italic'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
})

const laBelleAurore = La_Belle_Aurore({
  subsets: ['latin'],
  variable: '--font-hand',
  display: 'swap',
  weight: '400',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#586049',
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://sejour-esterel.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Où dormir — Mariage Marianne & Killian',
  description:
    "130 hébergements sélectionnés autour des Adrets-de-l'Estérel pour le week-end du mariage de Marianne & Killian, le 21 août 2027.",
  icons: {
    icon: '/images/logo.svg',
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
  openGraph: {
    title: 'Où dormir — Mariage Marianne & Killian',
    description:
      "Hôtels, gîtes, chambres d'hôtes, campings et villas autour de la Bastide, classés par temps de trajet.",
    url: BASE_URL,
    siteName: 'Séjour Estérel — Marianne & Killian',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body
        className={`${bodoni.variable} ${cormorant.variable} ${jost.variable} ${laBelleAurore.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
