# Idealia Ado

Idealia Ado est une webapp React/Vite de type serious game. L’expérience guide un ado, accompagné par un soignant ou un médiateur, dans des choix autour de l’usage responsable de l’IA : écoute, sécurité, intimité, autonomie et esprit critique.

## Objectifs produit

- Proposer une narration courte, mobile-first et accessible.
- Visualiser la progression éthique d’Idealia et les compétences travaillées.
- Garder un mode soignant discret pour faciliter le débrief en séance.
- Fournir une base front-end simple à maintenir et prête à industrialiser.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Structure

- `src/App.jsx` : orchestration de l’expérience, progression, choix et debrief.
- `src/data/game.js` : contenu narratif et embranchements.
- `src/components/Voice.jsx` : synthèse vocale optionnelle.
- `src/styles/app.css` : design system visuel de l’application.

## Notes d’usage

La webapp est un support éducatif et ne remplace pas une prise en charge médicale, psychologique ou sociale. Le mode soignant s’active par double clic sur le titre.
