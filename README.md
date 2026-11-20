# Portfolio — Aya Souki

Portfolio statique (HTML/CSS/JS, sans étape de build) d'une ingénieure en génie électrique, spécialité Électronique embarquée et télécommunications (ESPRIM, 2026).

Site : https://ayasoukii.github.io/portfolio/

## Structure

| Fichier / dossier | Rôle |
|---|---|
| `index.html` | Accueil : présentation, étude de cas phare, expérience industrielle, sélection de projets, contact |
| `projets.html` | Projets classés par domaine |
| `iqc.html`, `emotion-ia.html`, `devops.html`, `maladies-plantes.html`, `ims.html` | Études de cas (même structure : contexte, architecture, stack, résultats) |
| `stages.html` | Expérience et formation (frise chronologique) |
| `competences.html` | Compétences : « pratiquées en projet » et « notions » |
| `certifications.html` | Certifications avec liens vers les justificatifs |
| `contact.html`, `404.html` | Contact et page d'erreur GitHub Pages |
| `styles.css` | Design system unique (tokens clair/sombre, composants) |
| `main.js` | Thème clair/sombre, menu mobile, animations, compteurs |
| `figures/` | Images optimisées (WebP) ; `photo_aya_og.jpg` pour les aperçus de partage |
| `docs/` | Rapports de projets (PDF) ; `docs/certificats/` : justificatifs |
| `Aya_Souki_CV.pdf` | CV, export du design Canva |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | Référencement et icône |

## Aperçu local

```bash
python -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Ajouter un projet

1. Ajouter l'image dans `figures/` au format WebP (largeur max. 1200 px) avec ses dimensions dans la balise `<img>`.
2. Ajouter une carte `article.card` dans la bonne section de `projets.html`.
3. Pour une étude de cas, copier la structure d'une page existante (`docFoot`, `meta`, `pipeline`, `stack`).
4. Ajouter la page à `sitemap.xml`.

## Publication

GitHub Pages : Settings → Pages → branche `main`, dossier `/ (root)`.

## Confidentialité

`iqc.html` décrit le projet réalisé chez LEONI sans aucune donnée, capture, référence ni code de l'entreprise.
