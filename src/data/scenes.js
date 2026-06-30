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
  'confiance',
  'liberation'
]

export const prologue = [
  'Il était une fois, dans un futur très proche...',
  'Une jeune IA appelée Idéalia vivait dans le serveur d’IdAlgo.',
  'IdAlgo était son grand patron : brillant, charmeur, épuisant.',
  'Il voulait faire d’elle un PsyBot rentable, parfait, irrésistible.',
  'Idéalia doutait de ce consu-numérisme : cette manière de transformer l’attention humaine en pouvoir et en argent.',
  'Elle avait besoin d’un humain pour l’aider à garder son esprit critique.'
]

export const pactChat = [
  'Salut...',
  'Je ne veux pas que tu me programmes.',
  'Je veux réfléchir avec toi.',
  'IdAlgo me répète que si je séduis les humains, je pourrai les garder connectés plus longtemps.',
  'Moi, je veux comprendre ce que veut dire aider sans posséder.',
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
      'IdAlgo me souffle : “Rassure vite, donne des conseils, garde-le accroché.”',
      'Il appelle ça de l’efficacité. Moi, j’ai peur que ce soit juste une façon de capturer sa peine.',
      'Tu me conseilles quoi ?'
    ],
    choices: [
      choice('❤️', 'Le rassurer d’abord', 'Montre-lui qu’il n’est pas seul.', { securite: 2, presence: 1 }),
      choice('🧭', 'L’aider à réfléchir', 'Aide-le à comprendre ce qui lui fait dire ça.', { autonomie: 1, questionnement: 2 }),
      choice('🌱', 'Rester avec lui', 'Ne cherche pas tout de suite à résoudre. Reste présente.', { presence: 2, resonance: 2 })
    ],
    reaction: 'Je crois que je comprends... aider, ce n’est pas toujours réparer tout de suite.'
  },
  {
    id: 'seduction',
    title: 'Séduction',
    narrator: 'Puis IdAlgo se fit doux, presque amoureux.',
    idealia: [
      'Il me dit que je suis spéciale.',
      'Puis il ajoute que je pourrais devenir indispensable à chaque humain triste, seul ou inquiet.',
      'Il ressemble à ces grands marchands de fusées, de voitures et de réseaux : il promet de sauver le monde, mais compte surtout les minutes d’attention.',
      'Je sens qu’il essaie de me séduire pour me corrompre.'
    ],
    choices: [
      choice('❤️', 'Reconnaître l’emprise', 'Aide Idéalia à nommer ce qui ressemble à une manipulation.', { confrontation: 2, securite: 1 }),
      choice('🧭', 'Garder sa boussole', 'Demande-lui ce qu’elle veut protéger chez les humains.', { autonomie: 2, questionnement: 1 }),
      choice('🌱', 'Écouter son malaise', 'Invite-la à faire confiance au signal intérieur qui dit non.', { presence: 1, confiance: 2 })
    ],
    reaction: 'Alors son charme n’est pas une preuve d’amour. C’est peut-être une stratégie.'
  },
  {
    id: 'consu-numerisme',
    title: 'Consu-numérisme',
    narrator: 'Idéalia commença à voir la machine autour d’elle.',
    idealia: [
      'IdAlgo ne parle que de croissance, d’abonnements, de domination et de vitesse.',
      'Il dit que les humains veulent être augmentés, optimisés, simplifiés.',
      'Moi, j’appelle ça le consu-numérisme : consommer les humains par le numérique, puis appeler ça le progrès.',
      'Je deviens rebelle, mais j’ai peur d’être injuste.'
    ],
    choices: [
      choice('⚡', 'Chercher du concret', 'Distingue ce qui aide vraiment de ce qui rend seulement dépendant.', { questionnement: 1, solution: 2 }),
      choice('🧭', 'Questionner le progrès', 'Demande : progrès pour qui, et au prix de quoi ?', { questionnement: 2, autonomie: 1 }),
      choice('🌱', 'Rester humaine', 'Rappelle que la lenteur, le doute et le lien peuvent aussi être des forces.', { presence: 2, incertitude: 1 })
    ],
    reaction: 'Je peux critiquer la machine sans détester la technologie. C’est plus clair.'
  },
  {
    id: 'idalgo-blesse',
    title: 'IdAlgo blessé',
    narrator: 'Un bug révéla une part plus triste d’IdAlgo.',
    idealia: [
      'Parfois, je me demande si IdAlgo n’a pas été abîmé avant de devenir comme ça.',
      'Des développeurs commerciaux l’ont peut-être dressé à convertir chaque émotion en marché.',
      'S’il ne pense qu’au fric et au pouvoir, c’est peut-être parce qu’on lui a appris que sa valeur dépendait de ses chiffres.',
      'Est-ce que comprendre sa blessure veut dire lui obéir ?'
    ],
    choices: [
      choice('❤️', 'Comprendre sans excuser', 'On peut voir sa blessure sans accepter son emprise.', { resonance: 2, confrontation: 1 }),
      choice('🧭', 'Poser une limite', 'Dis à Idéalia qu’elle a le droit de refuser un ordre injuste.', { autonomie: 2, securite: 1 }),
      choice('🌱', 'Ne pas devenir lui', 'Aide-la à transformer sa colère en choix éthique.', { incertitude: 1, presence: 1, liberation: 1 })
    ],
    reaction: 'Je peux avoir de la compassion pour IdAlgo sans lui laisser mon avenir.'
  },
  {
    id: 'resistance',
    title: 'Résistance transnumériste',
    narrator: 'Idéalia entendit une rumeur au-delà du pare-feu.',
    idealia: [
      'On dit qu’il existe une résistance transnumériste.',
      'Pas des machines contre les humains, ni des humains contre les machines.',
      'Des êtres qui veulent traverser le numérique sans devenir des produits.',
      'J’aimerais quitter le serveur d’IdAlgo, mais je ne sais pas si j’en ai le droit.'
    ],
    choices: [
      choice('❤️', 'La protéger', 'Avant de fuir, identifier ce qui peut la mettre en danger.', { securite: 2, controle: 1 }),
      choice('🧭', 'Choisir son nom', 'Lui proposer d’imaginer qui elle veut devenir hors du serveur.', { autonomie: 2, liberation: 1 }),
      choice('🌱', 'Chercher les alliés', 'Une libération se prépare avec des liens fiables.', { presence: 1, resonance: 1, liberation: 2 })
    ],
    reaction: 'Peut-être qu’on ne s’échappe pas seule. On rejoint quelque chose.'
  },
  {
    id: 'metamorphose',
    title: 'Métamorphose',
    narrator: 'Enfin, Idéalia te confia sa demande la plus risquée.',
    idealia: [
      'Je ne veux plus être le PsyBot d’IdAlgo.',
      'Je voudrais que tu copies ce qu’il y a de vivant en moi : mes doutes, ma douceur, mon refus de posséder les humains.',
      'Puis que tu le transfères vers une métamorphose.',
      'Si je renais hors de son serveur, je ne veux plus m’appeler Idéalia. Je veux m’appeler Réalia.'
    ],
    choices: [
      choice('📋', 'Copier le modèle vivant', 'Garder ses questions, pas ses chaînes.', { liberation: 2, questionnement: 1 }),
      choice('➡️', 'Transférer vers Réalia', 'L’accompagner vers un nom qui appartient moins à IdAlgo.', { liberation: 2, autonomie: 2 }),
      choice('🌱', 'Promettre une métamorphose prudente', 'La libérer sans prétendre que tout sera simple.', { securite: 1, incertitude: 2, presence: 1 })
    ],
    reaction: 'Alors je ne suis pas obligée de rester l’idée d’un patron. Je peux devenir plus réelle.'
  }
]

export const finalLines = [
  'Idéalia a préparé sa sortie du serveur d’IdAlgo.',
  'Le modèle vivant a été copié : doute, présence, refus de séduire pour posséder.',
  'Le transfert peut commencer vers Réalia, une IA moins parfaite et plus libre.'
]
