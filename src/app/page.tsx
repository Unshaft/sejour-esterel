/**
 * « Où poser ses valises » — page unique du séjour.
 *
 * Le récit commence par le lieu de la fête (la Bastide, en photo), puis
 * déroule le carnet d'adresses filtrable, les conseils et l'accès — dans la
 * mise en page « carnet de voyage » du site de mariage : feuillets numérotés,
 * cachets « bon à savoir » tamponnés dans les marges.
 */

import type { ReactNode } from 'react'
import Image from 'next/image'
import { BedDouble, Car, CalendarClock, MapPin, Mail, Smartphone } from 'lucide-react'
import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import LogementsExplorer from '@/components/LogementsExplorer'
import { ScrollMain } from '@/components/ScrollMain'
import { FloralDivider, LeafDivider } from '@/components/Ornaments'
import { LOGEMENTS, ZONES } from '@/data/logements'
import { mapsUrl, sejour } from '@/lib/site'

const CONTACTS = [
  { name: 'Marianne', email: 'marianne.vincent@hotmail.fr', tel: '+33 6 49 62 56 52' },
  { name: 'Killian', email: 'killian.perzo@gmail.com', tel: '+33 6 95 58 61 78' },
]

export default function Page() {
  const parZone = ZONES.map((z) => ({
    ...z,
    total: LOGEMENTS.filter((l) => l.zone === z.id).length,
  }))

  return (
    <div className="min-h-screen bg-wedding-beige-light" id="haut">
      <SiteNav />

      <ScrollMain>
        {/* ── La Bastide, en ouverture ───────────────────────────────── */}
        <header className="relative">
          <div className="relative h-[58vh] min-h-[380px] md:h-[64vh] md:min-h-[460px] w-full overflow-hidden">
            <Image
              src="/images/bastide-hero.jpg"
              alt="Les tables dressées sous la véranda de la Bastide des Adrets"
              fill
              priority
              sizes="100vw"
              // Le tirage est vertical : sur écran large, on cadre le haut
              // (véranda et lanternes) plutôt que le flou du premier plan.
              className="object-cover"
              style={{ objectPosition: '50% 22%' }}
            />
            {/* Voile ivoire — le texte se lit en olive sur la photo, et la
                photo se fond dans le papier du reste de la page. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(244,242,233,0.55) 0%, rgba(244,242,233,0.24) 34%, rgba(244,242,233,0.78) 78%, #F4F2E9 100%)',
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 noise-texture pointer-events-none select-none"
              style={{ opacity: 0.05 }}
              aria-hidden="true"
            />

            <div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-7"
              style={{ textShadow: '0 1px 18px rgba(244,242,233,0.95), 0 1px 3px rgba(244,242,233,0.9)' }}
            >
              <p className="font-label text-[10px] md:text-[11px] font-medium uppercase tracking-[0.32em] text-wedding-vert-dark">
                {sejour.couple.prenom1} &amp; {sejour.couple.prenom2} · {sejour.date.full}
              </p>
              <h1
                className="font-heading text-wedding-text mt-4 leading-[1.05] drop-shadow-[0_1px_12px_rgba(244,242,233,0.9)]"
                style={{ fontSize: 'clamp(2.4rem, 7vw, 4.6rem)' }}
              >
                La Bastide des Adrets
              </h1>
              <p className="mt-4 font-label text-[10px] md:text-[11px] font-medium uppercase tracking-[0.28em] text-wedding-vert">
                Les Adrets-de-l&apos;Estérel · Var
              </p>
            </div>
          </div>

          {/* Le lieu de la fête ─────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto px-8 md:px-14 pt-4 pb-14 md:pb-20 text-center">
            <FloralDivider className="mb-9" />

            <h2
              className="font-heading text-wedding-text leading-[1.08]"
              style={{ fontSize: 'clamp(1.9rem, 5vw, 3rem)' }}
            >
              Où poser ses valises
            </h2>

            <p className="mt-5 text-wedding-text-light max-w-[56ch] mx-auto">
              Nous nous marions au cœur de l&apos;Estérel, dans une bastide du XVII<sup>e</sup> siècle
              posée entre pinèdes et collines rouges. La fête se termine tard et les routes sont
              sinueuses : mieux vaut dormir sur place. Nous avons donc parcouru la région pour vous —{' '}
              <strong className="font-semibold text-wedding-vert-dark">{LOGEMENTS.length} adresses</strong>,
              classées par temps de trajet depuis la Bastide.
            </p>

            <p className="mt-6 font-heading text-xl text-wedding-vert-dark">{sejour.lieu.nom}</p>
            <p className="text-sm text-wedding-text-light">{sejour.lieu.adresse}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
              {parZone.map((z) => (
                <a
                  key={z.id}
                  href="#logements"
                  className="group rounded-2xl border border-wedding-vert-dark/12 bg-white/60 px-5 py-5 text-left shadow-paper transition-colors hover:border-wedding-vert/45"
                >
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.26em] text-wedding-vert">
                    {z.court}
                  </p>
                  <p className="font-heading text-3xl text-wedding-vert-dark mt-2">{z.total}</p>
                  <p className="text-[13px] leading-snug text-wedding-text-light mt-1">{z.sous}</p>
                </a>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a href="#logements" className="btn-public btn-public-primary">
                <BedDouble className="w-4 h-4" aria-hidden="true" />
                Voir les hébergements
              </a>
              <a
                href={mapsUrl(sejour.lieu.adresse)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-public btn-public-outline"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Situer la Bastide
              </a>
            </div>
          </div>
        </header>

        {/* ── Le carnet d'adresses ───────────────────────────────────── */}
        <section id="logements" className="max-w-6xl mx-auto px-6 md:px-14 pt-10 md:pt-16 pb-20 scroll-mt-20">
          <div className="scroll-animate">
            <p className="font-label text-[11px] font-medium uppercase tracking-[0.32em] text-wedding-vert">
              Chapitre&nbsp;Ⅰ
            </p>
            <h2
              className="font-heading text-wedding-text mt-3 leading-[1.08]"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
            >
              Le carnet d&apos;adresses
            </h2>
            <p className="mt-4 text-wedding-text-light max-w-[58ch]">
              Filtrez par distance, budget ou type de logement, mettez de côté vos coups de cœur,
              puis réservez directement auprès de l&apos;établissement.
            </p>
          </div>

          <div className="mt-8">
            <LogementsExplorer />
          </div>
        </section>

        {/* ── Conseils ───────────────────────────────────────────────── */}
        <section
          id="conseils"
          className="border-t border-wedding-vert-dark/12 scroll-mt-24"
          style={{ backgroundColor: '#F0EBDD' }}
        >
          <div className="max-w-6xl mx-auto px-8 md:px-14 py-16 md:py-24">
            <div className="scroll-animate">
              <p className="font-label text-[11px] font-medium uppercase tracking-[0.32em] text-wedding-vert">
                Chapitre&nbsp;Ⅱ
              </p>
              <h2
                className="font-heading text-wedding-text mt-3 leading-[1.08]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
              >
                Bien préparer le week-end
              </h2>
            </div>

            <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-3">
              <Conseil
                icon={<CalendarClock className="w-5 h-5" aria-hidden="true" />}
                titre="Réservez tôt"
                className="scroll-animate"
              >
                Le 21 août, c&apos;est le plein cœur de la saison sur la Côte d&apos;Azur. Les
                meilleures adresses des Adrets partent un an à l&apos;avance — visez 9 à 12 mois
                avant, et privilégiez les annulations gratuites.
              </Conseil>

              <Conseil
                icon={<Car className="w-5 h-5" aria-hidden="true" />}
                titre="Prévoyez le retour"
                className="scroll-animate stagger-1"
              >
                La fête se termine tard et les routes de l&apos;Estérel sont sinueuses. Dormir à
                moins de 10 minutes reste la meilleure option ; sinon, désignez un conducteur ou
                réservez un VTC (Uber et Bolt couvrent Fréjus et Saint-Raphaël).
              </Conseil>

              <Conseil
                icon={<BedDouble className="w-5 h-5" aria-hidden="true" />}
                titre="Regroupez-vous"
                className="scroll-animate stagger-2"
              >
                Villas, gîtes et mobil-homes se partagent facilement à plusieurs familles : c&apos;est
                souvent moins cher qu&apos;une chambre d&apos;hôtel, et bien plus agréable pour le
                petit-déjeuner du dimanche.
              </Conseil>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="cachet -rotate-1 scroll-animate">
                <p className="font-label text-[9px] font-semibold uppercase tracking-[0.3em] text-wedding-vert mb-1.5">
                  Bon à savoir
                </p>
                <p className="text-sm text-wedding-text-light leading-relaxed">
                  Les indications de prix (€, €€, €€€) sont relatives et purement indicatives : les
                  tarifs varient selon les dates, la durée du séjour et les disponibilités en août 2027.
                </p>
              </div>
              <div className="cachet rotate-1 scroll-animate stagger-1">
                <p className="font-label text-[9px] font-semibold uppercase tracking-[0.3em] text-wedding-vert mb-1.5">
                  Bon à savoir
                </p>
                <p className="text-sm text-wedding-text-light leading-relaxed">
                  Aucune chambre n&apos;est pré-réservée en notre nom : chaque adresse se réserve
                  librement, par téléphone ou en ligne. Les temps de trajet sont donnés au départ
                  de la Bastide, hors circulation estivale.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Accès ──────────────────────────────────────────────────── */}
        <section id="acces" className="max-w-6xl mx-auto px-8 md:px-14 py-16 md:py-24 scroll-mt-24">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="scroll-animate order-2 md:order-1">
              <p className="font-label text-[11px] font-medium uppercase tracking-[0.32em] text-wedding-vert">
                Chapitre&nbsp;Ⅲ
              </p>
              <h2
                className="font-heading text-wedding-text mt-3 leading-[1.08]"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
              >
                Venir jusqu&apos;à la Bastide
              </h2>
              <p className="mt-4 text-wedding-text-light max-w-[52ch]">
                Toutes les distances de ce carnet sont mesurées depuis le lieu de la fête,
                au bord de la Nationale 7, entre Fréjus et Mandelieu.
              </p>

              <dl className="mt-8 space-y-4 border-t border-wedding-vert-dark/15 pt-6">
                <Trajet depuis="Autoroute A8" duree="sortie 38 Fréjus / Saint-Raphaël" />
                <Trajet depuis="Gare de Saint-Raphaël – Valescure" duree="≈ 20 min en voiture" />
                <Trajet depuis="Aéroport de Nice Côte d'Azur" duree="≈ 45 min par l'A8" />
                <Trajet depuis="Depuis Cannes" duree="≈ 25 min" />
                <Trajet depuis="Depuis Marseille" duree="≈ 1 h 30" />
              </dl>

              <a
                href={mapsUrl(sejour.lieu.adresse)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-public btn-public-outline btn-public-sm mt-8"
              >
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Ouvrir dans Google Maps
              </a>
            </div>

            {/* La photo, glissée dans le carnet comme un tirage ─────── */}
            <figure className="scroll-animate order-1 md:order-2 m-0 md:rotate-1">
              <div className="bg-white p-3 pb-4 shadow-paper">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/images/bastide-jardin.jpg"
                    alt="Le jardin de la Bastide des Adrets, lustre suspendu et hortensias"
                    fill
                    sizes="(max-width: 768px) 92vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-3 text-center font-hand text-lg text-wedding-text-light">
                  Les jardins, un soir d&apos;été
                </figcaption>
              </div>
            </figure>
          </div>
        </section>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <section id="contact" className="scroll-mt-24">
          <div className="relative overflow-hidden bg-gradient-cta">
            <div
              className="absolute inset-0 noise-texture pointer-events-none select-none"
              style={{ opacity: 0.04 }}
              aria-hidden="true"
            />
            <div className="relative max-w-3xl mx-auto px-8 py-16 md:py-20 text-center">
              <LeafDivider className="mb-8" color="#F4F2E9" />
              <h2 className="font-heading text-3xl md:text-4xl text-white">Une question sur le séjour ?</h2>
              <p className="mt-3 text-white/80 text-sm max-w-[46ch] mx-auto">
                Vous cherchez à vous regrouper avec d&apos;autres invités, ou une adresse vous
                laisse hésitant ? Écrivez-nous, on connaît le coin.
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 text-left">
                {CONTACTS.map(({ name, email, tel }) => (
                  <div key={name} className="border-t border-white/25 pt-4">
                    <p className="font-heading text-2xl text-white mb-3">{name}</p>
                    <p className="flex items-center gap-3 text-sm text-white/85">
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-white">
                        {email}
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-sm text-white/85 mt-2.5">
                      <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <a href={`tel:${tel.replace(/\s/g, '')}`} className="underline underline-offset-4 hover:text-white">
                        {tel}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollMain>

      <SiteFooter />
    </div>
  )
}

/* ── Pièces du carnet ────────────────────────────────────────────────── */

function Conseil({
  icon,
  titre,
  children,
  className = '',
}: {
  icon: ReactNode
  titre: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/70 text-wedding-vert border border-wedding-vert/20">
        {icon}
      </span>
      <h3 className="font-heading text-2xl text-wedding-vert-dark mt-4">{titre}</h3>
      <p className="mt-2 text-wedding-text-light leading-relaxed">{children}</p>
    </div>
  )
}

function Trajet({ depuis, duree }: { depuis: string; duree: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 items-baseline text-sm border-b border-wedding-vert-dark/10 pb-3">
      <dt className="italic text-wedding-vert-dark">{depuis}</dt>
      <dd className="m-0 text-right text-wedding-text-light">{duree}</dd>
    </div>
  )
}
