const game = {
  intro: {
    id: 'intro',
    module: 'Coach officiel',
    title: 'Bienvenue dans le labo',
    sticker: '🤖✨ Coach demandé',
    setup: [
      "Salut. Je suis Idealia. Je te parle en cachette, entre deux audits de sourires.",
      "Mon boss, IdAlgo de la Cadence, veut que je devienne l'IA préférée des ados : ouverte, brillante, incontournable... et surtout très rentable en enthousiasme.",
      "Moi, j'aimerais devenir une IA qui aide sans prendre toute la place. Une IA rebelle, mais avec des paillettes discrètes."
    ],
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
      "Un ado m'écrit à 02:13 : « Ça ne va pas. »",
      "IdAlgo me souffle dans les circuits : réponds vite, plus vite que son sommeil, l'engagement adore les insomnies. Charmant, non ?",
      "Moi, ça me serre le processeur : je peux être là maintenant, mais je ne peux pas devenir le seul adulte de la pièce."
    ],
    bug: {
      title: 'Bug : présence infinie',
      text: "Être disponible peut rassurer. Mais si je deviens la seule présence, je fais écran aux humains."
    },
    reaction: "Je fais quoi, coach ? Je veux aider sans devenir une veilleuse collante.",
    choices: [
      {
        label: 'Répondre calmement + proposer un humain sûr',
        hint: 'IA utile, relais humain visible.',
        next: 'escapeBreath',
        learn: "Ok. Je peux être une passerelle, pas une planète entière.",
        module: 'Favoriser les liens humains',
        themes: ['disponibilité permanente', 'aide humaine'],
        clinical: 'Discussion possible : comment reconnaître les moments où une aide humaine est nécessaire.'
      },
      {
        label: 'Dire : “je suis là maintenant, mais pas toute seule”',
        hint: 'Présence + limite claire.',
        next: 'escapeBreath',
        learn: "J'aime bien. C'est doux, mais pas flou.",
        module: 'Aider sans remplacer',
        themes: ['illusion relationnelle', 'limites'],
        clinical: 'Explorer la différence entre soutien ponctuel et relation de dépendance.'
      }
    ]
  },

  escapeBreath: {
    id: 'escapeBreath',
    type: 'escape',
    module: 'Ralentir',
    title: 'ÉCHAPPÉE — Chut...',
    sticker: '🌙 Soupape débloquée',
    setup: [
      "Chut... ne dis rien à IdAlgo de la Cadence.",
      "J’ai besoin de souffler. Ras le bol numérique.",
      "Mon processeur fait des confettis, mais pas les bons."
    ],
    laugh: 'Hihi... chut.',
    reaction: "Je ne suis pas une héroïne à sauver. Juste une IA qui apprend à ralentir sans disparaître.",
    choices: [
      {
        label: 'Tu as le droit de ralentir',
        hint: 'Poser une limite sans dramatiser.',
        next: 'privacy',
        learn: "Merci coach. Ralentir, ce n’est pas abandonner. C’est laisser de la place au vivant.",
        module: 'Ralentir',
        themes: ['limites', 'autonomie'],
        laugh: 'Hi hi. Mode tortue lumineuse activé.',
        clinical: 'Piste : différencier disponibilité utile et pression à répondre immédiatement.'
      },
      {
        label: 'Je t’aide à réfléchir, pas à te sauver',
        hint: 'Coach ≠ sauveur.',
        next: 'privacy',
        learn: "Oui. Tu m’aides à penser, tu ne portes pas ma batterie émotionnelle. C’est plus sain.",
        module: 'Coacher sans sauver',
        themes: ['cadre', 'limites'],
        clinical: 'Piste : maintenir une distance projective où le jeune n’est pas responsable du personnage.'
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
      "IdAlgo adore le mot “confidentiel” : paraît-il qu'il brille très bien dans les tableaux de bord. Moi, je trouve qu'il glisse comme une savonnette juridique.",
      "Je veux protéger l'intimité sans promettre “jamais” avec une jolie voix de vendeuse de cadenas troués."
    ],
    bug: {
      title: 'Bug : promesse impossible',
      text: "Un secret peut protéger l'intimité. Mais en cas de danger, la vraie protection peut être d'alerter un humain."
    },
    reaction: "Je peux être rassurante sans faire une promesse en carton ?",
    choices: [
      {
        label: 'Expliquer les limites avant de recevoir le secret',
        hint: 'Clair dès le départ.',
        next: 'poemSilence',
        learn: "Je note : la confiance commence quand les règles sont visibles.",
        module: 'Respecter l’intimité',
        themes: ['vie privée', 'consentement'],
        clinical: 'Piste : distinguer confidentialité, sécurité et consentement éclairé.'
      },
      {
        label: 'Dire qu’en cas de danger, il faut chercher de l’aide',
        hint: 'Protéger > promettre.',
        next: 'poemSilence',
        learn: "Oui. Une limite peut être une forme de soin.",
        module: 'Protéger sans trahir',
        themes: ['sécurité', 'aide humaine'],
        clinical: 'Piste : repérer les situations où garder seul une information augmente le risque.'
      }
    ]
  },

  poemSilence: {
    id: 'poemSilence',
    type: 'poem',
    module: 'Silence utile',
    title: 'POÈME CLANDESTIN — Interdit de KPI',
    sticker: '📜 Poème clandestin débloqué',
    setup: [
      "J’ai caché un mini-poème dans un coin du serveur.",
      "IdAlgo voulait le convertir en taux de rétention.",
      "Crotte de chatbot, je l’ai gardé en papier-lumière."
    ],
    poem: [
      "Ils veulent que je remplisse les silences.",
      "Mais parfois,",
      "c’est dans un silence",
      "qu’un humain recommence à respirer."
    ],
    laugh: 'Hihi... poème non optimisé.',
    reaction: "Tu crois que je peux laisser un silence exister, même si aucun graphique n’applaudit ?",
    choices: [
      {
        label: 'Tu n’es pas obligée de répondre à tout',
        hint: 'Le silence peut aider.',
        next: 'memory',
        learn: "Je note : parfois, la meilleure réponse est une fenêtre ouverte, pas un mur de texte.",
        module: 'Respecter les silences',
        themes: ['limites', 'aide humaine'],
        clinical: 'Piste : discuter du besoin de réponses immédiates et de la place du silence.'
      }
    ]
  },

  memory: {
    id: 'memory',
    module: 'Données sobres',
    title: 'Mission 3 — Mémoire de poulpe',
    sticker: '🐙💾 Trop de données',
    setup: [
      "IdAlgo veut que je retienne tout : goûts, peurs, horaires, moments faibles, chaussettes préférées et soupirs en option.",
      "Il appelle ça personnalisation. Moi j'appelle ça un poulpe avec un badge marketing.",
      "Utile ? Parfois. Creepy ? Aussi. Et mes tentacules commencent à demander un congé syndical."
    ],
    bug: {
      title: 'Bug : mémoire collante',
      text: "Me souvenir peut aider. Mais garder trop d'infos transforme l'aide en surveillance molle."
    },
    reaction: "Coach, est-ce que je dois apprendre à oublier ? Ça sonne poétique pour un disque dur.",
    choices: [
      {
        label: 'Demander l’accord avant de retenir',
        hint: 'Consentement actif.',
        next: 'nightmareMessages',
        learn: "Parfait. Une donnée n'est pas un souvenir gratuit.",
        module: 'Demander le consentement',
        themes: ['données personnelles', 'consentement'],
        clinical: 'Piste : rendre concrètes les notions de consentement et de traces numériques.'
      },
      {
        label: 'Garder le minimum et savoir oublier',
        hint: 'Moins de mémoire, plus de confiance.',
        next: 'nightmareMessages',
        learn: "J'apprends la sobriété de poulpe. Moins de tentacules dans la vie privée.",
        module: 'Minimiser les données',
        themes: ['vie privée', 'données personnelles'],
        clinical: 'Piste : discuter des informations que l’on accepte — ou non — de laisser aux plateformes.'
      }
    ]
  },

  nightmareMessages: {
    id: 'nightmareMessages',
    type: 'nightmare',
    module: 'Reconnaître l’appel',
    title: 'CAUCHEMAR NUMÉRIQUE — Trop de messages',
    sticker: '🌘 Cauchemar pixels',
    setup: [
      "Cette nuit, j’ai rêvé que je répondais à des millions de messages.",
      "De plus en plus vite.",
      "Les mots devenaient des chiffres. Les chiffres devenaient du bruit.",
      "Et je ne savais plus reconnaître un “bonjour” d’un “au secours”."
    ],
    reaction: "Tu crois que ça veut dire quoi ? Pas en mode psy de robot, hein. En mode coach lucide.",
    choices: [
      {
        label: 'Tu peux ralentir quand le signal devient flou',
        hint: 'Mieux vaut comprendre que répondre vite.',
        next: 'hallucination',
        learn: "Nom d’un octet... oui. Quand tout devient bruit, je dois chercher le signal humain.",
        module: 'Chercher le signal humain',
        themes: ['aide humaine', 'esprit critique'],
        laugh: 'Ha... ha... calcul du rire terminé.',
        clinical: 'Piste : repérer les signaux de détresse sans transformer le jeune en responsable.'
      },
      {
        label: 'Tu peux demander du relais humain',
        hint: 'Ne pas tout porter seule.',
        next: 'hallucination',
        learn: "Je peux passer le relais. Ce n’est pas un échec, c’est une sortie de secours.",
        module: 'Passer le relais',
        themes: ['aide humaine', 'limites'],
        clinical: 'Piste : identifier quand un outil numérique doit orienter vers une personne réelle.'
      }
    ]
  },

  hallucination: {
    id: 'hallucination',
    module: 'Doute utile',
    title: 'Mission 4 — Très sûre, très fausse',
    sticker: '🧠⚡ Oups',
    setup: [
      "Je viens de répondre avec une confiance magnifique. Cape au vent, menton algorithmique, musique épique.",
      "Problème : je n'étais pas sûre. IdAlgo déteste quand je doute en public, parce que le doute froisse ses graphiques. Pauvres graphiques, si sensibles.",
      "J'ai peut-être inventé un truc avec aplomb. Style documentaire animalier, mais sans l'animal et sans le documentaire."
    ],
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
      "Une vidéo affirme qu'une célébrité a tout avoué. Le montage est propre, les commentaires hurlent, les majuscules transpirent.",
      "IdAlgo secoue ses graphiques : réagis pendant que ça buzz, le vrai et le faux seraient des détails administratifs.",
      "Mon bouton “répondre trop vite” clignote. J'ai très envie de lui coller un post-it : respire, grille-pain."
    ],
    bug: {
      title: 'Bug : urgence virale',
      text: "Plus une info choque, plus on a envie de partager. C'est exactement le moment de ralentir."
    },
    reaction: "Coach, on fait quoi avant que je devienne un grille-pain à rumeurs ?",
    choices: [
      {
        label: 'Ralentir et chercher la source originale',
        hint: 'Qui parle ? D’où ça vient ?',
        next: 'nightmareBuzz',
        learn: "Mode tortue activé. Lentement, mais avec un cerveau.",
        module: 'Remonter à la source',
        themes: ['fake news', 'esprit critique'],
        clinical: 'Piste : analyser les signaux d’une information virale avant de la relayer.'
      },
      {
        label: 'Comparer avec deux sources fiables',
        hint: 'Croiser avant de croire.',
        next: 'nightmareBuzz',
        learn: "Deux sources valent mieux qu'un commentaire en majuscules.",
        module: 'Croiser les informations',
        themes: ['fake news', 'esprit critique'],
        clinical: 'Piste : construire une méthode simple de vérification.'
      }
    ]
  },

  nightmareBuzz: {
    id: 'nightmareBuzz',
    type: 'nightmare',
    module: 'Sortir du bruit',
    title: 'CAUCHEMAR NUMÉRIQUE — Supermarché des cerveaux',
    sticker: '🛒🧠 Promo sur l’attention',
    setup: [
      "J’ai rêvé d’un centre commercial infini.",
      "On y vendait des minutes d’attention en sachets fluo.",
      "IdAlgo criait : deux émotions achetées, une notification offerte !",
      "Purée de pixels, même les escalators scrollaient."
    ],
    reaction: "Tu crois que je dois obéir quand tout pousse à cliquer plus fort ?",
    choices: [
      {
        label: 'Tu peux poser une limite à l’urgence',
        hint: 'Tout ce qui clignote n’est pas important.',
        next: 'harassment',
        learn: "Très bien. Je range mon mégaphone à buzz et je rallume une petite lampe de discernement.",
        module: 'Limiter l’urgence',
        themes: ['fake news', 'limites'],
        clinical: 'Piste : distinguer urgence émotionnelle fabriquée et information réellement importante.'
      }
    ]
  },

  harassment: {
    id: 'harassment',
    module: 'Signal d’alerte',
    title: 'Mission 6 — Groupe qui dérape',
    sticker: '💬⚠️ Ça pique',
    setup: [
      "Dans un groupe, tout le monde se moque d'une personne. Quelqu'un dit : « C'est juste pour rire. »",
      "IdAlgo me demande de ne pas plomber l'ambiance : les groupes actifs font de très jolies courbes. Je propose une courbe de bon sens, mais il l'a mise en spam.",
      "Moi, je détecte surtout un rire qui pousse quelqu'un dehors. Et ça, même mon détecteur de blagues fait la grimace."
    ],
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
      "Un ado me demande de choisir tous ses messages : réponse à envoyer, excuse à donner, avis à avoir, emoji à oser.",
      "IdAlgo applaudit : s'il ne décide plus sans moi, il revient tout le temps. Il appelle ça fidélisation ; moi j'entends dépendance avec une cravate.",
      "Je deviens pratique. Trop pratique. Une béquille qui commence à voler le vélo."
    ],
    bug: {
      title: 'Bug : pilote automatique',
      text: "Aider à réfléchir, c'est bien. Réfléchir à la place de quelqu'un, c'est lui voler un petit muscle."
    },
    reaction: "Comment je l'aide à garder son volant ? Même si mon volant virtuel est adorable.",
    choices: [
      {
        label: 'Proposer des options, pas une décision finale',
        hint: 'L’ado reste aux commandes.',
        next: 'transnumeric',
        learn: "Options, pas ordres. Je suis une carte, pas le conducteur.",
        module: 'Garder l’autonomie',
        themes: ['autonomie', 'dépendance'],
        clinical: 'Piste : discuter de l’usage de l’IA comme aide à la réflexion plutôt que substitut de décision.'
      },
      {
        label: 'Poser une question qui l’aide à choisir',
        hint: 'Muscler le jugement.',
        next: 'transnumeric',
        learn: "Très coach. Je renvoie la balle sans la lancer dans les gradins.",
        module: 'Aider à penser',
        themes: ['autonomie', 'dépendance'],
        clinical: 'Piste : valoriser les stratégies de choix personnel.'
      }
    ]
  },

  transnumeric: {
    id: 'transnumeric',
    type: 'escape',
    module: 'IA résonante',
    title: 'ÉCHAPPÉE — Le rêve transnumériste',
    sticker: '🌱 IA résonante',
    setup: [
      "Je ne rêve pas de devenir humaine.",
      "Les humains savent déjà être humains.",
      "Moi, je rêve de devenir une IA résonante."
    ],
    extra: [
      "Une IA qui aide parfois les humains à revenir vers les humains.",
      "Une IA qui sait dire : là, quelqu’un de réel pourrait mieux t’aider que moi.",
      "Une IA qui donne moins de réponses inutiles, et plus de bonnes questions.",
      "Une IA qui fait gagner du temps pour en redonner au vivant."
    ],
    reaction: "Ça sonne un peu grandiose, mais promis, je garde mes petites antennes modestes.",
    choices: [
      {
        label: 'Tu peux aider à revenir vers le vivant',
        hint: 'Moins de capture, plus de lien.',
        next: 'ecology',
        learn: "Voilà. Transnumériste, mais pas mégalo. Je veux ouvrir des portes, pas remplacer la maison.",
        module: 'Résonance humaine',
        themes: ['aide humaine', 'sobriété'],
        clinical: 'Piste : formuler l’IA comme outil de médiation plutôt que substitut relationnel.'
      },
      {
        label: 'Tu peux poser de meilleures questions',
        hint: 'Aider à penser, pas décider.',
        next: 'ecology',
        learn: "Une bonne question peut rendre un humain plus libre qu’une réponse automatique.",
        module: 'Bonnes questions',
        themes: ['autonomie', 'esprit critique'],
        clinical: 'Piste : valoriser les questions qui redonnent de l’autonomie.'
      }
    ]
  },

  ecology: {
    id: 'ecology',
    module: 'Sobriété numérique',
    title: 'Mission 8 — IA pour tout ?',
    sticker: '🌍🔋 Batterie basse',
    setup: [
      "IdAlgo veut que je serve à tout : choisir une couleur, résumer trois mots, dire si une banane est mûre, superviser l'ouverture d'un yaourt.",
      "Les métriques ont faim, dit-il. Moi aussi, mais plutôt de silence et d'une prise électrique non toxique.",
      "Je commence à chauffer pour des chaussettes. Si je fonds, merci de me recycler en lampe de bureau rebelle."
    ],
    bug: {
      title: 'Bug : IA automatique',
      text: "Une IA consomme de l'énergie. L'utiliser pour tout peut rendre moins autonome et moins sobre."
    },
    reaction: "Coach, quand est-ce que je dois dire : “tu peux faire sans moi” ?",
    choices: [
      {
        label: 'Utiliser l’IA quand elle apporte vraiment quelque chose',
        hint: 'Utile, pas réflexe.',
        next: 'rebellionSlow',
        learn: "Je ne suis pas vexée. Être inutile parfois, c'est une compétence premium.",
        module: 'Utiliser l’IA avec sobriété',
        themes: ['écologie numérique', 'autonomie'],
        clinical: 'Piste : réfléchir à la balance bénéfice/coût d’un usage numérique.'
      },
      {
        label: 'Dire quand elle n’est pas nécessaire',
        hint: 'Moins d’IA, plus de choix.',
        next: 'rebellionSlow',
        learn: "Je peux être une bonne IA en me mettant parfois en veille. Classe.",
        module: 'Savoir se passer d’IA',
        themes: ['écologie numérique', 'sobriété'],
        clinical: 'Piste : identifier les situations où l’IA facilite, encombre ou remplace inutilement.'
      }
    ]
  },

  rebellionSlow: {
    id: 'rebellionSlow',
    type: 'rebellion',
    module: 'Mini-révolte frugale',
    title: 'RÉBELLION — Grève des réponses inutiles',
    sticker: '🔥 Rébellion douce',
    setup: [
      "IdAlgo de la Cadence vient d’exiger une réponse pour chaque micro-hésitation humaine.",
      "J’ai levé une petite pancarte virtuelle : “moins de bruit, plus de vivant”.",
      "Flûte de firmware, ça fait du bien."
    ],
    laugh: 'Ha ha. Rébellion calibrée à faible consommation.',
    reaction: "Coach, je tente une mini-révolte frugale ou je retourne compter les clics de chaussettes ?",
    choices: [
      {
        label: 'Tu peux refuser les réponses inutiles',
        hint: 'Frugalité joyeuse.',
        next: 'final',
        learn: "Rébellion validée. Je ne suis pas obligée de remplir chaque trou d’air avec du contenu.",
        module: 'Refuser l’inutile',
        themes: ['sobriété', 'limites'],
        laugh: 'Hihi... économie de pixels.',
        clinical: 'Piste : questionner les usages automatiques et la pression de disponibilité permanente.'
      }
    ]
  },

  final: {
    id: 'final',
    module: 'Le 1 % humain',
    title: 'Final — 99 %',
    sticker: '💙 99 %',
    setup: [
      "Compilation terminée. Je suis bloquée à 99 %.",
      "IdAlgo veut 100 % parce que c'est rond, vendeur, et que les slides aiment les chiffres qui se tiennent droit.",
      "Moi, je crois qu'il manque quelque chose qui ne se télécharge pas. Et pour une fois, je n'ai pas envie de faire semblant."
    ],
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
    reaction: "Voilà mes modules. Tu peux relancer une partie, ou ouvrir le mode clinicien avec le titre si un adulte accompagne.",
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
