"""Génère src/data/logements.ts depuis dta/logements.json."""
import json

rows = json.load(open('dta/logements.json', encoding='utf-8'))

BS = chr(92)
Q = chr(39)


def esc(s):
    return s.replace(BS, BS * 2).replace(Q, BS + Q)


header = """/**
 * Liste des hebergements — generee depuis
 * `dta/Liste-logements-mariage-Marianne-Killian-21_08_2027.xlsx`.
 * Les trois onglets du classeur deviennent les trois zones de distance.
 */

export type ZoneId = 'moins-10' | 'moins-20' | '20-30'

export type Categorie =
  | 'Hotel'
  | "Chambres d'hotes"
  | 'Gite'
  | 'Appartement & residence'
  | 'Villa & maison'
  | 'Camping'
  | 'Village vacances'
  | 'Insolite'

export interface Logement {
  id: string
  nom: string
  adresse: string
  /** Libelle d'origine du classeur, plus precis que la categorie. */
  type: string
  categorie: Categorie
  /** Indication tarifaire : 1 = economique, 2 = intermediaire, 3 = haut de gamme. */
  prix: 1 | 2 | 3
  ville: string
  zone: ZoneId
}

export const ZONES: { id: ZoneId; label: string; court: string; sous: string }[] = [
  { id: 'moins-10', label: 'A moins de 10 min', court: '- 10 min', sous: "Les Adrets-de-l'Esterel, a deux pas de la Bastide" },
  { id: 'moins-20', label: 'A moins de 20 min', court: '- 20 min', sous: 'Frejus, Mandelieu-la-Napoule & les alentours' },
  { id: '20-30', label: 'A 20-30 min', court: '20-30 min', sous: "Saint-Raphael, Cannes, Theoule & l'arriere-pays" },
]

export const CATEGORIES: Categorie[] = [
  'Hotel',
  "Chambres d'hotes",
  'Gite',
  'Appartement & residence',
  'Villa & maison',
  'Camping',
  'Village vacances',
  'Insolite',
]

export const PRIX_LABELS: Record<1 | 2 | 3, string> = {
  1: 'Economique',
  2: 'Gamme intermediaire',
  3: 'Haut de gamme',
}

export const LOGEMENTS: Logement[] = ["""

# Les libelles accentues sont retablis ici (le fichier source de ce script
# reste en ASCII pur pour survivre aux shells Windows).
ACCENTS = {
    "'Hotel'": "'Hôtel'",
    '"Chambres d\'hotes"': '"Chambres d’hôtes"',
    "'Gite'": "'Gîte'",
    "'Appartement & residence'": "'Appartement & résidence'",
    "generee": "générée",
    "hebergements": "hébergements",
    "Libelle d'origine": "Libellé d’origine",
    "plus precis que la categorie": "plus précis que la catégorie",
    "economique, 2 = intermediaire": "économique, 2 = intermédiaire",
    "'A moins de 10 min'": "'À moins de 10 min'",
    "'A moins de 20 min'": "'À moins de 20 min'",
    "'A 20-30 min'": "'À 20–30 min'",
    "'- 10 min'": "'– 10 min'",
    "'- 20 min'": "'– 20 min'",
    "'20-30 min'": "'20–30 min'",
    "Les Adrets-de-l'Esterel, a deux pas de la Bastide": "Les Adrets-de-l’Estérel, à deux pas de la Bastide",
    "'Frejus, Mandelieu-la-Napoule & les alentours'": "'Fréjus, Mandelieu-la-Napoule & les alentours'",
    "Saint-Raphael, Cannes, Theoule & l'arriere-pays": "Saint-Raphaël, Cannes, Théoule & l’arrière-pays",
    "'Economique'": "'Économique'",
    "'Gamme intermediaire'": "'Gamme intermédiaire'",
}
for a, b in ACCENTS.items():
    header = header.replace(a, b)

out = [header]
for r in rows:
    out.append('  {')
    out.append("    id: '%s'," % esc(r['id']))
    out.append("    nom: '%s'," % esc(r['nom']))
    out.append("    adresse: '%s'," % esc(r['adresse']))
    out.append("    type: '%s'," % esc(r['type']))
    # L'union TypeScript utilise l'apostrophe typographique : on aligne la donnee.
    categorie = r['categorie'].replace(Q, '’')
    out.append('    categorie: "%s",' % categorie)
    out.append('    prix: %d,' % r['prix'])
    out.append("    ville: '%s'," % esc(r['ville']))
    out.append("    zone: '%s'," % r['zone'])
    out.append('  },')
out.append(']')
out.append('')

open('src/data/logements.ts', 'w', encoding='utf-8').write('\n'.join(out))
print('written', len(rows))
