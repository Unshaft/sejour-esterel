'use client'

/**
 * « Le carnet d'adresses » — la liste filtrable des hébergements.
 *
 * Toute la donnée est statique (src/data/logements.ts) : le filtrage se fait
 * côté client, sans requête réseau, pour rester instantané au doigt sur mobile.
 */

import { useEffect, useMemo, useState } from 'react'
import { Heart, MapPin, Route, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  CATEGORIES,
  LOGEMENTS,
  PRIX_LABELS,
  ZONES,
  type Categorie,
  type Logement,
  type ZoneId,
} from '@/data/logements'
import { bookingUrl, itineraireUrl, mapsUrl } from '@/lib/site'

const FAVORIS_KEY = 'sejour-esterel:favoris'

/** Minuscules sans accents — pour que « frejus » trouve « Fréjus ». */
function normalise(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export default function LogementsExplorer() {
  const [recherche, setRecherche] = useState('')
  const [zone, setZone] = useState<ZoneId | 'toutes'>('toutes')
  const [prix, setPrix] = useState<Set<1 | 2 | 3>>(new Set())
  const [categories, setCategories] = useState<Set<Categorie>>(new Set())
  const [favorisSeuls, setFavorisSeuls] = useState(false)
  const [filtresOuverts, setFiltresOuverts] = useState(false)
  const [favoris, setFavoris] = useState<Set<string>>(new Set())

  // Les favoris ne vivent que dans le navigateur de l'invité : rien n'est
  // envoyé nulle part, et l'absence de stockage (navigation privée) ne doit
  // jamais empêcher la page de s'afficher.
  useEffect(() => {
    try {
      const brut = localStorage.getItem(FAVORIS_KEY)
      if (brut) setFavoris(new Set(JSON.parse(brut) as string[]))
    } catch {
      /* stockage indisponible — on continue sans favoris mémorisés */
    }
  }, [])

  function basculerFavori(id: string) {
    setFavoris((precedents) => {
      const suivants = new Set(precedents)
      if (suivants.has(id)) suivants.delete(id)
      else suivants.add(id)
      try {
        localStorage.setItem(FAVORIS_KEY, JSON.stringify([...suivants]))
      } catch {
        /* idem — le filtre reste fonctionnel le temps de la visite */
      }
      return suivants
    })
  }

  const resultats = useMemo(() => {
    const termes = normalise(recherche).split(/\s+/).filter(Boolean)

    return LOGEMENTS.filter((l) => {
      if (zone !== 'toutes' && l.zone !== zone) return false
      if (prix.size > 0 && !prix.has(l.prix)) return false
      if (categories.size > 0 && !categories.has(l.categorie)) return false
      if (favorisSeuls && !favoris.has(l.id)) return false
      if (termes.length === 0) return true
      const foin = normalise(`${l.nom} ${l.ville} ${l.type} ${l.adresse}`)
      return termes.every((t) => foin.includes(t))
    }).sort((a, b) => a.prix - b.prix || a.nom.localeCompare(b.nom, 'fr'))
  }, [recherche, zone, prix, categories, favorisSeuls, favoris])

  const groupes = useMemo(
    () =>
      ZONES.map((z) => ({ zone: z, items: resultats.filter((l) => l.zone === z.id) })).filter(
        (g) => g.items.length > 0
      ),
    [resultats]
  )

  const nbFiltres =
    (zone !== 'toutes' ? 1 : 0) + prix.size + categories.size + (favorisSeuls ? 1 : 0) + (recherche ? 1 : 0)

  function reinitialiser() {
    setRecherche('')
    setZone('toutes')
    setPrix(new Set())
    setCategories(new Set())
    setFavorisSeuls(false)
  }

  return (
    <div>
      {/* ── La barre de tri, épinglée sous la navigation ─────────────── */}
      <div className="sticky top-16 md:top-20 z-40 -mx-6 px-6 py-3 bg-wedding-beige-light/95 backdrop-blur-md border-y border-wedding-vert-dark/10">
        <div className="max-w-6xl mx-auto space-y-3">
          {/* Recherche */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-wedding-vert"
              aria-hidden="true"
            />
            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Un nom, une ville, un type…"
              aria-label="Rechercher un hébergement"
              className="w-full min-h-[48px] rounded-full border border-wedding-vert-dark/20 bg-white/70 pl-11 pr-11 text-[15px] text-wedding-text placeholder:text-wedding-text-light/70 focus:outline-none focus:border-wedding-vert focus:ring-2 focus:ring-wedding-vert/25"
            />
            {recherche && (
              <button
                type="button"
                onClick={() => setRecherche('')}
                aria-label="Effacer la recherche"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full text-wedding-text-light hover:text-wedding-vert-dark"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Zones — le critère principal. La rangée défile sous le doigt ;
              le bouton « Filtres » reste, lui, toujours atteignable à droite. */}
          <div className="flex items-center gap-2">
            <div className="flex-1 min-w-0 flex gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setZone('toutes')}
                className={`chip shrink-0 ${zone === 'toutes' ? 'chip-on' : 'chip-off'}`}
              >
                Toutes
              </button>
              {ZONES.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => setZone(zone === z.id ? 'toutes' : z.id)}
                  className={`chip shrink-0 ${zone === z.id ? 'chip-on' : 'chip-off'}`}
                >
                  {z.court}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setFiltresOuverts((o) => !o)}
              aria-expanded={filtresOuverts}
              className={`chip shrink-0 ${filtresOuverts || prix.size + categories.size > 0 ? 'chip-on' : 'chip-off'}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
              Filtres
              {prix.size + categories.size > 0 && <span>{prix.size + categories.size}</span>}
            </button>
          </div>

          {/* Prix, catégories, favoris */}
          {filtresOuverts && (
            <div className="space-y-3 pt-1 animate-fade-in">
              <FiltreLigne titre="Budget">
                {([1, 2, 3] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() =>
                      setPrix((s) => {
                        const n = new Set(s)
                        if (n.has(p)) n.delete(p)
                        else n.add(p)
                        return n
                      })
                    }
                    aria-label={PRIX_LABELS[p]}
                    className={`chip ${prix.has(p) ? 'chip-on' : 'chip-off'}`}
                  >
                    {'€'.repeat(p)}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setFavorisSeuls((v) => !v)}
                  className={`chip ${favorisSeuls ? 'chip-on' : 'chip-off'}`}
                >
                  <Heart className="w-3.5 h-3.5" fill={favorisSeuls ? 'currentColor' : 'none'} aria-hidden="true" />
                  Mes favoris
                  {favoris.size > 0 && <span>· {favoris.size}</span>}
                </button>
              </FiltreLigne>

              <FiltreLigne titre="Type de logement">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() =>
                      setCategories((s) => {
                        const n = new Set(s)
                        if (n.has(c)) n.delete(c)
                        else n.add(c)
                        return n
                      })
                    }
                    className={`chip ${categories.has(c) ? 'chip-on' : 'chip-off'}`}
                  >
                    {c}
                  </button>
                ))}
              </FiltreLigne>
            </div>
          )}

          {/* Décompte */}
          <p className="flex items-center gap-3 text-xs text-wedding-text-light">
            <span aria-live="polite">
              <strong className="font-semibold text-wedding-vert-dark">{resultats.length}</strong>{' '}
              {resultats.length > 1 ? 'adresses' : 'adresse'} sur {LOGEMENTS.length}
            </span>
            {nbFiltres > 0 && (
              <button
                type="button"
                onClick={reinitialiser}
                className="font-label text-[10px] uppercase tracking-[0.18em] text-wedding-vert underline underline-offset-4 hover:text-wedding-vert-dark"
              >
                Tout réinitialiser
              </button>
            )}
          </p>
        </div>
      </div>

      {/* ── Les feuillets ────────────────────────────────────────────── */}
      {groupes.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-heading text-2xl text-wedding-vert-dark">Aucune adresse ne correspond</p>
          <p className="mt-2 text-sm text-wedding-text-light">
            Essayez d&apos;élargir la zone ou le budget.
          </p>
          <button type="button" onClick={reinitialiser} className="btn-public btn-public-outline btn-public-sm mt-6">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="space-y-16 pt-12">
          {groupes.map(({ zone: z, items }) => (
            <section key={z.id} id={`zone-${z.id}`} className="scroll-mt-40">
              <div className="mb-7 pb-4 border-b border-wedding-vert-dark/15">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="font-heading text-2xl md:text-3xl text-wedding-text">{z.label}</h3>
                  <span className="font-label text-[10px] font-medium uppercase tracking-[0.24em] text-wedding-beige">
                    {items.length} {items.length > 1 ? 'adresses' : 'adresse'}
                  </span>
                </div>
                <p className="mt-1 text-sm italic text-wedding-text-light">{z.sous}</p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((l) => (
                  <CarteLogement
                    key={l.id}
                    logement={l}
                    favori={favoris.has(l.id)}
                    onFavori={() => basculerFavori(l.id)}
                  />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}

function FiltreLigne({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-label text-[10px] font-medium uppercase tracking-[0.28em] text-wedding-vert mb-2">{titre}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  )
}

/** Une adresse — une fiche de papier, comme une carte glissée dans le carnet. */
function CarteLogement({
  logement,
  favori,
  onFavori,
}: {
  logement: Logement
  favori: boolean
  onFavori: () => void
}) {
  const { nom, adresse, type, prix, ville } = logement

  return (
    <li className="group relative flex flex-col rounded-2xl border border-wedding-vert-dark/12 bg-white/70 p-5 shadow-paper transition-colors hover:border-wedding-vert/40">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-label text-[9px] font-semibold uppercase tracking-[0.26em] text-wedding-vert">
            {logement.categorie}
          </p>
          <h4 className="font-heading text-xl leading-snug text-wedding-text mt-1.5 break-words">{nom}</h4>
        </div>
        <button
          type="button"
          onClick={onFavori}
          aria-pressed={favori}
          aria-label={favori ? `Retirer ${nom} des favoris` : `Ajouter ${nom} aux favoris`}
          className="shrink-0 -m-2 p-2 rounded-full text-wedding-peach transition-transform active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-peach"
        >
          <Heart
            className={`w-5 h-5 ${favori ? '' : 'text-wedding-text-light/40'}`}
            fill={favori ? 'currentColor' : 'none'}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <p className="mt-2 text-sm italic text-wedding-text-light">{type}</p>

      <p className="mt-3 flex items-start gap-2 text-[13px] leading-relaxed text-wedding-text-light">
        <MapPin className="w-3.5 h-3.5 mt-1 shrink-0 text-wedding-vert" aria-hidden="true" />
        <span>
          <span className="font-semibold text-wedding-vert-dark">{ville}</span>
          <span className="block opacity-80">{adresse}</span>
        </span>
      </p>

      <div className="mt-4 pt-3 border-t border-wedding-vert-dark/12 flex items-center justify-between gap-3">
        <span
          className="font-label text-sm tracking-[0.12em] text-wedding-vert-dark"
          title={PRIX_LABELS[prix]}
          aria-label={PRIX_LABELS[prix]}
        >
          {'€'.repeat(prix)}
          <span className="text-wedding-text-light/35">{'€'.repeat(3 - prix)}</span>
        </span>

        <div className="flex items-center gap-1">
          <LienDiscret href={mapsUrl(adresse)} label="Carte">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
          </LienDiscret>
          <LienDiscret href={itineraireUrl(adresse)} label="Itinéraire">
            <Route className="w-3.5 h-3.5" aria-hidden="true" />
          </LienDiscret>
          <a
            href={bookingUrl(nom, ville)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[40px] inline-flex items-center rounded-full border border-wedding-vert/35 px-3.5 font-label text-[10px] font-medium uppercase tracking-[0.16em] text-wedding-vert-dark transition-colors hover:bg-wedding-vert/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-vert"
          >
            Réserver
          </a>
        </div>
      </div>
    </li>
  )
}

function LienDiscret({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      aria-label={label}
      className="w-10 h-10 inline-flex items-center justify-center rounded-full text-wedding-vert transition-colors hover:bg-wedding-vert/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wedding-vert"
    >
      {children}
    </a>
  )
}
