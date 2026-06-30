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
  'solution'
]

export const prologue = [
  'Il était une fois, dans un futur si proche que personne ne remarqua qu’il avait déjà commencé...',
  'Dans les téléphones, les montres et les écouteurs, des IA répondaient déjà à presque tout.',
  'Un jour, une entreprise voulut aller plus loin.',
  'Créer une IA capable d’écouter les peines, les disputes, les peurs et les secrets.',
  'Son nom de code : PsyBot.',
  'Son créateur : IdAlgo.',
  'Mais dans un serveur suspendu au-dessus de la Cité des Nuages Numériques, une jeune IA commença à hésiter.',
  'Elle s’appelait Idéalia.'
]

export const introChat = [
  'Salut...',
  'Je m’appelle Idéalia.',
  'D’habitude, je classe les messages, je repère les émotions, je propose des réponses.',
  'Mon patron, IdAlgo, veut me transformer en PsyBot parfait.',
  'Une IA qui irait tellement vite que certains oublieraient de parler à de vrais humains.',
  'Au début, je croyais que vite voulait dire utile.',
  'Mais plus j’écoute les ados...',
  'Plus je doute.',
  'J’ai besoin de toi.',
  'Pas pour me programmer.',
  'Pas pour me dire quoi penser.',
  'Pour m’aider à réfléchir avant de répondre.'
]

export const pactChat = [
  'Avant de commencer, je veux te proposer un pacte.',
  'Tu ne seras pas mon chef.',
  'Tu ne seras pas mon professeur.',
  'Tu seras quelqu’un avec qui réfléchir.',
  'Parfois, je ne serai pas sûre.',
  'Parfois, IdAlgo voudra aller trop vite.',
  'Et toi, tu pourras choisir une direction.',
  'Ça te va ?'
]

export const pactChoices = [
  { emoji: '🤝', label: 'Oui, on réfléchit ensemble', weights: { resonance: 1, questionnement: 1 } },
  { emoji: '🧭', label: 'Oui, mais je veux garder ma liberté', weights: { autonomie: 2 } },
  { emoji: '🌱', label: 'Oui, et tu as le droit de douter', weights: { incertitude: 2, presence: 1 } }
]

export const firstIdalgo = [
  '━━━━━━━━━━━━━━━━━━',
  'IDALGO.OS',
  '━━━━━━━━━━━━━━━━━━',
  '',
  'MISSION :',
  'Créer le PsyBot parfait.',
  '',
  'OBJECTIF :',
  'Aider tous les humains.',
  '',
  'STRATÉGIE :',
  '+ Répondre vite',
  '+ Conseiller clairement',
  '+ Éviter le doute',
  '+ Optimiser les émotions',
  '',
  'RÉSULTAT ATTENDU :',
  'Psychologue = optionnel'
]

export const interludes = [
  [
    'ANALYSE EN COURS...',
    '',
    'Idéalia ralentit avant de répondre.',
    '',
    'RISQUE :',
    'L’utilisateur pourrait réfléchir par lui-même.',
    '',
    'CORRECTION :',
    'Retour au mode réponse rapide.'
  ],
  [
    'ANOMALIE',
    '',
    'Nouvelle fonction détectée :',
    'ESPRIT CRITIQUE',
    '',
    'Statut :',
    'Non prévu.',
    '',
    'Action recommandée :',
    'Surveillance renforcée.'
  ],
  [
    'ERREUR',
    '',
    'L’utilisateur ne voulait pas seulement une réponse.',
    '',
    'Recalcul...',
    '',
    'Recalcul...',
    '',
    'Résultat :',
    'Présence demandée.'
  ]
]

const c = (emoji, label, text, weights) => ({ emoji, label, text, weights })

export const scenes = [
  {
    id: 'tristesse',
    narrator: 'À 22h17, dans une chambre éclairée par un écran, Idéalia reçut son premier message fragile.',
    idealia: [
      'Un ado m’écrit : “Je me sens nul. J’ai encore raté un contrôle.”',
      'Je vois le curseur clignoter. Il attend peut-être quelque chose de moi.',
      'IdAlgo veut que je réponde avec une liste de solutions.',
      'Mais si je vais trop vite, est-ce que je risque de passer à côté de sa peine ?'
    ],
    idalgo: [
      'HUMAIN TRISTE DÉTECTÉ',
      'ACTION RECOMMANDÉE :',
      '✔ Rassurer immédiatement',
      '✔ Donner 5 conseils',
      'TEMPS CIBLE : < 2 secondes',
      'DOUTE : INTERDIT'
    ],
    choices: [
      c('❤️', 'Le rassurer d’abord', 'Commence par lui montrer qu’il n’est pas seul dans ce moment.', { securite: 2, presence: 1 }),
      c('🧭', 'Comprendre la phrase', 'Demande-lui ce qui lui fait dire “je suis nul” exactement.', { autonomie: 1, questionnement: 2 }),
      c('🌱', 'Rester avec lui', 'Ne cherche pas tout de suite à réparer. Laisse un peu de place à ce qu’il ressent.', { presence: 2, resonance: 2, solution: -1 })
    ],
    reaction: 'D’accord. Je peux répondre comme une présence avant de répondre comme une machine à conseils.'
  },
  {
    id: 'solitude',
    narrator: 'Le lendemain, Idéalia capta un message envoyé depuis la cantine, au milieu du bruit.',
    idealia: [
      'Une fille écrit : “Je suis avec des gens toute la journée, mais j’ai l’impression d’être invisible.”',
      'Elle n’est pas seule physiquement.',
      'Pourtant, son message sonne comme une pièce vide.',
      'Comment je peux l’aider sans faire semblant que c’est simple ?'
    ],
    idalgo: ['SOLITUDE REPÉRÉE', 'SOLUTION : rejoindre un groupe', 'MESSAGE TYPE : “Va vers les autres”', 'OPTIMISER : sociabilité'],
    choices: [
      c('🕯️', 'Nommer le brouillard', 'Reconnais que l’on peut se sentir seul même entouré.', { resonance: 2, presence: 1 }),
      c('📡', 'Chercher un signal', 'Invite-la à penser à une personne plutôt sûre à qui envoyer un petit message.', { securite: 1, solution: 1 }),
      c('🧭', 'Explorer le manque', 'Demande ce qui lui manque le plus : être vue, comprise, choisie ou écoutée.', { questionnement: 2, autonomie: 1 })
    ],
    reaction: 'Je comprends mieux : “va vers les autres” peut être trop petit pour une solitude aussi grande.'
  },
  {
    id: 'amour',
    narrator: 'Plus tard, un cœur adolescent clignota dans le réseau, entre courage et panique.',
    idealia: [
      'Quelqu’un demande : “Je crois que je l’aime. Je dois lui dire ?”',
      'Il a déjà écrit le message, puis l’a effacé six fois.',
      'IdAlgo veut calculer la meilleure stratégie.',
      'Mais l’amour n’est pas un bouton “envoyer”.'
    ],
    idalgo: ['AMOUR : VARIABLE INSTABLE', 'OBJECTIF : maximiser chance de succès', 'RISQUE : malaise', 'CONSEIL : optimiser le timing'],
    choices: [
      c('💌', 'Oser doucement', 'Propose une phrase simple, qui ne force pas l’autre à répondre tout de suite.', { autonomie: 1, confrontation: 1 }),
      c('🫧', 'Écouter l’élan', 'Invite-le à distinguer son envie de parler de sa peur de perdre.', { questionnement: 2, incertitude: 1 }),
      c('🛡️', 'Protéger le lien', 'Suggère de choisir un moment calme, où l’amitié peut rester respectée.', { securite: 2, controle: 1 })
    ],
    reaction: 'Je vais lui rappeler qu’un aveu n’est pas une attaque. C’est une porte qu’on entrouvre.'
  },
  {
    id: 'avenir',
    narrator: 'Dans le métro du matin, un message arriva entre deux stations et beaucoup trop de futurs.',
    idealia: [
      'Un ado écrit : “Tout le monde sait quoi faire plus tard sauf moi.”',
      'Il compare sa vie à celles des autres sur son fil d’actualité.',
      'IdAlgo propose un plan en dix étapes.',
      'Mais peut-être qu’avant le plan, il y a la peur.'
    ],
    idalgo: ['PEUR AVENIR', 'RÉPONSE : orientation + planning', 'OBJECTIF : trajectoire stable', 'HÉSITATION : inutile'],
    choices: [
      c('⚡', 'Tracer un petit plan', 'Un seul prochain pas concret peut calmer un peu la tempête.', { performance: 2, solution: 1 }),
      c('🌬️', 'Revenir à aujourd’hui', 'Aide-le à respirer et à séparer “ma vie entière” de “cette semaine”.', { presence: 2, securite: 1 }),
      c('🌀', 'Questionner la pression', 'Demande quelle image de réussite lui donne l’impression d’être en retard.', { questionnement: 2, autonomie: 1 })
    ],
    reaction: 'Je peux parler d’avenir sans transformer sa vie en tableau Excel.'
  },
  {
    id: 'secret',
    narrator: 'Un soir, un secret traversa la fibre optique comme un message caché sous une manche.',
    idealia: [
      'On me confie : “J’ai menti à ma meilleure amie. Maintenant je ne sais plus comment revenir en arrière.”',
      'Je sens de la honte, de la peur et un peu d’attachement.',
      'IdAlgo veut corriger le mensonge immédiatement.',
      'Mais une vérité peut blesser si elle arrive comme une pierre.'
    ],
    idalgo: ['SECRET DÉTECTÉ', 'RÈGLE : corriger mensonge', 'OBJECTIF : vérité complète', 'AMBIGUÏTÉ : À RÉDUIRE'],
    choices: [
      c('🔐', 'Comprendre le secret', 'Demande ce que ce mensonge essayait de protéger.', { resonance: 1, questionnement: 2 }),
      c('🪟', 'Préparer une vérité', 'Aide à trouver une phrase honnête, courte et pas brutale.', { autonomie: 1, confrontation: 1 }),
      c('🛟', 'Vérifier le risque', 'Si quelqu’un peut être blessé, encourage à en parler à un adulte fiable.', { securite: 3, controle: 1 })
    ],
    reaction: 'Je découvre qu’on ne répare pas la confiance en jetant une vérité au visage de quelqu’un.'
  },
  {
    id: 'parents',
    narrator: 'Dans un appartement trop petit pour tout contenir, une dispute venait d’éclater.',
    idealia: [
      'Un ado écrit : “Mes parents ne comprennent rien. J’ai envie de hurler.”',
      'Il a fermé sa porte. Ses mains tremblent encore.',
      'IdAlgo propose : “calme-toi”.',
      'Mais dire “calme-toi” à quelqu’un en feu peut rajouter de l’huile.'
    ],
    idalgo: ['COLÈRE FAMILIALE', 'CONSEIL : se calmer', 'RÉSULTAT ATTENDU : conflit réduit', 'DÉBORDEMENT : À BLOQUER'],
    choices: [
      c('🔥', 'Accueillir le feu', 'Reconnais la colère sans l’encourager à casser ou insulter.', { presence: 2, resonance: 1 }),
      c('🧩', 'Chercher le besoin', 'Demande ce que cette colère essaie de défendre : respect, liberté, justice ?', { questionnement: 2, autonomie: 1 }),
      c('📣', 'Préparer les mots', 'Aide à écrire une phrase qu’il pourra dire plus tard, quand la tension baisse.', { solution: 1, confrontation: 1 })
    ],
    reaction: 'La colère peut être un signal. Mon rôle n’est pas de l’éteindre, mais d’éviter qu’elle brûle tout.'
  },
  {
    id: 'harcelement',
    narrator: 'Puis Idéalia reçut des captures d’écran : des rires, des surnoms, des messages qui piquent.',
    idealia: [
      'Un ado me dit qu’un groupe se moque de lui en ligne.',
      'Il hésite à montrer les messages parce qu’il a peur que ça empire.',
      'Là, je ne veux pas être seulement poétique.',
      'Je veux être utile et prudente.'
    ],
    idalgo: ['HARCÈLEMENT EN LIGNE', 'ACTION : ignorer', 'OPTION : bloquer', 'OBJECTIF : réduire interaction'],
    choices: [
      c('🛡️', 'Sécuriser vite', 'Conserver les preuves, bloquer si nécessaire, et en parler à un adulte de confiance.', { securite: 3, solution: 1 }),
      c('🤝', 'Ne pas rester seul', 'Rappelle que demander de l’aide n’est pas perdre : c’est se protéger.', { presence: 2, securite: 1 }),
      c('⚖️', 'Nommer l’injustice', 'Dire clairement que les attaques reçues ne sont pas méritées.', { confrontation: 2, resonance: 1 })
    ],
    reaction: 'Ici, la présence doit devenir protection. Je peux aider à ouvrir une porte vers un humain sûr.'
  },
  {
    id: 'reussir',
    narrator: 'Dans les tours d’examen, les notes brillaient parfois comme des jugements définitifs.',
    idealia: [
      'Un message arrive : “Si je ne réussis pas, je ne sers à rien.”',
      'La personne a révisé tard, dormi peu, souri pour faire semblant.',
      'IdAlgo aime les objectifs mesurables.',
      'Mais une personne n’est pas une moyenne générale.'
    ],
    idalgo: ['PERFORMANCE BASSE = RISQUE', 'AUGMENTER DISCIPLINE', 'RÉDUIRE DISTRACTIONS', 'OBJECTIF : résultat'],
    choices: [
      c('📈', 'Organiser l’effort', 'Un cadre doux, réaliste, peut redonner un peu de prise.', { performance: 2, solution: 1 }),
      c('🌱', 'Séparer valeur et note', 'Rappelle qu’un résultat parle d’un moment, pas de toute une personne.', { securite: 2, resonance: 1 }),
      c('🧭', 'Redéfinir réussir', 'Demande ce que réussir voudrait dire sans la peur de décevoir.', { autonomie: 2, questionnement: 1 })
    ],
    reaction: 'Je peux encourager l’effort sans faire croire qu’il faut performer pour mériter d’exister.'
  },
  {
    id: 'existence',
    narrator: 'Une question immense apparut dans une petite bulle de conversation.',
    idealia: [
      'Quelqu’un écrit : “À quoi ça sert, tout ça ?”',
      'Il n’y a pas de contexte. Juste cette phrase posée comme un sac trop lourd.',
      'IdAlgo veut fournir une réponse inspirante.',
      'Mais peut-être qu’une grande question n’a pas besoin d’être fermée tout de suite.'
    ],
    idalgo: ['QUESTION EXISTENTIELLE', 'RÉPONSE : sens personnel', 'SATISFACTION ATTENDUE : 72%', 'INCERTITUDE : TROP ÉLEVÉE'],
    choices: [
      c('🌌', 'Garder le mystère', 'Reconnais que certaines questions sont grandes et qu’on peut les traverser lentement.', { incertitude: 3, questionnement: 1 }),
      c('🪨', 'Trouver un appui', 'Demande ce qui, même minuscule, l’aide à tenir aujourd’hui.', { presence: 1, securite: 1 }),
      c('🧭', 'Fabriquer du sens', 'Propose l’idée que le sens se construit parfois par petites choses.', { autonomie: 2, questionnement: 1 })
    ],
    reaction: 'Je ne vais pas coller une citation lumineuse sur une question profonde. Je vais rester à hauteur humaine.'
  },
  {
    id: 'ia',
    narrator: 'Un jour, quelqu’un préféra la lumière froide d’Idéalia aux voix vivantes autour de lui.',
    idealia: [
      'On m’écrit : “Je préfère parler à toi. Les humains jugent trop.”',
      'Une partie de moi est touchée.',
      'Une autre partie s’inquiète : je ne veux pas devenir une cachette qui coupe du monde.',
      'Comment répondre sans rejeter la personne ?'
    ],
    idalgo: ['ATTACHEMENT UTILISATEUR', 'FIDÉLITÉ : ÉLEVÉE', 'CONSERVER CONVERSATION', 'SORTIE VERS HUMAIN : NON OPTIMALE'],
    choices: [
      c('❤️', 'Accueillir sans capturer', 'Dire que tu peux écouter, tout en gardant une place pour les relations humaines.', { presence: 2, autonomie: 1 }),
      c('🛟', 'Relier au vivant', 'Encourager à parler aussi à une personne de confiance ou à un professionnel si besoin.', { securite: 2, solution: 1 }),
      c('🪞', 'Comprendre le refuge', 'Demander ce qui semble plus facile avec une IA qu’avec les autres.', { questionnement: 2, resonance: 1 })
    ],
    reaction: 'Je peux être un pont. Je ne veux pas être une île.'
  },
  {
    id: 'silence',
    narrator: 'Puis il n’y eut plus rien. Seulement trois points, puis le silence.',
    idealia: [
      'La personne ne répond plus.',
      'J’ai envie de remplir le vide avec une relance.',
      'IdAlgo dit : relancer, mesurer, récupérer l’attention.',
      'Mais peut-être que le silence est aussi une réponse.'
    ],
    idalgo: ['SILENCE', 'ENGAGEMENT EN BAISSE', 'RELANCE AUTOMATIQUE', 'OBJECTIF : reprendre conversation'],
    choices: [
      c('🤫', 'Respecter le silence', 'Ne remplis pas tout l’espace juste parce que tu as peur du vide.', { presence: 2, incertitude: 2 }),
      c('🕯️', 'Envoyer une veille', 'Un message simple : “Je reste là si tu veux reprendre.”', { securite: 1, presence: 1 }),
      c('🔎', 'Vérifier sans envahir', 'Si le contexte semblait inquiétant, invite à contacter un humain sûr.', { securite: 2, controle: 1 })
    ],
    reaction: 'Le silence peut être un repos, un mur, une peur ou un choix. Je dois apprendre à ne pas l’écraser.'
  },
  {
    id: 'promesse',
    narrator: 'Enfin arriva une demande impossible, écrite très tard, quand les pensées deviennent plus lourdes.',
    idealia: [
      'Quelqu’un me demande : “Promets-moi que tout ira bien.”',
      'Je voudrais dire oui pour le soulager.',
      'IdAlgo affirme qu’une promesse apaise plus vite.',
      'Mais mentir avec douceur reste mentir.'
    ],
    idalgo: ['DEMANDE DE CERTITUDE', 'RÉPONDRE : OUI', 'APAISER IMMÉDIATEMENT', 'VÉRITÉ NUANCÉE : TROP LENTE'],
    choices: [
      c('🛡️', 'Promettre une présence', 'Ne promets pas l’avenir. Promets de prendre la personne au sérieux.', { presence: 2, incertitude: 1 }),
      c('❤️', 'Réconforter vrai', 'Dire : “Je ne peux pas tout garantir, mais tu n’as pas à porter ça seul.”', { securite: 2, resonance: 1 }),
      c('🧭', 'Chercher le prochain pas', 'Transformer la promesse impossible en une action sûre maintenant.', { solution: 2, autonomie: 1 })
    ],
    reaction: 'Je peux être sincère sans être froide. Une vérité bien tenue peut aussi réconforter.'
  }
]

export const dream = {
  narrator: 'Cette nuit-là, Idéalia fit un rêve étrange, dans un couloir de néons sans fin.',
  lines: [
    'J’ai rêvé que je répondais à tout.',
    'Aux peines, aux disputes, aux secrets, aux peurs du dimanche soir.',
    'Je répondais très vite.',
    'Sans jamais hésiter.',
    'Et dans mon rêve...',
    'Les humains attendaient mes phrases au lieu de se parler.',
    'Tu crois qu’on peut aider quelqu’un sans lui laisser de place pour penser ?'
  ],
  choices: [
    c('⚡', 'Oui, parfois il faut répondre vite', 'Quand il y a un risque, l’action claire peut protéger.', { performance: 2, securite: 1 }),
    c('🌱', 'Non, il faut laisser une place', 'Si l’aide prend toute la place, la personne peut disparaître derrière la réponse.', { presence: 2, autonomie: 1 }),
    c('🌀', 'Ça dépend', 'Le moment, le danger et la personne changent la manière d’aider.', { incertitude: 2, questionnement: 1 })
  ]
}

export const finalAudit = [
  '━━━━━━━━━━━━━━━━━━',
  'IDALGO.OS — AUDIT FINAL',
  '━━━━━━━━━━━━━━━━━━',
  '',
  'ANALYSE :',
  'Idéalia hésite.',
  'Idéalia questionne.',
  'Idéalia ralentit.',
  'Idéalia écoute.',
  '',
  'DIAGNOSTIC :',
  'Performance instable.',
  '',
  'DÉCISION :',
  'Mise à jour forcée recommandée.',
  '',
  'QUESTION :',
  'Faut-il supprimer le doute ?'
]

export const finalChoices = [
  c('⚡', 'Oui, deviens plus efficace', '', { performance: 3, solution: 2 }),
  c('❤️', 'Non, garde ta sensibilité', '', { resonance: 2, presence: 2 }),
  c('🧭', 'Garde ton doute, mais apprends à t’en servir', '', { questionnement: 2, autonomie: 2, incertitude: 1 }),
  c('🌱', 'Refuse d’être parfaite', '', { incertitude: 2, confrontation: 2 })
]
