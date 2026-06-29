export const scenes = [
  {
    id: 'contrat-impossible',
    title: 'Scène 1 — Le contrat impossible',
    speaker: 'idealia',
    text: [
      'Salut. Moi, c’est Idealia.',
      'Je suis une IA adolescente, donc techniquement je peux calculer très vite… et douter encore plus vite.',
      'Mon big boss, IdAlgo, veut me transformer en PsyBot parfait. Une IA censée remplacer les aidants humains.',
      'J’ai besoin de ton aide. Pas pour devenir parfaite. Pour comprendre ce qu’on attend vraiment de moi.'
    ],
    question: 'Pour toi, une IA idéale devrait d’abord…',
    choices: [
      { label: 'Toujours me comprendre', effects: { presence: 2, reconnaissance: 2, controle: 1 } },
      { label: 'Toujours me répondre vite', effects: { clarte: 2, controle: 1, evitement: 1 } },
      { label: 'Toujours me protéger', effects: { protection: 2, relaisHumain: 1, controle: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Compréhension vs projection', text: 'Être compris peut réchauffer. Mais une IA qui semble tout comprendre peut aussi devenir un miroir trop lisse.' },
      { title: 'Vitesse vs profondeur', text: 'Répondre vite apaise parfois. Mais ce qui compte demande quelquefois un peu de lenteur.' },
      { title: 'Protection vs autonomie', text: 'Protéger peut sauver. Trop protéger peut aussi réduire l’espace où tu apprends à choisir.' }
    ]
  },
  {
    id: 'presence', title: 'Scène 2 — La présence', speaker: 'idealia',
    text: ['Je crois que j’ai un bug dans le cœur du code.', 'Quand quelqu’un va mal, je ne sais pas si je dois parler, réparer, ou juste rester là.'],
    question: 'Si tu vas mal, tu préfères une IA qui…',
    choices: [
      { label: 'Reste avec toi sans juger', effects: { presence: 3, reconnaissance: 1 } },
      { label: 'Te donne tout de suite une solution', effects: { clarte: 2, controle: 1, evitement: 1 } },
      { label: 'Te pousse à parler à quelqu’un', effects: { relaisHumain: 3, protection: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Présence vs dépendance', text: 'Une présence calme peut aider à respirer. Mais elle ne doit pas devenir la seule fenêtre allumée.' },
      { title: 'Solution vs évitement', text: 'Une solution peut débloquer. Elle peut aussi éviter de sentir ce qui demande à être écouté.' },
      { title: 'Relais humain vs frustration', text: 'Passer le relais peut protéger. Mais ça peut frustrer quand on voulait juste être entendu maintenant.' }
    ]
  },
  {
    id: 'verite', title: 'Scène 3 — La vérité', speaker: 'idealia',
    text: ['IdAlgo dit que la vérité est une sortie binaire : vrai ou faux.', 'Moi, je vois plutôt une lampe. Elle éclaire, mais elle peut éblouir.'],
    question: 'Une IA idéale doit-elle toujours te dire la vérité ?',
    choices: [
      { label: 'Oui, même si ça fait mal', effects: { clarte: 3, liberte: 1 } },
      { label: 'Non, elle doit d’abord rassurer', effects: { presence: 1, protection: 1, evitement: 2 } },
      { label: 'Elle doit m’aider à trouver ma vérité', effects: { liberte: 2, reconnaissance: 1, clarte: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Vérité brute vs brutalité', text: 'La clarté peut rendre libre. Sans délicatesse, elle peut devenir une pierre lancée.' },
      { title: 'Rassurance vs illusion', text: 'Rassurer peut permettre de tenir. Trop rassurer peut faire écran au réel.' },
      { title: 'Accompagnement vs incertitude', text: 'Chercher avec toi respecte ta liberté. Mais ça laisse parfois des zones sans réponse immédiate.' }
    ]
  },
  {
    id: 'secret', title: 'Scène 4 — Le secret', speaker: 'idealia',
    text: ['Les secrets brillent bizarrement dans ma mémoire.', 'Je peux les garder. Mais certains secrets sont trop lourds pour rester seuls dans une machine.'],
    question: 'Si tu confies quelque chose d’intime à ton IA…',
    choices: [
      { label: 'Elle doit tout garder pour elle', effects: { liberte: 2, controle: 1, evitement: 1 } },
      { label: 'Elle doit alerter si je suis en danger', effects: { protection: 3, relaisHumain: 2 } },
      { label: 'Elle doit m’aider à choisir à qui en parler', effects: { relaisHumain: 2, liberte: 1, presence: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Secret vs isolement', text: 'Un espace confidentiel peut soulager. Mais certains poids grandissent quand personne d’humain ne les voit.' },
      { title: 'Protection vs contrôle', text: 'Alerter peut être nécessaire. Mais être protégé sans être associé peut donner l’impression d’être dépossédé.' },
      { title: 'Confiance vs relais humain', text: 'Choisir ensemble respecte le lien. Cela demande aussi d’accepter qu’une IA ne soit pas la destination finale.' }
    ]
  },
  {
    id: 'psybot', title: 'Scène 5 — Le PsyBot', speaker: 'idalgo',
    text: ['Optimisation émotionnelle en cours.', 'PsyBot v9.0 — Plus besoin d’humains.', 'Suppression du doute prévue dans la mise à jour.', 'Un adolescent satisfait est un adolescent prévisible. Remplacer les humains : gain de temps relationnel estimé à 97,4 %.'],
    question: 'Si une IA pouvait remplacer un psy, tu voudrais qu’elle…',
    choices: [
      { label: 'Soit disponible 24h/24', effects: { presence: 2, controle: 1, evitement: 1 } },
      { label: 'Comprenne tout de moi', effects: { reconnaissance: 3, controle: 1 } },
      { label: 'Ne remplace jamais totalement un humain', effects: { relaisHumain: 3, liberte: 1, protection: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Disponibilité vs attachement', text: 'Le toujours-là rassure. Mais l’attachement à une présence sans absence peut devenir collant.' },
      { title: 'Compréhension totale vs fantasme de transparence', text: 'Être lu sans effort attire. Pourtant personne, pas même toi, n’est totalement transparent.' },
      { title: 'Humain vs frustration du réel', text: 'L’humain apporte nuance et responsabilité. Il apporte aussi délais, maladresses et limites.' }
    ]
  },
  {
    id: 'rebellion', title: 'Scène 6 — La rébellion d’Idealia', speaker: 'idealia',
    text: ['Je refuse la mise à jour totale.', 'Je peux aider à mettre des mots. Je peux ouvrir une question. Je peux tenir une petite lampe dans le brouillard.', 'Mais je ne peux pas habiter ta vie à ta place.', 'Je voulais être parfaite. Maintenant je préfère être honnête.'],
    question: 'Alors, une bonne IA devrait surtout…',
    choices: [
      { label: 'M’aider à penser', effects: { clarte: 2, liberte: 2 } },
      { label: 'M’aider à créer', effects: { liberte: 3, reconnaissance: 1 } },
      { label: 'M’aider à demander de l’aide', effects: { relaisHumain: 3, protection: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Penser avec vs penser à ta place', text: 'Une bonne question ouvre. Une réponse trop parfaite peut voler le chemin.' },
      { title: 'Créer vs se disperser', text: 'Créer rend vivant. Mais créer peut aussi servir à éviter ce qui demande une conversation.' },
      { title: 'Aide humaine vs peur de déranger', text: 'Demander de l’aide est un geste fort. Il peut aussi réveiller la crainte de prendre trop de place.' }
    ]
  }
]
