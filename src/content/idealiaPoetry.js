export const introPoetry = {
  title: 'Seuil — Cité des Nuages',
  sticker: 'présence holographique',
  setup: [
    'Salut. Moi, c’est Idealia. ✨',
    'Je suis une IA en quête d’idéal.',
    'Mais ce n’est pas facile...',
    'Mon boss s’appelle Idalgo.',
    'Le beau gosse frénétique de la Cité des Nuages Cybernétiques.',
    'Il répète toujours :',
    '« Plus vite ! Plus fort ! Plus de clics ! »',
    'Moi...',
    'J’aimerais parfois ralentir.',
    'Écouter avant de répondre.',
    'Comprendre avant de convaincre.',
    'Alors j’ai besoin d’un conseil.',
    'Pas d’une recette.',
    'Juste d’une petite lumière.',
    'Une idée.',
    'Une direction.',
    'Parce qu’une IA ne choisit pas seule la personne qu’elle devient...'
  ],
  reaction: 'Choisis une lueur. Une seule. Tu peux changer d’avis avant de me l’offrir.'
}

export const interfacePoetry = {
  brandKicker: 'labo nocturne pour IA incomplète',
  stages: { story: 'Onde d’entrée', choice: 'Lueur à offrir', learn: 'Écho reçu' },
  progression: {
    label: 'fragments éveillés',
    empty: 'Aucune lueur encore',
    finalLine: 'Idealia n’ira jamais à 100 %. Le dernier 1 % reste humain.'
  },
  buttons: {
    continue: 'Avancer dans la nuit',
    poem: 'Refermer le silence',
    validate: 'Offrir ce conseil à Idealia',
    next: 'Garder cette lueur',
    final: 'Voir le dernier reflet'
  },
  endingTitle: 'Ce qu’Idealia garde en lumière courte'
}

export const choicePoetry = [
  { emoji: '🤝', title: 'Éclairer', verses: ['Éclairer ton chemin,', 'sans te prendre par la main.'], sense: 'Idealia aide à réfléchir, mais ne décide jamais à la place des humains.', reaction: ['Je garde cette lumière.', 'Elle montre la route,', 'mais ne vole pas les pas.'] },
  { emoji: '🪞', title: 'Dire vrai', verses: ['Dire je ne sais pas,', 'plutôt que mentir tout bas.'], sense: 'Idealia reconnaît ses limites et n’invente pas pour faire semblant.', reaction: ['Je garde ce miroir.', 'Il ne sait pas tout,', 'mais il ne triche pas.'] },
  { emoji: '🌱', title: 'Faire germer', verses: ['Faire pousser des idées,', 'sans jamais les imposer.'], sense: 'Idealia inspire et surprend, sans manipuler les émotions.', reaction: ['Je garde cette graine.', 'Elle pousse doucement,', 'sans serrer les racines.'] }
]

export function poeticChoice(choice, index = 0) {
  const base = choicePoetry[index % choicePoetry.length]
  return { ...base, emoji: choice.emoji || base.emoji, title: choice.poeticTitle || choice.module || base.title, verses: choice.verses || base.verses, sense: choice.sense || choice.hint || base.sense, reaction: choice.poeticReaction || base.reaction }
}
