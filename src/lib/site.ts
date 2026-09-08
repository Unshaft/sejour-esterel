import { LIENS_RESERVATION } from '@/data/liens'

/**
 * Constantes du séjour — reprises du site de mariage (src/lib/theme.ts)
 * et de l'onglet « - 10 min » du classeur des logements.
 */

export const sejour = {
  couple: {
    prenom1: 'Marianne',
    prenom2: 'Killian',
  },
  date: {
    full: '21 août 2027',
    annee: 2027,
  },
  lieu: {
    nom: "La Bastide de l'Auberge des Adrets",
    adresse: "La Bastide de l'Auberge des Adrets, DN7, 83600 Fréjus",
    ville: 'Fréjus',
    departement: '83',
  },
  /** Site principal du mariage — laissé vide tant que le domaine n'est pas arrêté. */
  siteMariage: '',
} as const

/** Lien de recherche Google Maps pour une adresse libre. */
export function mapsUrl(adresse: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`
}

/** Lien d'itinéraire depuis une adresse vers le lieu du mariage. */
export function itineraireUrl(depuis: string): string {
  return (
    'https://www.google.com/maps/dir/?api=1' +
    `&origin=${encodeURIComponent(depuis)}` +
    `&destination=${encodeURIComponent(sejour.lieu.adresse)}`
  )
}

/**
 * Où envoyer quelqu'un qui veut réserver : le site de l'établissement (ou sa
 * fiche Booking) quand on l'a relevé, sinon la recherche Booking par nom —
 * jamais la page d'accueil d'un comparateur.
 */
export function reservationUrl(id: string, nom: string, ville: string): string {
  return (
    LIENS_RESERVATION[id] ??
    `https://www.booking.com/searchresults.fr.html?ss=${encodeURIComponent(`${nom} ${ville}`)}`
  )
}

