import { Heart } from 'lucide-react'
import { BrandLogo, LeafDivider } from './Ornaments'
import { sejour } from '@/lib/site'

export default function SiteFooter() {
  return (
    <footer className="py-12 px-6 border-t border-wedding-vert/10" style={{ backgroundColor: '#ECE3D2' }}>
      <div className="max-w-3xl mx-auto text-center">
        <LeafDivider className="mb-8" color="#7E8A63" />

        <div className="flex justify-center mb-6">
          <BrandLogo size={60} color="#586049" />
        </div>

        <p className="font-heading text-3xl md:text-4xl text-wedding-vert-dark mb-2">
          {sejour.couple.prenom1} &amp; {sejour.couple.prenom2}
        </p>
        <p className="text-wedding-text-light text-sm tracking-widest uppercase mb-5">
          {sejour.date.full} · {sejour.lieu.ville}
        </p>

        <p className="text-wedding-text-light/80 text-xs mb-8 leading-relaxed max-w-[46ch] mx-auto">
          Les hébergements listés ici ne sont ni réservés ni négociés par nos soins : chacun
          réserve de son côté, au tarif et aux conditions de l&apos;établissement.
        </p>

        <p className="text-wedding-text-light/70 text-[11px] mb-5">
          Photographies du domaine ·{' '}
          <a
            href="https://www.bastidedesadrets.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-wedding-vert-dark"
          >
            bastidedesadrets.com
          </a>
        </p>

        <div className="flex items-center justify-center gap-2 text-wedding-text-light text-xs">
          <Heart className="w-3 h-3 text-wedding-peach" fill="currentColor" strokeWidth={0} />
          <span>
            {sejour.date.annee} · {sejour.lieu.ville}
          </span>
        </div>
      </div>
    </footer>
  )
}
