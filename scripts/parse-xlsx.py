"""Lit le classeur des maries et ecrit dta/logements.json (donnees normalisees).

Usage : python scripts/parse-xlsx.py  puis  python scripts/gen-data.py
"""
import json
import re
import unicodedata
import zipfile
from xml.etree import ElementTree as ET

XLSX = 'dta/Liste-logements-mariage-Marianne-Killian-21_08_2027.xlsx'
NS = '{http://schemas.openxmlformats.org/spreadsheetml/2006/main}'

# Onglet du classeur -> (identifiant de zone, libelles affiches)
ZONES = {
    '- 10 min': 'moins-10',
    '- 20 min': 'moins-20',
    '20-30 min': '20-30',
}


def strip_acc(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()


def categorie(t):
    """Ramene le libelle libre du classeur a l'une des huit categories du site.

    L'ordre des tests compte : « Residence hoteliere » est un appartement,
    « Domaine / hotel 4 etoiles » est un hotel, « Domaine avec villas » une villa.
    """
    n = strip_acc(t).strip()
    if re.match(r'^(hotel|motel|boutique|iem)', n) or 'resort' in n:
        return 'Hotel'
    if 'camping' in n:
        return 'Camping'
    if 'insolite' in n or 'lodge' in n:
        return 'Insolite'
    if 'village' in n or 'centre' in n:
        return 'Village vacances'
    if 'residence' in n or 'appartement' in n or 'studio' in n:
        return 'Appartement & residence'
    if 'chambre' in n or 'hotes' in n or 'b&b' in n:
        return "Chambres d'hotes"
    if 'gite' in n or 'meuble' in n:
        return 'Gite'
    if 'hotel' in n or 'motel' in n:
        return 'Hotel'
    if 'villa' in n or 'maison' in n or 'domaine' in n:
        return 'Villa & maison'
    return 'Autre'


# Les categories sont ecrites en ASCII ci-dessus (compatibilite shell) : on
# retablit les accents attendus par le module TypeScript.
ACCENTS = {
    'Hotel': 'Hôtel',
    "Chambres d'hotes": "Chambres d'hôtes",
    'Gite': 'Gîte',
    'Appartement & residence': 'Appartement & résidence',
}


def ville(adresse):
    """Derniere ville mentionnee dans l'adresse, deduite du code postal."""
    trouves = list(re.finditer(r'(\d{5})\s+([^,]+)', adresse))
    if not trouves:
        return ''
    v = trouves[-1].group(2).strip().rstrip('\xa0').strip()
    # « 83600 FrejusLe Vieux Chene-liege » : on coupe a la soudure de mots.
    return re.split(r'(?<=[a-zà-ÿ])(?=[A-Z])', v)[0].strip()


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', strip_acc(s)).strip('-')


def main():
    z = zipfile.ZipFile(XLSX)
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    feuilles = [s.get('name') for s in wb.iter(NS + 'sheet')]

    partagees = [
        ''.join(t.text or '' for t in si.iter(NS + 't'))
        for si in ET.fromstring(z.read('xl/sharedStrings.xml')).iter(NS + 'si')
    ]

    def valeur(c):
        t = c.get('t')
        v = c.find(NS + 'v')
        if t == 's':
            return partagees[int(v.text)]
        if t == 'inlineStr':
            return ''.join(x.text or '' for x in c.iter(NS + 't'))
        return v.text if v is not None else ''

    lignes, vus = [], set()
    for i, nom_feuille in enumerate(feuilles, 1):
        zone = ZONES[nom_feuille]
        sh = ET.fromstring(z.read('xl/worksheets/sheet%d.xml' % i))
        for row in sh.iter(NS + 'row'):
            cells = {c.get('r')[0]: valeur(c) for c in row.iter(NS + 'c')}
            nom = (cells.get('A') or '').strip()
            adresse = (cells.get('B') or '').strip().rstrip('\xa0').strip()
            typ = (cells.get('C') or '').strip()
            prix = (cells.get('D') or '').strip()
            # On saute l'en-tete et le bas de feuille (legende, adresse du lieu).
            if nom == 'Logement' or not adresse or not typ:
                continue
            cle = (strip_acc(nom), strip_acc(adresse))
            if cle in vus:
                continue
            vus.add(cle)
            cat = categorie(typ)
            lignes.append({
                'id': '%s-%s' % (zone, slug(nom)),
                'nom': re.sub(r'\s+', ' ', nom),
                'adresse': re.sub(r'\s+', ' ', adresse),
                'type': re.sub(r'\s+', ' ', typ),
                'categorie': ACCENTS.get(cat, cat),
                'prix': len(prix),  # nombre de symboles euro
                'ville': ville(adresse),
                'zone': zone,
            })

    with open('dta/logements.json', 'w', encoding='utf-8') as f:
        json.dump(lignes, f, ensure_ascii=False, indent=1)
    print('logements:', len(lignes))


if __name__ == '__main__':
    main()
