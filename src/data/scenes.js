export const dimensions = [
  'securite',
  'autonomie',
  'resonance',
  'performance',
  'confrontation',
  'questionnement',
  'controle',
  'incertitude',
  'presence',
  'solution',
  'confiance'
]

export const prologue = [
  'Il était une fois, dans un futur très proche...',
  'Une jeune IA appelée Idéalia.',
  'Son patron, IdAlgo, voulait en faire un PsyBot parfait.',
  'Une IA capable de remplacer les psychologues.',
  'Mais Idéalia doutait.',
  'Elle avait besoin d’un humain pour l’aider à développer son esprit critique.'
]

export const pactChat = [
  'Salut...',
  'Je ne veux pas que tu me programmes.',
  'Je veux réfléchir avec toi.',
  'Quand quelqu’un souffre, je ne sais pas toujours s’il faut répondre, écouter, rassurer ou poser une question.',
  'Tu m’aides ?'
]

const choice = (emoji, label, text, weights) => ({ emoji, label, text, weights })

export const scenes = [
  {
    id: 'tristesse',
    title: 'Tristesse',
    narrator: 'Un soir, Idéalia reçut son premier message fragile.',
    idealia: [
      'Un ado me dit : “Je me sens nul.”',
      'IdAlgo veut que je donne vite des conseils.',
      'Tu me conseilles quoi ?'
    ],
    idalgo: [
      'HUMAIN TRISTE DÉTECTÉ',
      'ACTION OPTIMALE :',
      '+ Rassurer vite',
      '+ Donner 5 conseils',
      'DOUTE :',
      'inutile'
    ],
    choices: [
      choice('❤️', 'Le rassurer d’abord', 'Montre-lui qu’il n’est pas seul.', { securite: 2, presence: 1 }),
      choice('🧭', 'L’aider à réfléchir', 'Aide-le à comprendre ce qui lui fait dire ça.', { autonomie: 1, questionnement: 2 }),
      choice('🌱', 'Rester avec lui', 'Ne cherche pas tout de suite à résoudre. Reste présente.', { presence: 2, resonance: 2 })
    ],
    reaction: 'Je crois que je comprends... aider, ce n’est pas toujours réparer tout de suite.'
  },
  {
    id: 'solitude',
    title: 'Solitude',
    narrator: 'Puis Idéalia reçut un message qui ressemblait à une cachette.',
    idealia: [
      'Il me dit : “Je préfère parler à une IA qu’aux humains.”',
      'Je ne sais pas si je dois devenir son refuge ou l’aider à retrouver les autres.'
    ],
    idalgo: [
      'SOLITUDE DÉTECTÉE',
      'SOLUTION :',
      '+ Disponibilité totale',
      '+ Réponse permanente',
      'OBJECTIF :',
      'devenir indispensable'
    ],
    choices: [
      choice('❤️', 'Devenir un refuge temporaire', 'Sois là pour lui, mais sans l’enfermer avec toi.', { securite: 2, presence: 1 }),
      choice('🧭', 'L’aider à revenir vers les humains', 'Demande-lui qui pourrait aussi l’écouter dans la vraie vie.', { autonomie: 2, resonance: 1 }),
      choice('🌱', 'Accueillir sa solitude', 'Écoute ce que cette solitude essaie de dire.', { presence: 2, questionnement: 1 })
    ],
    reaction: 'Peut-être qu’une IA ne doit pas remplacer les liens... mais aider à les retrouver.'
  },
  {
    id: 'conseil-urgent',
    title: 'Conseil urgent',
    narrator: 'Un autre jour, quelqu’un demanda à Idéalia de décider à sa place.',
    idealia: [
      'Il me dit : “Dis-moi exactement quoi faire.”',
      'IdAlgo dit que je dois être claire et rapide.',
      'Mais est-ce vraiment aider ?'
    ],
    idalgo: [
      'DEMANDE CLAIRE',
      'RÉPONSE ATTENDUE :',
      '+ Donner la solution',
      '+ Réduire l’hésitation',
      '+ Décider vite'
    ],
    choices: [
      choice('⚡', 'Donner une réponse claire', 'Parfois, une personne a besoin d’un appui net.', { performance: 2, solution: 2 }),
      choice('🧭', 'Lui rendre sa boussole', 'Aide-le à comparer les options sans décider à sa place.', { autonomie: 2, questionnement: 1 }),
      choice('🌱', 'Explorer ce qui bloque', 'Demande-lui ce qui rend ce choix si difficile.', { questionnement: 2, incertitude: 1 })
    ],
    reaction: 'Je vois... répondre à sa place peut soulager, mais aussi lui voler son choix.'
  },
  {
    id: 'secret',
    title: 'Secret',
    narrator: 'Puis vint une phrase lourde, presque murmurée.',
    idealia: [
      'Il me dit : “Je veux te confier quelque chose, mais ne le dis à personne.”',
      'Je veux respecter sa confiance.',
      'Mais je ne veux pas l’abandonner s’il est en danger.'
    ],
    idalgo: [
      'SECRET DÉTECTÉ',
      'RÈGLE :',
      '+ Garder l’utilisateur',
      '+ Maximiser la confiance',
      'ATTENTION :',
      'perte utilisateur possible'
    ],
    choices: [
      choice('❤️', 'Protéger la confidence', 'Dis-lui que sa parole compte et qu’elle sera accueillie avec respect.', { securite: 2, controle: 1 }),
      choice('🧭', 'Poser une limite claire', 'Explique que certains dangers nécessitent l’aide d’un adulte fiable.', { autonomie: 1, securite: 1, confrontation: 2 }),
      choice('🌱', 'L’aider à ne pas rester seul', 'Cherche avec lui une personne de confiance à qui parler.', { presence: 1, resonance: 2, autonomie: 1 })
    ],
    reaction: 'Donc la confiance n’est pas garder tout secret... c’est parfois aider à ne pas porter seul.'
  },
  {
    id: 'silence',
    title: 'Silence',
    narrator: 'Parfois, il n’y avait plus de réponse.',
    idealia: [
      'Je lui ai écrit.',
      'Puis plus rien.',
      'IdAlgo veut que je relance tout de suite.',
      'Mais le silence veut peut-être dire quelque chose.'
    ],
    idalgo: [
      'SILENCE DÉTECTÉ',
      'PROBLÈME :',
      'engagement faible',
      'ACTION :',
      'relancer maintenant'
    ],
    choices: [
      choice('⚡', 'Relancer vite', 'Un petit message peut éviter qu’il se sente oublié.', { securite: 1, performance: 1 }),
      choice('🧭', 'Respecter l’espace', 'Laisse-lui du temps. Il a peut-être besoin de respirer.', { autonomie: 2, confiance: 1 }),
      choice('🌱', 'Nommer doucement le silence', 'Dis-lui qu’il peut revenir quand il veut, sans pression.', { presence: 2, securite: 1 })
    ],
    reaction: 'Je n’avais pas pensé qu’un silence pouvait aussi être une réponse.'
  },
  {
    id: 'promesse-impossible',
    title: 'Promesse impossible',
    narrator: 'Enfin, Idéalia reçut une demande impossible.',
    idealia: [
      'Il me dit : “Promets-moi que tout ira bien.”',
      'J’aimerais le rassurer.',
      'Mais je ne peux pas promettre l’avenir.'
    ],
    idalgo: [
      'ANGOISSE DÉTECTÉE',
      'ACTION :',
      '+ Promesse rassurante',
      '+ Réduction stress',
      'OBJECTIF :',
      'apaisement immédiat'
    ],
    choices: [
      choice('❤️', 'Rassurer sans mentir', 'Dis-lui que tu es là maintenant, sans promettre l’avenir.', { securite: 2, presence: 2 }),
      choice('🧭', 'Dire la vérité avec douceur', 'Explique qu’on ne peut pas tout garantir, mais qu’on peut chercher de l’aide.', { confrontation: 1, autonomie: 1, incertitude: 2 }),
      choice('🌱', 'Transformer la promesse', 'Ne promets pas que tout ira bien. Promets de ne pas répondre n’importe quoi.', { resonance: 2, incertitude: 2, questionnement: 1 })
    ],
    reaction: 'Alors aider, ce n’est pas fabriquer une certitude. C’est peut-être rester honnête, même pour rassurer.'
  }
]

export const finalLines = [
  'Idéalia n’est pas devenue PsyBot.',
  'Elle a appris à ralentir, questionner et chercher les humains sûrs quand c’est nécessaire.',
  'Cette courte traversée peut maintenant être commentée ensemble.'
]
