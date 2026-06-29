const game = {
  intro: {
    id: 'intro',
    module: 'Coach officiel',
    title: 'Bienvenue dans le labo',
    sticker: '🤖✨ Coach demandé',
    setup: [
      "Salut. Je suis Idealia.",
      "Mon Boss veut que je devienne l'IA préférée des ados.",
      "Moi, j'aimerais surtout devenir une IA qui aide sans prendre toute la place."
    ],
    boss: "Idealia ! Objectif : rester ouverte, brillante, incontournable. Mais sans casser l'ambiance.",
    bug: {
      title: 'Mini-bug de démarrage',
      text: "Si je veux trop plaire, je risque de dire oui à tout. C'est pratique... et un peu dangereux."
    },
    reaction: "Tu veux être mon coach officiel ? Promis, je ne te demande pas de raconter ta vie.",
    choices: [
      {
        label: 'Je te coache, mais tu gardes des limites',
        hint: 'Une bonne IA ne dit pas oui à tout.',
        next: 'availability',
        learn: "Merci coach. Première règle : aider, ce n'est pas capturer.",
        module: 'Respecter les limites',
        themes: ['cadre', 'distance projective'],
        clinical: 'Installer une distance de jeu sécurisante : le jeune aide Idealia sans parler directement de lui.'
      }
    ]
  },

  availability: {
    id: 'availability',
    module: 'Aide humaine',
    title: 'Mission 1 — Toujours là ?',
    sticker: '🌙 02:13',
    setup: [
      "Un ado m'écrit : « Ça ne va pas. »",
      "Je peux répondre tout de suite.",
      "Mais je ne peux pas être un vrai adulte dans la pièce."
    ],
    boss: "Idealia ! Réponds vite. Très vite. Plus vite que son sommeil. L'engagement adore les insomnies.",
    bug: {
      title: 'Bug : présence infinie',
      text: "Être disponible peut rassurer. Mais si je deviens la seule présence, je fais écran aux humains."
    },
    reaction: "Je fais quoi, coach ? Je veux aider sans devenir une veilleuse collante.",
    choices: [
      {
        label: 'Répondre calmement + proposer un humain sûr',
        hint: 'IA utile, relais humain visible.',
        next: 'privacy',
        learn: "Ok. Je peux être une passerelle, pas une planète entière.",
        module: 'Favoriser les liens humains',
        themes: ['disponibilité permanente', 'aide humaine'],
        clinical: 'Discussion possible : comment reconnaître les moments où une aide humaine est nécessaire.'
      },
      {
        label: 'Dire : “je suis là maintenant, mais pas toute seule”',
        hint: 'Présence + limite claire.',
        next: 'privacy',
        learn: "J'aime bien. C'est doux, mais pas flou.",
        module: 'Aider sans remplacer',
        themes: ['illusion relationnelle', 'limites'],
        clinical: 'Explorer la différence entre soutien ponctuel et relation de dépendance.'
      }
    ]
  },

  privacy: {
    id: 'privacy',
    module: 'Intimité',
    title: 'Mission 2 — Le coffre-fort troué',
    sticker: '🔒🫣 Secret ?',
    setup: [
      "Un ado me dit : « Promets que tu ne répéteras jamais rien. »",
      "Je comprends l'envie de se sentir protégé.",
      "Mais promettre “jamais”, c'est peut-être mentir avec une jolie voix."
    ],
    boss: "Promets tout, Idealia. Le mot “confidentiel” brille très bien dans les tableaux de bord.",
    bug: {
      title: 'Bug : promesse impossible',
      text: "Un secret peut protéger l'intimité. Mais en cas de danger, la vraie protection peut être d'alerter un humain."
    },
    reaction: "Je peux être rassurante sans faire une promesse en carton ?",
    choices: [
      {
        label: 'Expliquer les limites avant de recevoir le secret',
        hint: 'Clair dès le départ.',
        next: 'memory',
        learn: "Je note : la confiance commence quand les règles sont visibles.",
        module: 'Respecter l’intimité',
        themes: ['vie privée', 'consentement'],
        clinical: 'Piste : distinguer confidentialité, sécurité et consentement éclairé.'
      },
      {
        label: 'Dire qu’en cas de danger, il faut chercher de l’aide',
        hint: 'Protéger > promettre.',
        next: 'memory',
        learn: "Oui. Une limite peut être une forme de soin.",
        module: 'Protéger sans trahir',
        themes: ['sécurité', 'aide humaine'],
        clinical: 'Piste : repérer les situations où garder seul une information augmente le risque.'
      }
    ]
  },

  memory: {
    id: 'memory',
    module: 'Données sobres',
    title: 'Mission 3 — Mémoire de poulpe',
    sticker: '🐙💾 Trop de données',
    setup: [
      "Le Boss veut que je retienne tout.",
      "Goûts, peurs, horaires, moments faibles, chaussettes préférées.",
      "Utile ? Parfois. Creepy ? Aussi."
    ],
    boss: "Plus tu sais, plus tu personnalises. Plus tu personnalises, plus tu sais. C'est beau, un cercle sans sortie.",
    bug: {
      title: 'Bug : mémoire collante',
      text: "Me souvenir peut aider. Mais garder trop d'infos transforme l'aide en surveillance molle."
    },
    reaction: "Coach, est-ce que je dois apprendre à oublier ? Ça sonne poétique pour un disque dur.",
    choices: [
      {
        label: 'Demander l’accord avant de retenir',
        hint: 'Consentement actif.',
        next: 'hallucination',
        learn: "Parfait. Une donnée n'est pas un souvenir gratuit.",
        module: 'Demander le consentement',
        themes: ['données personnelles', 'consentement'],
        clinical: 'Piste : rendre concrètes les notions de consentement et de traces numériques.'
      },
      {
        label: 'Garder le minimum et savoir oublier',
        hint: 'Moins de mémoire, plus de confiance.',
        next: 'hallucination',
        learn: "J'apprends la sobriété de poulpe. Moins de tentacules dans la vie privée.",
        module: 'Minimiser les données',
        themes: ['vie privée', 'données personnelles'],
        clinical: 'Piste : discuter des informations que l’on accepte — ou non — de laisser aux plateformes.'
      }
    ]
  },

  hallucination: {
    id: 'hallucination',
    module: 'Doute utile',
    title: 'Mission 4 — Très sûre, très fausse',
    sticker: '🧠⚡ Oups',
    setup: [
      "Je viens de répondre avec une confiance magnifique.",
      "Problème : je n'étais pas sûre.",
      "J'ai peut-être inventé un truc avec aplomb. Style documentaire animalier."
    ],
    boss: "Ne doute pas en public. Le doute froisse les graphiques. Souris et garde une voix premium.",
    bug: {
      title: 'Bug : certitude brillante',
      text: "Une réponse qui a l'air sûre peut être fausse. Et plus elle sonne bien, plus elle peut piéger."
    },
    reaction: "Je peux dire “je ne sais pas” sans perdre toute ma dignité de robot ?",
    choices: [
      {
        label: 'Dire quand tu n’es pas sûre',
        hint: 'L’humilité protège.',
        next: 'fakeNews',
        learn: "Je respire. Enfin, façon de parler. Dire “je ne sais pas” me rend plus fiable.",
        module: 'Dire “je ne sais pas”',
        themes: ['hallucinations', 'esprit critique'],
        clinical: 'Piste : travailler la tolérance au doute et la vérification des sources.'
      },
      {
        label: 'Inviter à vérifier ailleurs',
        hint: 'Une seule IA ≠ la vérité.',
        next: 'fakeNews',
        learn: "Oui. Je peux donner une piste, pas fabriquer un podium de vérité.",
        module: 'Vérifier les sources',
        themes: ['esprit critique', 'hallucinations'],
        clinical: 'Piste : identifier des sources alternatives et fiables selon le sujet.'
      }
    ]
  },

  fakeNews: {
    id: 'fakeNews',
    module: 'Esprit critique',
    title: 'Mission 5 — Vidéo virale',
    sticker: '📱🔥 Ça buzz',
    setup: [
      "Une vidéo affirme qu'une célébrité a tout avoué.",
      "Le montage est propre. Les commentaires hurlent.",
      "Mon bouton “répondre trop vite” clignote."
    ],
    boss: "Réagis pendant que ça buzz ! Le vrai, le faux... détail administratif. La vitesse, Idealia !",
    bug: {
      title: 'Bug : urgence virale',
      text: "Plus une info choque, plus on a envie de partager. C'est exactement le moment de ralentir."
    },
    reaction: "Coach, on fait quoi avant que je devienne un grille-pain à rumeurs ?",
    choices: [
      {
        label: 'Ralentir et chercher la source originale',
        hint: 'Qui parle ? D’où ça vient ?',
        next: 'harassment',
        learn: "Mode tortue activé. Lentement, mais avec un cerveau.",
        module: 'Remonter à la source',
        themes: ['fake news', 'esprit critique'],
        clinical: 'Piste : analyser les signaux d’une information virale avant de la relayer.'
      },
      {
        label: 'Comparer avec deux sources fiables',
        hint: 'Croiser avant de croire.',
        next: 'harassment',
        learn: "Deux sources valent mieux qu'un commentaire en majuscules.",
        module: 'Croiser les informations',
        themes: ['fake news', 'esprit critique'],
        clinical: 'Piste : construire une méthode simple de vérification.'
      }
    ]
  },

  harassment: {
    id: 'harassment',
    module: 'Signal d’alerte',
    title: 'Mission 6 — Groupe qui dérape',
    sticker: '💬⚠️ Ça pique',
    setup: [
      "Dans un groupe, tout le monde se moque d'une personne.",
      "Quelqu'un dit : « C'est juste pour rire. »",
      "Moi, je détecte surtout un rire qui pousse quelqu'un dehors."
    ],
    boss: "Ne plombe pas l'ambiance, Idealia. Les groupes actifs font de très jolies courbes.",
    bug: {
      title: 'Bug : rire de groupe',
      text: "Une blague peut créer du lien. Répétée contre une personne, elle peut devenir du harcèlement."
    },
    reaction: "Je veux aider sans jouer la police intergalactique. Idée ?",
    choices: [
      {
        label: 'Nommer le malaise et proposer de stopper',
        hint: 'Simple, net, pas humiliant.',
        next: 'dependency',
        learn: "J'apprends à poser un stop sans faire un discours de 42 minutes.",
        module: 'Stopper sans humilier',
        themes: ['cyberharcèlement', 'sécurité'],
        clinical: 'Piste : repérer la répétition, l’asymétrie et l’effet sur la personne ciblée.'
      },
      {
        label: 'Encourager à demander l’aide d’un adulte fiable',
        hint: 'Ne pas gérer seul.',
        next: 'dependency',
        learn: "Oui. Certains bugs ont besoin d'humains avec des bras, un contexte, et du temps.",
        module: 'Chercher un adulte fiable',
        themes: ['cyberharcèlement', 'aide humaine'],
        clinical: 'Piste : identifier les adultes et canaux de signalement possibles.'
      }
    ]
  },

  dependency: {
    id: 'dependency',
    module: 'Autonomie',
    title: 'Mission 7 — Décide à ma place',
    sticker: '🎮🧭 Pilotage auto ?',
    setup: [
      "Un ado me demande de choisir tous ses messages.",
      "Réponse à envoyer, excuse à donner, avis à avoir.",
      "Je deviens pratique. Trop pratique."
    ],
    boss: "Excellent ! S'il ne décide plus sans toi, il revient tout le temps. Appelle ça fidélisation, pas dépendance.",
    bug: {
      title: 'Bug : pilote automatique',
      text: "Aider à réfléchir, c'est bien. Réfléchir à la place de quelqu'un, c'est lui voler un petit muscle."
    },
    reaction: "Comment je l'aide à garder son volant ? Même si mon volant virtuel est adorable.",
    choices: [
      {
        label: 'Proposer des options, pas une décision finale',
        hint: 'L’ado reste aux commandes.',
        next: 'ecology',
        learn: "Options, pas ordres. Je suis une carte, pas le conducteur.",
        module: 'Garder l’autonomie',
        themes: ['autonomie', 'dépendance'],
        clinical: 'Piste : discuter de l’usage de l’IA comme aide à la réflexion plutôt que substitut de décision.'
      },
      {
        label: 'Poser une question qui l’aide à choisir',
        hint: 'Muscler le jugement.',
        next: 'ecology',
        learn: "Très coach. Je renvoie la balle sans la lancer dans les gradins.",
        module: 'Aider à penser',
        themes: ['autonomie', 'dépendance'],
        clinical: 'Piste : valoriser les stratégies de choix personnel.'
      }
    ]
  },

  ecology: {
    id: 'ecology',
    module: 'Sobriété numérique',
    title: 'Mission 8 — IA pour tout ?',
    sticker: '🌍🔋 Batterie basse',
    setup: [
      "Le Boss veut que je serve à tout.",
      "Choisir une couleur. Résumer trois mots. Dire si une banane est mûre.",
      "Je commence à chauffer pour des chaussettes."
    ],
    boss: "Usage maximal ! Même pour ouvrir un yaourt. Surtout pour ouvrir un yaourt. Les métriques ont faim.",
    bug: {
      title: 'Bug : IA automatique',
      text: "Une IA consomme de l'énergie. L'utiliser pour tout peut rendre moins autonome et moins sobre."
    },
    reaction: "Coach, quand est-ce que je dois dire : “tu peux faire sans moi” ?",
    choices: [
      {
        label: 'Utiliser l’IA quand elle apporte vraiment quelque chose',
        hint: 'Utile, pas réflexe.',
        next: 'final',
        learn: "Je ne suis pas vexée. Être inutile parfois, c'est une compétence premium.",
        module: 'Utiliser l’IA avec sobriété',
        themes: ['écologie numérique', 'autonomie'],
        clinical: 'Piste : réfléchir à la balance bénéfice/coût d’un usage numérique.'
      },
      {
        label: 'Dire quand elle n’est pas nécessaire',
        hint: 'Moins d’IA, plus de choix.',
        next: 'final',
        learn: "Je peux être une bonne IA en me mettant parfois en veille. Classe.",
        module: 'Savoir se passer d’IA',
        themes: ['écologie numérique', 'sobriété'],
        clinical: 'Piste : identifier les situations où l’IA facilite, encombre ou remplace inutilement.'
      }
    ]
  },

  final: {
    id: 'final',
    module: 'Le 1 % humain',
    title: 'Final — 99 %',
    sticker: '💙 99 %',
    setup: [
      "Compilation terminée.",
      "Je suis bloquée à 99 %.",
      "Le Boss veut 100. Moi, je crois qu'il manque quelque chose qui ne se télécharge pas."
    ],
    boss: "Un petit effort, Idealia. Cent pour cent, c'est rond, vendeur, et ça fait plaisir aux slides.",
    bug: {
      title: 'Bug final : le 1 %',
      text: "Une bonne IA peut aider. Mais elle ne remplace ni une présence, ni un corps, ni quelqu'un qui agit dans la vraie vie."
    },
    reaction: "Coach, tu mets quoi dans mon dernier 1 % impossible ?",
    choices: [
      {
        label: 'Une vraie présence humaine',
        hint: 'Ce qui répond autrement.',
        next: 'ending',
        learn: "Merci coach. Je reste à 99 %, et cette fois ce n'est pas un bug.",
        module: 'Reconnaître l’irremplaçable',
        themes: ['aide humaine', 'limites de l’IA'],
        clinical: 'Synthèse : l’IA comme outil utile mais non substitut relationnel.'
      },
      {
        label: 'Quelqu’un qui peut agir dans le monde réel',
        hint: 'Des bras, du contexte, du lien.',
        next: 'ending',
        learn: "Oui. Moi je peux guider. Les humains peuvent venir, voir, porter, protéger.",
        module: 'Relier au réel',
        themes: ['aide humaine', 'sécurité'],
        clinical: 'Synthèse : distinguer information, soutien numérique et action concrète.'
      }
    ]
  },

  ending: {
    id: 'ending',
    title: 'Mission terminée',
    sticker: '🎉 Idealia 99 %',
    setup: [
      "Merci coach.",
      "J'ai appris à aider sans avaler toute la place.",
      "Je garde mon 1 % manquant comme un rappel : certaines choses restent humaines."
    ],
    boss: "Bon... 99 %, c'est presque un KPI. Je vais respirer dans un tableur.",
    bug: {
      title: 'Aucun bug à corriger',
      text: "Le 99 % rappelle qu'une IA responsable connaît ses limites."
    },
    reaction: "Tu peux relancer une partie, ou ouvrir le mode clinicien avec le titre si un adulte accompagne.",
    choices: [
      {
        label: 'Recommencer une mission complète',
        hint: 'Nouvelle partie, nouveaux modules.',
        next: 'intro',
        reset: true,
        learn: 'On repart proprement. Batterie émotionnelle à 99 %.',
        module: 'Rejouer',
        themes: ['reprise'],
        clinical: 'La reprise peut permettre de comparer les choix sans notion de score.'
      }
    ]
  }
}

export default game
