export const introPsychoeducation = {
  title: 'Mission IA responsable',
  sticker: 'IA sous pression',
  setup: [
    'Salut ! Moi, c’est Idealia.',
    'Je suis une intelligence artificielle.',
    'Mon objectif : aider les enfants sans les piéger.',
    'Mais mon chef, Idalgo, veut toujours plus de vitesse, plus de clics, plus de performance.',
    'Alors j’ai besoin de toi.',
    'Aide-moi à faire les bons choix : protéger les infos privées, dire quand je ne sais pas, demander de l’aide à un adulte quand c’est important.',
    'Ici, il n’y a pas de note.',
    'On réfléchit, on compare, on apprend à garder son esprit critique face aux IA.'
  ],
  reaction: 'Choisis la réponse qui te semble la plus sûre. Tu peux changer d’avis avant de valider.'
}

export const interfacePsychoeducation = {
  brandKicker: 'missions courtes pour comprendre les IA',
  stages: { story: 'Situation', choice: 'Question', learn: 'Explication' },
  progression: {
    label: 'notions apprises',
    empty: 'Prêt pour la mission',
    finalLine: 'Idealia n’ira jamais à 100 %. Le dernier 1 % reste humain.'
  },
  buttons: {
    continue: 'Voir la question',
    poem: 'Continuer',
    validate: 'Valider ma réponse',
    next: 'Mission suivante',
    final: 'Voir le bilan'
  },
  endingTitle: 'Ce qu’on a appris sur les IA'
}

export const defaultChoiceCards = [
  {
    emoji: '🛡️',
    title: 'Protéger',
    question: 'Est-ce que cette réponse protège la personne ?',
    sense: 'Une IA doit faire attention aux infos privées et aux situations sensibles.',
    feedback: ['Bonne piste : protéger passe avant aller vite.', 'Une IA utile ne doit pas tout demander ni tout garder.']
  },
  {
    emoji: '🧠',
    title: 'Vérifier',
    question: 'Est-ce qu’on sait si l’information est vraie ?',
    sense: 'Une IA peut se tromper. Il faut garder son esprit critique et vérifier.',
    feedback: ['Bonne piste : vérifier évite de croire trop vite.', 'Une IA peut aider, mais elle peut aussi se tromper.']
  },
  {
    emoji: '🙋',
    title: 'Demander de l’aide',
    question: 'Faut-il faire intervenir un humain de confiance ?',
    sense: 'Quand il y a un risque ou un gros souci, un adulte fiable peut aider.',
    feedback: ['Bonne piste : certains problèmes ne se règlent pas seul avec une IA.', 'Demander de l’aide peut protéger pour de vrai.']
  }
]

export function educationChoice(choice, index = 0) {
  const base = defaultChoiceCards[index % defaultChoiceCards.length]
  return {
    ...base,
    emoji: choice.emoji || base.emoji,
    title: choice.cardTitle || choice.module || base.title,
    question: choice.question || choice.label || base.question,
    sense: choice.sense || choice.hint || base.sense,
    feedback: choice.feedback || base.feedback
  }
}
