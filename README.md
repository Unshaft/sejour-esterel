# Séjour Estérel — où dormir le week-end du mariage

Site public listant les hébergements autour de **La Bastide de l'Auberge des Adrets**
(Les Adrets-de-l'Estérel), pour le mariage de Marianne & Killian, le 21 août 2027.

Direction artistique, palette et typographie reprises du site de mariage
(`site-mariage-v3`, « La Correspondance ») : ivoire champagne, olive, pêche —
Bodoni Moda italique, Cormorant Garamond, Jost, La Belle Aurore.

## Stack

Next.js 16 (App Router, page statique) · React 19 · Tailwind CSS v4 · lucide-react.
Aucune base de données, aucune API : la liste est un module TypeScript statique et
le filtrage se fait côté client.

## Données

La source de vérité est le classeur des mariés :

```
dta/Liste-logements-mariage-Marianne-Killian-21_08_2027.xlsx
```

Ses trois onglets (`- 10 min`, `- 20 min`, `20-30 min`) deviennent les trois zones
de distance. Le fichier `src/data/logements.ts` est **généré** — ne pas l'éditer à la main :

```bash
npm run gen:data
```

Ce script enchaîne `scripts/parse-xlsx.py` (classeur → `dta/logements.json`, normalisation
des catégories, villes et prix) puis `scripts/gen-data.py` (JSON → module TypeScript).
Après une mise à jour du classeur, il suffit donc de relancer cette commande.

Chaque logement porte : nom, adresse, type d'origine, catégorie normalisée
(Hôtel, Chambres d'hôtes, Gîte, Appartement & résidence, Villa & maison, Camping,
Village vacances, Insolite), indication de prix (1 à 3 = € à €€€), ville et zone.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Photos

Les photographies du domaine proviennent de la galerie officielle
[bastidedesadrets.com](https://www.bastidedesadrets.com/) (`public/images/bastide-*.jpg`).
Pour les remplacer, déposer de nouveaux fichiers sous les mêmes noms.

## Déploiement

Hébergé sur Vercel — la page est entièrement pré-rendue en statique.
