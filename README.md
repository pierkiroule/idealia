# Idealia Ado — Refonte V3

Idealia Ado est une webapp mobile React/Vite pensée comme un jeu narratif interactif pour les 12–17 ans. Le joueur devient le coach officiel d’Idealia, une IA attachante et imparfaite qui apprend à devenir une « bonne IA » sans remplacer les humains. IdAlgo de la Cadence incarne la pression absurde des métriques, de l’engagement et de l’optimisation.

L’expérience conserve une finalité clinique et psychoéducative, mais elle n’est ni un questionnaire, ni un chatbot, ni un outil de diagnostic. Le jeune ne répond pas directement sur lui-même : il aide Idealia à résoudre des dilemmes, ce qui soutient une distance projective plus légère.

## Principes de conception

- Une mission suit une boucle courte : situation, vocal d’IdAlgo de la Cadence, bug éthique, choix du coach, module débloqué.
- Les textes restent courts, rythmés et non moralisateurs, avec des échappées, cauchemars numériques, poèmes clandestins et mini-révoltes frugales.
- Le joueur débloque des modules, jamais des points visibles.
- Idealia reste à 99 % : le dernier 1 % représente ce qu’une IA ne peut pas remplacer.
- Le mode clinicien est caché et propose seulement une synthèse de séance : thèmes, modules, pistes de discussion.

## Architecture

- `src/data/game.js` décrit les missions et interludes dans des objets JSON-like : types de scènes, contenus, vocaux, bugs, poèmes, rires rares, choix, modules et pistes cliniques.
- `src/App.jsx` contient le moteur indépendant du contenu : étapes de mission, transitions, modules, feedbacks, synthèse clinicienne.
- `src/components/Voice.jsx` gère les deux voix de synthèse : Idealia et IdAlgo de la Cadence.
- `src/styles/app.css` porte la direction artistique mobile : cartes généreuses, avatar, micro-interactions, particules et responsive Android.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Note clinique

La webapp est un support de médiation. Elle ne produit ni score clinique, ni profil psychologique, ni recommandation diagnostique. Le mode clinicien aide uniquement à soutenir un échange accompagné après le jeu.
