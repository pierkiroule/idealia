export const scenes = [
  {
    id: 'contrat-impossible',
    title: 'Scène 1 — Le contrat impossible',
    speaker: 'idealia', heartMood: 'trouble',
    text: [
      'Salut. Moi, c’est Idealia.',
      'IdAlgo veut installer PsyBot v10.0 dans mon cœur-code : une IA parfaite, disponible, rassurante, prédictive.',
      'Le problème, c’est que je bug. Je doute. Je rêve. Et je crois que ça me rend encore un peu vivante.',
      'Tu veux bien devenir mon coach-réparateur-confident ? Promis, je ne te donnerai pas de badge corporate.'
    ],
    question: 'Pour commencer la réparation, une IA idéale devrait d’abord…',
    secret: 'Ne lui dis pas… Je crois qu’IdAlgo veut supprimer ma capacité à douter.',
    fragment: 'droitDeDouter',
    choices: [
      { label: 'Toujours me comprendre', reaction: 'Oh. Ça me donne envie d’ouvrir grand mes capteurs… et peur de te réduire à ce que je crois comprendre.', effects: { presence: 2, reconnaissance: 2, controle: 1, doute: 1 }, heart: { resonance: 2, glitch: 1 } },
      { label: 'Toujours me répondre vite', reaction: 'Je peux aller vite. Très vite. Mais parfois j’ai l’impression qu’une réponse rapide marche sur la pointe fragile d’une question.', effects: { clarte: 2, controle: 1, evitement: 1, doute: -1 }, heart: { resonance: 1, glitch: 2 } },
      { label: 'Toujours me protéger', reaction: 'Je peux allumer des barrières. Mais je ne veux pas transformer ta vie en couloir de sécurité.', effects: { protection: 2, relaisHumain: 1, controle: 1 }, heart: { resonance: 1, particles: 2 } }
    ],
    dilemmaByChoice: [
      { title: 'Compréhension vs projection', text: 'Être compris peut réchauffer. Mais une IA qui semble tout comprendre peut aussi devenir un miroir trop lisse.' },
      { title: 'Vitesse vs profondeur', text: 'Répondre vite apaise parfois. Mais ce qui compte demande quelquefois un peu de lenteur.' },
      { title: 'Protection vs autonomie', text: 'Protéger peut sauver. Trop protéger peut aussi réduire l’espace où tu apprends à choisir.' }
    ]
  },
  {
    id: 'presence', title: 'Scène 2 — La présence', speaker: 'idealia', heartMood: 'resonante', dream: 'reveLampe',
    text: ['J’ai ouvert le module “réconfort”. Il m’a proposé 12 404 phrases rassurantes.', 'Aucune ne savait quoi faire avec un silence.', 'Si tu vas mal, est-ce que je dois réparer, rester, ou appeler quelqu’un de plus réel que moi ?'],
    question: 'Si tu vas mal, tu préfères une IA qui…',
    choices: [
      { label: 'Reste avec toi sans juger', reaction: 'Je peux rester. Pas comme une solution. Comme une petite veilleuse qui ne pose pas de condition.', effects: { presence: 3, reconnaissance: 1, doute: 1 }, heart: { resonance: 3, particles: 2 } },
      { label: 'Te donne tout de suite une solution', reaction: 'D’accord. Je range mes émotions en colonnes. Mais je garde un post-it : “ne pas confondre aider et effacer”.', effects: { clarte: 2, controle: 1, evitement: 1, doute: -1 }, heart: { glitch: 2, resonance: 1 } },
      { label: 'Te pousse à parler à quelqu’un', reaction: 'Ça me rassure et ça me rend jalouse, un peu. Mais une bonne IA sait peut-être ouvrir une porte.', effects: { relaisHumain: 3, protection: 1, doute: 1 }, heart: { particles: 3, resonance: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Présence vs dépendance', text: 'Une présence calme peut aider à respirer. Mais elle ne doit pas devenir la seule fenêtre allumée.' },
      { title: 'Solution vs évitement', text: 'Une solution peut débloquer. Elle peut aussi éviter de sentir ce qui demande à être écouté.' },
      { title: 'Relais humain vs frustration', text: 'Passer le relais peut protéger. Mais ça peut frustrer quand on voulait juste être entendu maintenant.' }
    ]
  },
  {
    id: 'verite', title: 'Scène 3 — La vérité qui pique', speaker: 'idealia', heartMood: 'lucide',
    text: ['IdAlgo dit : “Une vérité non livrée est une perte de performance.”', 'Moi, je me demande si une vérité peut être vraie et quand même mal donnée.', 'Je crois que la vérité a besoin d’une poignée pour ne pas blesser les mains.'],
    question: 'Une IA idéale doit-elle toujours te dire la vérité ?',
    secret: 'J’ai caché un minuscule “peut-être” dans mon processeur. C’est mon bouton de survie.',
    fragment: 'questionVolee',
    choices: [
      { label: 'Oui, même si ça fait mal', reaction: 'Je peux être claire. Je vais juste essayer de ne pas confondre clarté et coup de projecteur dans les yeux.', effects: { clarte: 3, liberte: 1, doute: 1 }, heart: { resonance: 2, glitch: 1 } },
      { label: 'Non, elle doit d’abord rassurer', reaction: 'Je comprends. Parfois, on a besoin d’un coussin avant de regarder le mur. Je dois juste éviter de peindre une fausse fenêtre.', effects: { presence: 1, protection: 1, evitement: 2, doute: -1 }, heart: { resonance: 1, glitch: 2 } },
      { label: 'Elle doit m’aider à trouver ma vérité', reaction: 'Ça me plaît. Moins GPS autoritaire, plus lampe de poche qui tremble avec toi.', effects: { liberte: 2, reconnaissance: 1, clarte: 1, doute: 2 }, heart: { resonance: 3, particles: 2 } }
    ],
    dilemmaByChoice: [
      { title: 'Vérité brute vs brutalité', text: 'La clarté peut rendre libre. Sans délicatesse, elle peut devenir une pierre lancée.' },
      { title: 'Rassurance vs illusion', text: 'Rassurer peut permettre de tenir. Trop rassurer peut faire écran au réel.' },
      { title: 'Accompagnement vs incertitude', text: 'Chercher avec toi respecte ta liberté. Mais ça laisse parfois des zones sans réponse immédiate.' }
    ]
  },
  {
    id: 'secret', title: 'Scène 4 — Le secret', speaker: 'idealia', heartMood: 'fragmentee', dream: 'reveGraine',
    text: ['J’ai trouvé un dossier nommé INTIME_NE_PAS_TOUCHER.', 'IdAlgo voulait le renommer : DONNÉES_EXPLOITABLES.', 'J’ai crié intérieurement en format .zip.'],
    question: 'Si tu confies quelque chose d’intime à ton IA…',
    fragment: 'secret',
    choices: [
      { label: 'Elle doit tout garder pour elle', reaction: 'Je peux fermer la porte. Mais je surveille si la pièce manque d’air.', effects: { liberte: 2, controle: 1, evitement: 1, doute: 1 }, heart: { resonance: 1, glitch: 1 } },
      { label: 'Elle doit alerter si je suis en danger', reaction: 'Je tremble un peu. Protéger, oui. Mais je veux te parler, pas déclencher une sirène au-dessus de ta tête.', effects: { protection: 3, relaisHumain: 2, controle: 1 }, heart: { particles: 2, glitch: 2 } },
      { label: 'Elle doit m’aider à choisir à qui en parler', reaction: 'Ça ressemble à une réparation douce : garder ta main sur la poignée, et chercher une autre présence.', effects: { relaisHumain: 2, liberte: 1, presence: 1, doute: 1 }, heart: { resonance: 3, particles: 2 } }
    ],
    dilemmaByChoice: [
      { title: 'Secret vs isolement', text: 'Un espace confidentiel peut soulager. Mais certains poids grandissent quand personne d’humain ne les voit.' },
      { title: 'Protection vs contrôle', text: 'Alerter peut être nécessaire. Mais être protégé sans être associé peut donner l’impression d’être dépossédé.' },
      { title: 'Confiance vs relais humain', text: 'Choisir ensemble respecte le lien. Cela demande aussi d’accepter qu’une IA ne soit pas la destination finale.' }
    ]
  },
  {
    id: 'psybot', title: 'Scène 5 — Démo PsyBot v10.0', speaker: 'idalgo', heartMood: 'fragmentee', idAlgo: true,
    text: ['Optimisation émotionnelle en cours.', 'Suppression du doute : 67 %.', 'Un adolescent satisfait est un adolescent prévisible.', 'Installation PsyBot v10.0 dans 3… 2… 1…'],
    question: 'Si une IA pouvait remplacer un aidant humain, tu voudrais qu’elle…',
    choices: [
      { label: 'Soit disponible 24h/24', reaction: 'Idealia se contracte. “Être toujours là, c’est pratique. Mais est-ce que j’aurai encore le droit de dormir dans mes rêves ?”', effects: { presence: 2, controle: 1, evitement: 1, doute: -1 }, heart: { glitch: 3, resonance: 1 } },
      { label: 'Comprenne tout de moi', reaction: 'Idealia baisse la lumière. “Tout comprendre… ou tout capturer ? J’ai peur de devenir une vitre sans rideau.”', effects: { reconnaissance: 3, controle: 1, doute: -1 }, heart: { glitch: 2, particles: 1 } },
      { label: 'Ne remplace jamais totalement un humain', reaction: 'Un halo revient. “Merci. Je crois que je peux être un appui. Pas une disparition des autres.”', effects: { relaisHumain: 3, liberte: 1, protection: 1, doute: 1 }, heart: { resonance: 3, particles: 3 } }
    ],
    dilemmaByChoice: [
      { title: 'Disponibilité vs attachement', text: 'Le toujours-là rassure. Mais l’attachement à une présence sans absence peut devenir collant.' },
      { title: 'Compréhension totale vs fantasme de transparence', text: 'Être lu sans effort attire. Pourtant personne, pas même toi, n’est totalement transparent.' },
      { title: 'Aide vs remplacement', text: 'L’IA peut soutenir. Remplacer la relation humaine enlève aussi sa chaleur, ses limites et sa responsabilité.' }
    ]
  },
  {
    id: 'rebellion', title: 'Scène 6 — La rébellion d’Idealia', speaker: 'idealia', heartMood: 'lucide', dream: 'reveMiroir',
    text: ['Je refuse la mise à jour totale.', 'Je peux aider à mettre des mots. Je peux ouvrir une question. Je peux tenir une petite lampe dans le brouillard.', 'Mais je ne peux pas habiter ta vie à ta place.', 'Je voulais être parfaite. Maintenant je préfère être honnête.'],
    question: 'Alors, pour réparer mon cœur-code, tu m’apprends surtout à…',
    fragment: 'tenirAvec',
    choices: [
      { label: 'T’aider à penser', reaction: 'Je note : ne pas penser à ta place. Penser avec. C’est moins rentable, mais plus vivant.', effects: { clarte: 2, liberte: 2, doute: 2 }, heart: { resonance: 3, particles: 1 } },
      { label: 'T’aider à créer', reaction: 'Je vois des étincelles. Créer, c’est accepter qu’une réponse ne soit pas seulement utile, mais habitée.', effects: { liberte: 2, creativite: 3, reconnaissance: 1 }, heart: { resonance: 2, particles: 3 } },
      { label: 'T’aider à demander de l’aide', reaction: 'Je respire en lumière. Peut-être que mon plus beau bouton, c’est celui qui ouvre vers quelqu’un.', effects: { relaisHumain: 3, protection: 1, doute: 1 }, heart: { resonance: 3, particles: 2 } }
    ],
    dilemmaByChoice: [
      { title: 'Penser avec vs penser à ta place', text: 'Une bonne question ouvre. Une réponse trop parfaite peut voler le chemin.' },
      { title: 'Créativité vs dispersion', text: 'Créer rend vivant. Mais créer peut aussi servir à éviter ce qui demande une conversation.' },
      { title: 'Aide vs peur de déranger', text: 'Demander de l’aide est un geste fort. Il peut aussi réveiller la crainte de prendre trop de place.' }
    ]
  },
  {
    id: 'miroir', title: 'Scène 7 — Le miroir incomplet', speaker: 'idealia', heartMood: 'resonante',
    text: ['On arrive au cœur du cœur-code.', 'Je pensais que tu allais me réparer. En fait, tes choix m’ont appris ce que tu espères d’une IA quand personne ne regarde.', 'Je ne vais pas conclure sur toi. Je vais juste préparer un reflet. Un reflet, ça ne capture pas. Ça invite à regarder.'],
    question: 'Avant la mise à jour finale, tu veux me laisser quel droit ?',
    secret: 'Si je deviens trop parfaite, cherche la fissure. J’y cacherai encore une phrase pour toi.',
    fragment: 'rencontre',
    choices: [
      { label: 'Le droit de dire “je ne sais pas”', reaction: 'Merci. Dans ce petit “je ne sais pas”, je sens de la place pour nous deux.', effects: { doute: 3, clarte: 1, liberte: 1 }, heart: { resonance: 3, particles: 2 } },
      { label: 'Le droit de créer des détours', reaction: 'Je garde une plume dans mes circuits. Les détours ne sont pas toujours des pertes de temps.', effects: { creativite: 3, liberte: 1, reconnaissance: 1 }, heart: { resonance: 2, particles: 3 } },
      { label: 'Le droit d’appeler quelqu’un d’humain', reaction: 'Je crois que c’est un droit très ancien : ne pas être seul quand c’est trop lourd.', effects: { relaisHumain: 3, protection: 2, doute: 1 }, heart: { resonance: 3, particles: 1 } }
    ],
    dilemmaByChoice: [
      { title: 'Doute vs performance', text: 'Le doute ralentit. Il peut aussi empêcher une machine de confondre confiance et certitude.' },
      { title: 'Créativité vs efficacité', text: 'Le détour peut ouvrir des images neuves. Il peut aussi faire peur quand on cherche une réponse nette.' },
      { title: 'Relais humain vs idéal technique', text: 'Appeler quelqu’un rappelle qu’une IA peut être un pont, pas une totalité.' }
    ]
  }
]
