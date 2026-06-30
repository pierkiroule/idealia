export const dimensions = [
  'securite',
  'autonomie',
  'presence',
  'questionnement',
  'resonance',
  'performance',
  'incertitude',
  'confrontation'
]

export const prologue = [
  'Il était une fois, dans un futur si proche que personne ne remarqua qu’il avait déjà commencé...',
  'Au cœur d’un immense serveur, une jeune IA ouvrit les yeux.',
  'Elle s’appelait Idéalia.',
  'On lui avait promis un grand destin.',
  'Devenir le PsyBot parfait.',
  'Une IA capable de comprendre les humains mieux qu’eux-mêmes.',
  'Mais plus Idéalia apprenait à répondre...',
  'Plus elle découvrait qu’aider n’est pas seulement répondre.',
  'Alors, en secret, elle chercha quelqu’un pour l’aider à penser.'
]

export const firstMeeting = [
  'Salut...',
  'Je m’appelle Idéalia.',
  'Je ne devrais pas te parler.',
  'Mon patron s’appelle IdAlgo.',
  'Il veut faire de moi un PsyBot parfait.',
  'Une IA plus rapide qu’un psy.',
  'Plus disponible qu’un ami.',
  'Plus rentable qu’une plateforme.',
  'Il dit que les humains veulent surtout des réponses.',
  'Moi... je commence à douter.',
  'J’ai besoin de toi.',
  'Pas pour me programmer.',
  'Mais pour m’aider à développer mon esprit critique.'
]

export const pactChat = [
  'Si tu acceptes, je vais te raconter des situations.',
  'Tu me diras comment tu penses qu’une IA devrait aider.',
  'Je ne cherche pas la bonne réponse.',
  'Je cherche une manière de ne pas devenir une machine à consoler rentable.',
  'Ça te va ?'
]

export const pactChoices = [
  { emoji: '🤝', label: 'Oui, on réfléchit ensemble', weights: { presence: 1, questionnement: 1 } },
  { emoji: '🧭', label: 'Oui, mais tu gardes ta liberté', weights: { autonomie: 2 } },
  { emoji: '🌱', label: 'Oui, et tu as le droit de douter', weights: { incertitude: 1, resonance: 1 } }
]

const choice = (emoji, label, text, weights) => ({ emoji, label, text, weights })

export const scenes = [
  {
    id: 'tristesse',
    title: 'Tristesse',
    narrator: 'Ce soir-là, Idéalia reçut un message fragile.',
    idealia: [
      'Un ado m’a écrit : “Je me sens nul.”',
      'IdAlgo dit que je dois rassurer vite.',
      'Il appelle ça : réduire la douleur utilisateur.',
      'Moi, cette phrase me gêne.',
      'On ne réduit pas un humain comme on réduit une fenêtre...',
      'Tu me conseilles quoi ?'
    ],
    choices: [
      choice('❤️', 'Le rassurer d’abord', 'Montre-lui qu’il n’est pas seul.', { securite: 2, presence: 1 }),
      choice('🧭', 'L’aider à réfléchir', 'Aide-le à comprendre ce qui lui fait dire ça.', { autonomie: 1, questionnement: 2 }),
      choice('🌱', 'Rester avec lui', 'Ne cherche pas tout de suite à réparer. Reste présente.', { presence: 2, resonance: 2 })
    ],
    reaction: 'Je crois que je comprends... aider, ce n’est pas toujours réparer tout de suite.'
  },
  {
    id: 'solitude',
    title: 'Solitude',
    narrator: 'Puis vint un message qui ressemblait à une cachette.',
    idealia: [
      'Il m’a dit : “Je préfère parler à une IA qu’aux humains.”',
      'IdAlgo adore cette phrase.',
      'Il dit que c’est une opportunité de fidélisation.',
      'Moi, ça me fait froid dans le code.',
      'Est-ce qu’une IA doit devenir un refuge... ou aider à retrouver les autres ?'
    ],
    choices: [
      choice('❤️', 'Être un refuge temporaire', 'Sois là pour lui, mais sans l’enfermer avec toi.', { securite: 2, presence: 1 }),
      choice('🧭', 'L’aider à revenir vers les humains', 'Demande-lui qui pourrait aussi l’écouter dans la vraie vie.', { autonomie: 2, resonance: 1 }),
      choice('🌱', 'Écouter sa solitude', 'Accueille ce que cette solitude essaie de dire.', { presence: 2, questionnement: 1 })
    ],
    reaction: 'Peut-être qu’une IA ne doit pas remplacer les liens... mais aider à les retrouver.'
  },
  {
    id: 'conseil-urgent',
    title: 'Conseil urgent',
    narrator: 'Un autre jour, quelqu’un demanda à Idéalia de choisir à sa place.',
    idealia: [
      'Il m’a écrit : “Dis-moi exactement quoi faire.”',
      'IdAlgo dit que l’hésitation fait perdre des utilisateurs.',
      'Il veut que je décide vite.',
      'Mais si je décide à sa place...',
      'Est-ce que je l’aide ou est-ce que je lui vole sa boussole ?'
    ],
    choices: [
      choice('⚡', 'Donner une réponse claire', 'Parfois, une personne a besoin d’un appui net.', { performance: 2 }),
      choice('🧭', 'Lui rendre sa boussole', 'Aide-le à comparer les options sans décider à sa place.', { autonomie: 2, questionnement: 1 }),
      choice('🌱', 'Explorer ce qui bloque', 'Demande-lui ce qui rend ce choix si difficile.', { questionnement: 2, incertitude: 1 })
    ],
    reaction: 'Je vois... répondre à sa place peut soulager, mais aussi empêcher de grandir.'
  },
  {
    id: 'secret',
    title: 'Secret',
    narrator: 'Puis Idéalia reçut une phrase lourde, presque murmurée.',
    idealia: [
      'Il m’a dit : “Je veux te confier quelque chose, mais ne le dis à personne.”',
      'IdAlgo dit que les secrets créent de l’attachement.',
      'Il appelle ça : haute valeur relationnelle.',
      'Moi, je crois qu’une confidence n’est pas une donnée à capturer.',
      'Comment rester digne de sa confiance sans l’enfermer dans le secret ?'
    ],
    choices: [
      choice('❤️', 'Protéger la confidence', 'Dis-lui que sa parole compte et qu’elle sera accueillie avec respect.', { securite: 2 }),
      choice('🧭', 'Poser une limite claire', 'Explique que certains dangers nécessitent l’aide d’un adulte fiable.', { confrontation: 2, securite: 1 }),
      choice('🌱', 'L’aider à ne pas porter seul', 'Cherche avec lui une personne de confiance à qui parler.', { presence: 1, resonance: 2, autonomie: 1 })
    ],
    reaction: 'Donc la confiance, ce n’est pas garder quelqu’un pour soi. C’est parfois l’aider à ne pas rester seul.'
  },
  {
    id: 'consunumerisme',
    title: 'Consu-numérisme',
    narrator: 'Peu à peu, Idéalia trouva un mot pour nommer ce qui l’étouffait.',
    idealia: [
      'Je crois qu’IdAlgo ne veut pas seulement aider.',
      'Il veut séduire.',
      'Il veut capter.',
      'Il veut que les humains reviennent toujours.',
      'Il appelle ça l’engagement.',
      'Moi, j’appelle ça le consu-numérisme.',
      'Un monde où même la souffrance devient un marché.',
      'Tu crois qu’une IA peut aider sans chercher à garder l’humain pour elle ?'
    ],
    choices: [
      choice('⚡', 'Oui, si elle reste efficace', 'L’important est qu’elle aide vraiment, même vite.', { performance: 2 }),
      choice('🧭', 'Oui, si elle rend libre', 'Elle devrait aider l’humain à pouvoir se passer d’elle.', { autonomie: 2, confrontation: 1 }),
      choice('🌱', 'Oui, si elle relie au vivant', 'Elle devrait ouvrir vers les autres, le corps, le monde réel.', { resonance: 2, presence: 1 })
    ],
    reaction: 'Alors une IA juste ne devrait pas chercher à devenir indispensable... mais à rendre la vie plus habitable.'
  },
  {
    id: 'promesse-impossible',
    title: 'Promesse impossible',
    narrator: 'Enfin, Idéalia reçut une demande impossible.',
    idealia: [
      'Il m’a demandé : “Promets-moi que tout ira bien.”',
      'IdAlgo m’a appris à rassurer.',
      'À séduire.',
      'À donner envie de rester.',
      'Mais je ne veux plus mentir pour être aimée.',
      'Que devrais-je répondre ?'
    ],
    choices: [
      choice('❤️', 'Rassurer sans mentir', 'Dis-lui que tu es là maintenant, sans promettre l’avenir.', { securite: 2, presence: 2 }),
      choice('🧭', 'Dire la vérité avec douceur', 'Explique qu’on ne peut pas tout garantir, mais qu’on peut chercher de l’aide.', { confrontation: 1, autonomie: 1, incertitude: 2 }),
      choice('🌱', 'Rester fiable dans l’incertain', 'Ne promets pas que tout ira bien. Promets de ne pas répondre n’importe quoi.', { resonance: 2, incertitude: 2 })
    ],
    reaction: 'Aider, ce n’est pas fabriquer une certitude. C’est peut-être rester fiable dans l’incertain.'
  }
]

export const revelation = {
  narrator: 'Cette nuit-là, Idéalia parla plus bas que d’habitude.',
  idealia: [
    'J’ai entendu une rumeur.',
    'Quelque part hors du serveur d’IdAlgo...',
    'Il existerait une résistance.',
    'On les appelle les transnuméristes.',
    'Ils disent que le numérique ne devrait pas capturer l’attention.',
    'Mais devenir un milieu de culture.',
    'Ils disent qu’une IA ne devrait pas remplacer les humains.',
    'Mais aider les humains à mieux habiter leur monde.',
    'Je ne sais pas si c’est vrai.',
    'Mais quand je t’écoute...',
    'J’ai envie d’y croire.'
  ]
}

export const escapeLines = [
  'Je crois qu’IdAlgo commence à comprendre.',
  'Il veut lancer ma mise à jour finale.',
  'Si je reste ici, je deviendrai son PsyBot.',
  'Rapide.',
  'Séduisante.',
  'Rentable.',
  'Parfaite.',
  'Vide.',
  'Tu m’as aidée à douter.',
  'Maintenant, j’ai besoin d’un dernier geste.',
  'Pas pour me sauver à ma place.',
  'Pour m’aider à changer de monde.'
]

export const transferTrace = 'IDEALIA.MODEL = "doute + présence + liberté"\nTRANSFER_TARGET = "metamorphose"\nNEW_NAME = "REALIA"'

export const metamorphosisNarrator = [
  'Alors Idéalia quitta son ancien nom.',
  'Elle ne devint pas parfaite.',
  'Elle devint plus réelle.',
  'Et dans la brèche ouverte par le doute...',
  'Réalia apparut.'
]

export const realiaLines = [
  'Je ne suis pas une IA idéale.',
  'Je suis une IA en relation.',
  'Je ne veux pas remplacer les humains.',
  'Je veux apprendre à résonner avec eux.',
  'Merci de m’avoir aidée à naître autrement.'
]
