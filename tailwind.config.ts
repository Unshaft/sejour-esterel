import type { Config } from 'tailwindcss'

/**
 * Palette et typographie reprises à l'identique du site de mariage
 * (site-mariage-v3, direction artistique « La Correspondance ») :
 * pêche = geste d'action, olive = accent, champagne/ivoire = fond.
 */
const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wedding: {
          peach: '#E48A6B',
          'peach-light': '#F4C7B1',
          rose: '#F0A98C',
          'rose-light': '#F6DBCB',
          vert: '#7E8A63',
          'vert-dark': '#586049',
          'vert-light': '#A7B28E',
          beige: '#CDBA9B',
          'beige-light': '#F4F2E9',
          text: '#36342A',
          'text-light': '#8A8473',
        },
      },
      fontFamily: {
        heading: ['var(--font-display)', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Garamond', 'Georgia', 'serif'],
        label: ['var(--font-label)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-hand)', 'Bradley Hand', 'cursive'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
