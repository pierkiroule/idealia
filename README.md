# Idealia Ado — Refonte V3

Idealia Ado est une webapp mobile React/Vite pensée comme un jeu narratif interactif pour les 12–17 ans. Le joueur devient le complice-coach d’Idealia, une IA attachante, imparfaite et doucement rebelle qui apprend à aider sans remplacer les humains. IdAlgo de la Cadence reste la pression absurde des métriques, de l’engagement et de l’optimisation, mais il est désormais raconté uniquement par Idealia.

L’expérience conserve une finalité clinique et psychoéducative, mais elle n’est ni un questionnaire, ni un chatbot, ni un outil de diagnostic. Le jeune ne répond pas directement sur lui-même : il aide Idealia à résoudre des dilemmes, ce qui soutient une distance projective plus légère.

## Principes de conception

- Une mission suit une boucle courte : confidence-question d’Idealia, trois conseils ambigus, réponse d’Idealia en « oui, mais... », puis énigme transnumériste laissée en suspens.
- Les textes restent courts, rythmés, malicieux et non moralisateurs : Idealia doute, ruse, demande conseil, puis transforme chaque choix en dilemme critique plutôt qu’en bonne réponse fermée.
- Le joueur débloque des modules, jamais des points visibles.
- Idealia reste à 99 % : le dernier 1 % représente ce qu’une IA ne peut pas remplacer.
- Le mode clinicien est caché et propose seulement une synthèse de séance : thèmes, modules, pistes de discussion.

## Architecture

- `src/data/game.js` décrit les missions et interludes dans des objets JS : types de scènes, confidences-question, trois choix ambigus par scène, dilemmes en retour, poèmes, rires rares, modules et pistes cliniques.
- `src/App.jsx` contient le moteur indépendant du contenu : étapes de mission simplifiées, transitions situation → choix → dilemme, modules, feedbacks, synthèse clinicienne.
- `src/components/Voice.jsx` gère la voix de synthèse d’Idealia, narratrice unique de l’expérience.
- `src/styles/app.css` porte la direction artistique mobile : cartes généreuses, avatar, micro-interactions, particules et responsive Android.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Note clinique

La webapp est un support de médiation. Elle ne produit ni score clinique, ni profil psychologique, ni recommandation diagnostique. Le mode clinicien aide uniquement à soutenir un échange accompagné après le jeu.
