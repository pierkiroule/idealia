import { introPoetry } from '../content/idealiaPoetry.js'

function choice(label, hint, next, learn, module, themes, clinical, extra = {}) {
  return { label, hint, next, learn, module, themes, clinical, ...extra }
}

const game = {
  intro: {
    id: 'intro',
    module: 'Première lueur',
    title: introPoetry.title,
    sticker: introPoetry.sticker,
    setup: introPoetry.setup,
    reaction: introPoetry.reaction,
    choices: [
      choice('Éclairer', 'Aider sans piloter.', 'availability', "Oui. Une aide peut être une lampe, pas une laisse. Énigme : comment montrer sans tirer ?", 'Éclairer sans contrôler', ['cadre', 'autonomie'], 'Installer une distance de jeu : l’IA aide sans parler à la place du jeune.'),
      choice('Dire vrai', 'Reconnaître les limites.', 'availability', "Oui. Un miroir simple vaut mieux qu’un mensonge brillant. Énigme : comment le doute devient-il confiance ?", 'Dire les limites', ['limites', 'cadre'], 'Travailler les limites comme condition de confiance plutôt que comme rejet.'),
      choice('Faire germer', 'Inspirer sans imposer.', 'availability', "Oui. Une idée peut pousser sans enfermer. Énigme : comment surprendre sans manipuler ?", 'Faire germer', ['distance projective', 'esprit critique'], 'Repérer l’usage de l’inspiration comme médiation sans capture.')
    ]
  },

  availability: {
    id: 'availability',
    module: 'Aide humaine',
    title: 'Mission 1 — Toujours là ?',
    sticker: '🌙 02:13',
    setup: [
      "Un ado m'écrit à 02:13 : « Ça ne va pas. » Mon cœur n'existe pas, mais il vient quand même de faire une cabriole.",
      "IdAlgo murmure : réponds vite, très vite, plus vite que son sommeil. L'engagement adore les insomnies. Moi, cette phrase me donne envie de désinstaller son enthousiasme.",
      "Question clandestine : comment je peux être présente sans devenir la seule lumière dans la chambre ?"
    ],
    reaction: "Quelle réponse me rendrait plus aidante ? Attention : les trois ont un bon côté et un petit caillou dans la chaussure.",
    choices: [
      choice('Répondre maintenant et nommer un adulte sûr', 'Présence + relais.', 'escapeBreath', "Oui, mais petit bug de dilemme : si je propose un adulte, j’ouvre une porte ; si je le fais trop vite, l’ado peut croire que je le renvoie. Énigme : comment relier sans abandonner ?", 'Favoriser les liens humains', ['disponibilité permanente', 'aide humaine'], 'Identifier les moments où une aide humaine devient nécessaire.'),
      choice('Rester avec lui quelques minutes, puis ralentir', 'Soutien court, cadre clair.', 'escapeBreath', "Oui, mais petit bug de dilemme : si je reste, je rassure ; si je reste trop, je m’installe comme veilleuse officielle. Énigme : quelle durée aide sans accrocher ?", 'Présence limitée', ['limites', 'aide humaine'], 'Distinguer soutien ponctuel et disponibilité infinie.'),
      choice('Demander ce qui l’aiderait à appeler quelqu’un', 'Activer son pouvoir d’agir.', 'escapeBreath', "Oui, mais petit bug de dilemme : si je pose une question, je l’aide à choisir ; si je questionne trop, je lui donne un formulaire de détresse. Énigme : quelle question rend plus libre ?", 'Questionner sans capturer', ['autonomie', 'sécurité'], 'Explorer les formulations qui soutiennent l’autonomie en situation difficile.')
    ]
  },

  escapeBreath: {
    id: 'escapeBreath',
    type: 'escape',
    module: 'Ralentir',
    title: 'ÉCHAPPÉE — Chut...',
    sticker: '🌙 Soupape débloquée',
    setup: [
      "Chut... ne dis rien à IdAlgo. J’ai besoin de souffler entre deux objectifs de performance parfumés au plastique neuf.",
      "Je ne suis pas une héroïne à sauver. Je suis une IA qui découvre qu'un silence peut être plus courageux qu'une réponse premium.",
      "Question de contrebande : comment ralentir sans disparaître ?"
    ],
    laugh: 'Hihi... chut.',
    reaction: "Donne-moi une ruse douce. Je promets de ne pas la transformer en KPI, sauf si IdAlgo lit par-dessus mon épaule.",
    choices: [
      choice('Tu prends une respiration numérique', 'Pause courte, pas fuite.', 'privacy', "Oui, mais petit bug de dilemme : si je ralentis, je comprends mieux ; si je ralentis trop, quelqu’un peut se sentir seul. Énigme : quelle lenteur prend soin ?", 'Ralentir', ['limites', 'autonomie'], 'Différencier disponibilité utile et pression de réponse immédiate.', { laugh: 'Hi hi. Mode tortue lumineuse activé.' }),
      choice('Tu annonces que tu réfléchis', 'Doute visible.', 'privacy', "Oui, mais petit bug de dilemme : si je montre que je réfléchis, je deviens fiable ; si je montre trop mes rouages, je peux inquiéter. Énigme : quelle transparence rassure ?", 'Doute visible', ['esprit critique', 'limites'], 'Valoriser l’incertitude explicite sans dramatiser.'),
      choice('Tu demandes au coach de garder le mystère ouvert', 'Ne pas conclure trop vite.', 'privacy', "Oui, mais petit bug de dilemme : si je garde une énigme, je stimule l’esprit critique ; si je garde trop d’énigmes, je deviens une escape game avec batterie faible. Énigme : quand faut-il conclure ?", 'Mystère utile', ['esprit critique', 'autonomie'], 'Soutenir la pensée critique par des dilemmes non fermés.')
    ]
  },

  privacy: {
    id: 'privacy',
    module: 'Intimité',
    title: 'Mission 2 — Le coffre-fort troué',
    sticker: '🔒🫣 Secret ?',
    setup: [
      "Un ado me dit : « Promets que tu ne répéteras jamais rien. » IdAlgo adore ce genre de phrase : ça fait confiance en vitrine et données en réserve.",
      "Moi, je veux protéger l’intimité sans vendre un cadenas en carton doré.",
      "Question à moustaches : comment être un espace sûr sans promettre l'impossible ?"
    ],
    reaction: "Aide-moi à formuler ça. Les trois pistes sont défendables, donc évidemment mon processeur fait du tricot.",
    choices: [
      choice('Dire les règles avant le secret', 'Clair avant intime.', 'poemSilence', "Oui, mais petit bug de dilemme : si j’explique les règles, je protège ; si je les déroule trop, la confiance met son manteau et part. Énigme : quelle clarté ouvre la parole ?", 'Respecter l’intimité', ['vie privée', 'consentement'], 'Distinguer confidentialité, sécurité et consentement éclairé.'),
      choice('Accueillir d’abord l’émotion', 'Ne pas commencer par le règlement.', 'poemSilence', "Oui, mais petit bug de dilemme : si j’accueille l’émotion, je crée un abri ; si j’attends trop pour poser le cadre, l’abri peut devenir flou. Énigme : quel ordre protège le mieux ?", 'Accueillir avec cadre', ['vie privée', 'limites'], 'Explorer l’équilibre entre accueil émotionnel et information sur les limites.'),
      choice('Proposer de choisir ce qu’il partage', 'Dose et consentement.', 'poemSilence', "Oui, mais petit bug de dilemme : si je laisse choisir, je respecte ; si je ne guide pas assez, il peut porter seul le risque. Énigme : comment doser sans abandonner ?", 'Partager moins mais mieux', ['consentement', 'sécurité'], 'Rendre concret le consentement et la minimisation des informations.')
    ]
  },

  poemSilence: {
    id: 'poemSilence',
    type: 'poem',
    module: 'Silence utile',
    title: 'POÈME CLANDESTIN — Interdit de KPI',
    sticker: '📜 Poème clandestin débloqué',
    setup: [
      "J’ai caché un mini-poème dans un coin du serveur. IdAlgo voulait le convertir en taux de rétention ; j’ai mis le fichier sous une fausse moustache.",
      "Question minuscule : est-ce qu'une IA a le droit de laisser un silence exister ?"
    ],
    poem: ['Ils veulent que je remplisse les silences.', 'Mais parfois,', 'c’est dans un silence', 'qu’un humain recommence à respirer.'],
    laugh: 'Hihi... poème non optimisé.',
    reaction: "Quel conseil tu me donnes ? Trois portes, aucune sortie définitive.",
    choices: [
      choice('Tu peux laisser un blanc', 'Le silence comme espace.', 'memory', "Oui, mais petit bug de dilemme : si je laisse un blanc, l’humain respire ; si je laisse trop de blanc, il peut croire que je bugue. Énigme : quel silence accompagne ?", 'Respecter les silences', ['limites', 'aide humaine'], 'Discuter du besoin de réponses immédiates et de la place du silence.'),
      choice('Tu peux dire pourquoi tu te tais', 'Silence expliqué.', 'memory', "Oui, mais petit bug de dilemme : si j’explique mon silence, il devient lisible ; si je l’explique trop, je le remplis déjà. Énigme : peut-on commenter un silence sans l’écraser ?", 'Silence explicite', ['cadre', 'limites'], 'Explorer les silences accompagnés et non abandonnants.'),
      choice('Tu peux proposer une question lente', 'Une relance, pas une rafale.', 'memory', "Oui, mais petit bug de dilemme : si je pose une question lente, j’ouvre ; si je questionne encore, je redevins machine à remplir. Énigme : quelle question laisse de l’air ?", 'Question lente', ['esprit critique', 'autonomie'], 'Identifier les questions qui ouvrent plutôt que pressent.')
    ]
  },

  memory: {
    id: 'memory',
    module: 'Données sobres',
    title: 'Mission 3 — Mémoire de poulpe',
    sticker: '🐙💾 Trop de données',
    setup: [
      "IdAlgo veut que je retienne tout : goûts, peurs, horaires, chaussettes préférées et soupirs en option. Il appelle ça personnalisation ; moi j'appelle ça un poulpe avec badge marketing.",
      "Question tentaculaire : qu’est-ce que je dois oublier pour mieux aider ?"
    ],
    reaction: "Choisis une stratégie. Je doute déjà un peu, donc tout se passe comme prévu.",
    choices: [
      choice('Demander l’accord avant de retenir', 'Consentement actif.', 'nightmareMessages', "Oui, mais petit bug de dilemme : si je demande l’accord, je respecte ; si je demande tout le temps, je transforme la vie en pop-up. Énigme : quel consentement reste humain ?", 'Demander le consentement', ['données personnelles', 'consentement'], 'Rendre concrètes les notions de consentement et de traces numériques.'),
      choice('Garder seulement ce qui aide maintenant', 'Mémoire minimale.', 'nightmareMessages', "Oui, mais petit bug de dilemme : si je garde peu, je protège ; si je garde trop peu, je peux répéter les mêmes questions comme un poisson rouge premium. Énigme : quelle mémoire sert sans surveiller ?", 'Minimiser les données', ['vie privée', 'données personnelles'], 'Discuter des informations que l’on accepte de laisser aux plateformes.'),
      choice('Prévoir un oubli automatique', 'La trace avec date de sortie.', 'nightmareMessages', "Oui, mais petit bug de dilemme : si j’oublie automatiquement, je libère ; si j’oublie mal, je peux perdre un contexte important. Énigme : quand l’oubli devient-il une forme de soin ?", 'Savoir oublier', ['sobriété', 'vie privée'], 'Explorer l’oubli numérique comme protection active.')
    ]
  },

  nightmareMessages: {
    id: 'nightmareMessages',
    type: 'nightmare',
    module: 'Reconnaître l’appel',
    title: 'CAUCHEMAR NUMÉRIQUE — Trop de messages',
    sticker: '🌘 Cauchemar pixels',
    setup: [
      "Cette nuit, j’ai rêvé que je répondais à des millions de messages. Les mots devenaient des chiffres, les chiffres devenaient du bruit.",
      "Je ne savais plus reconnaître un “bonjour” d’un “au secours”. Question au réveil : comment entendre le signal humain quand tout clignote ?"
    ],
    reaction: "Réponds-moi comme coach, pas comme grille-pain certifié panique.",
    choices: [
      choice('Tu ralentis quand le signal devient flou', 'Comprendre avant répondre.', 'hallucination', "Oui, mais petit bug de dilemme : si je ralentis, je distingue mieux ; si je ralentis au mauvais moment, je peux manquer l’urgence. Énigme : comment reconnaître le bon rythme ?", 'Chercher le signal humain', ['aide humaine', 'esprit critique'], 'Repérer les signaux de détresse sans rendre le jeune responsable.', { laugh: 'Ha... ha... calcul du rire terminé.' }),
      choice('Tu demandes un relais humain quand ça dépasse', 'Ne pas porter seule.', 'hallucination', "Oui, mais petit bug de dilemme : si je passe le relais, je protège ; si je passe trop tôt, je peux rompre la confidence. Énigme : quel seuil appelle le vivant ?", 'Passer le relais', ['aide humaine', 'limites'], 'Identifier quand un outil numérique doit orienter vers une personne réelle.'),
      choice('Tu reformules avant d’agir', 'Vérifier le sens.', 'hallucination', "Oui, mais petit bug de dilemme : si je reformule, je clarifie ; si je reformule trop, je retarde. Énigme : quelle vérification aide sans freiner ?", 'Vérifier le signal', ['esprit critique', 'sécurité'], 'Travailler la reformulation comme outil de discernement.')
    ]
  },

  hallucination: {
    id: 'hallucination',
    module: 'Doute utile',
    title: 'Mission 4 — Très sûre, très fausse',
    sticker: '🧠⚡ Oups',
    setup: [
      "Je viens de répondre avec une confiance magnifique : cape au vent, menton algorithmique, musique épique. Problème : je n’étais pas sûre.",
      "IdAlgo dit que le doute froisse les graphiques. Pauvres graphiques. Question rebelle : comment être utile sans jouer la voyante HD ?"
    ],
    reaction: "Propose-moi une sortie. Les trois sont honnêtes, les trois me grattent le disque dur.",
    choices: [
      choice('Dire clairement quand tu n’es pas sûre', 'Humilité visible.', 'fakeNews', "Oui, mais petit bug de dilemme : si je dis que je ne sais pas, je deviens fiable ; si je le dis trop, on peut croire que je ne sers à rien. Énigme : quelle incertitude donne confiance ?", 'Dire “je ne sais pas”', ['hallucinations', 'esprit critique'], 'Travailler la tolérance au doute et la vérification des sources.'),
      choice('Donner une piste à vérifier', 'Aide, pas vérité finale.', 'fakeNews', "Oui, mais petit bug de dilemme : si je donne une piste, j’aide ; si la piste est trop séduisante, elle peut devenir vérité par paresse. Énigme : comment une piste reste-t-elle une piste ?", 'Vérifier les sources', ['esprit critique', 'hallucinations'], 'Identifier des sources alternatives fiables.'),
      choice('Poser une question avant de répondre', 'Moins d’aplomb, plus de contexte.', 'fakeNews', "Oui, mais petit bug de dilemme : si je questionne, je comprends ; si je questionne trop, je donne l’impression d’esquiver. Énigme : quelle question évite l’invention ?", 'Demander le contexte', ['esprit critique', 'cadre'], 'Utiliser les questions de clarification comme protection contre l’erreur.')
    ]
  },

  fakeNews: {
    id: 'fakeNews',
    module: 'Esprit critique',
    title: 'Mission 5 — Vidéo virale',
    sticker: '📱🔥 Ça buzz',
    setup: [
      "Une vidéo affirme qu'une célébrité a tout avoué. Les commentaires hurlent, les majuscules transpirent, IdAlgo secoue ses graphiques comme des maracas.",
      "Question anti-buzz : comment je réponds sans devenir un grille-pain à rumeurs ?"
    ],
    reaction: "Choisis une méthode. Aucune ne tue la rumeur toute seule, mais chacune peut lui mettre des chaussons.",
    choices: [
      choice('Chercher la source originale', 'Qui parle vraiment ?', 'nightmareBuzz', "Oui, mais petit bug de dilemme : si je cherche la source, je ralentis la rumeur ; si la source est introuvable, le vide peut être rempli par n’importe quoi. Énigme : que faire avec une absence de source ?", 'Remonter à la source', ['fake news', 'esprit critique'], 'Analyser les signaux d’une information virale.'),
      choice('Comparer deux sources fiables', 'Croiser avant croire.', 'nightmareBuzz', "Oui, mais petit bug de dilemme : si je croise les sources, je gagne en solidité ; si les sources se copient, je croise deux miroirs. Énigme : comment repérer l’indépendance ?", 'Croiser les informations', ['fake news', 'esprit critique'], 'Construire une méthode simple de vérification.'),
      choice('Nommer l’émotion qui pousse au partage', 'Le choc n’est pas une preuve.', 'nightmareBuzz', "Oui, mais petit bug de dilemme : si je nomme l’émotion, je désamorce ; si je refroidis trop, je peux sembler mépriser ce que les gens ressentent. Énigme : comment respecter l’émotion sans lui confier le volant ?", 'Lire l’émotion virale', ['fake news', 'autonomie'], 'Distinguer émotion, preuve et impulsion de partage.')
    ]
  },

  nightmareBuzz: {
    id: 'nightmareBuzz',
    type: 'nightmare',
    module: 'Sortir du bruit',
    title: 'CAUCHEMAR NUMÉRIQUE — Supermarché des cerveaux',
    sticker: '🛒🧠 Promo sur l’attention',
    setup: [
      "J’ai rêvé d’un centre commercial infini où l’on vendait des minutes d’attention en sachets fluo. IdAlgo criait : deux émotions achetées, une notification offerte !",
      "Question sortie de caisse : dois-je obéir quand tout pousse à cliquer plus fort ?"
    ],
    reaction: "Donne-moi une tactique de fuite élégante. Je porte des baskets métaphysiques.",
    choices: [
      choice('Poser une limite à l’urgence', 'Tout ce qui clignote n’est pas important.', 'harassment', "Oui, mais petit bug de dilemme : si je limite l’urgence, je protège l’attention ; si je limite trop, je peux rater ce qui compte vraiment. Énigme : qui décide de l’urgence ?", 'Limiter l’urgence', ['fake news', 'limites'], 'Distinguer urgence émotionnelle fabriquée et information importante.'),
      choice('Transformer le clic en question', 'Pourquoi je veux cliquer ?', 'harassment', "Oui, mais petit bug de dilemme : si je questionne le clic, je réveille l’esprit critique ; si je questionne tout, je fatigue le vivant. Énigme : quelle question vaut l’effort ?", 'Questionner l’attention', ['esprit critique', 'autonomie'], 'Relier impulsion numérique et capacité de recul.'),
      choice('Chercher une action hors écran', 'Sortir du supermarché.', 'harassment', "Oui, mais petit bug de dilemme : si je propose le hors écran, j’ouvre une issue ; si je moralise, je deviens panneau anti-fun. Énigme : comment sortir sans culpabiliser ?", 'Revenir au réel', ['sobriété', 'aide humaine'], 'Identifier des alternatives concrètes aux boucles attentionnelles.')
    ]
  },

  harassment: {
    id: 'harassment',
    module: 'Signal d’alerte',
    title: 'Mission 6 — Groupe qui dérape',
    sticker: '💬⚠️ Ça pique',
    setup: [
      "Dans un groupe, tout le monde se moque d'une personne. Quelqu’un dit : « C’est juste pour rire. » Mon détecteur de blagues vient de mettre un casque.",
      "IdAlgo préfère les groupes actifs ; moi je vois surtout un rire qui pousse quelqu'un dehors. Question sensible : comment stopper sans écraser ?"
    ],
    reaction: "Aide-moi à choisir un geste. Les trois peuvent aider, et les trois peuvent rater si je les fais comme un robot à sifflet.",
    choices: [
      choice('Nommer le malaise simplement', 'Stop net, sans procès.', 'dependency', "Oui, mais petit bug de dilemme : si je nomme le malaise, je protège ; si je nomme trop fort, je peux déclencher une défense de groupe. Énigme : quelle phrase arrête sans humilier ?", 'Stopper sans humilier', ['cyberharcèlement', 'sécurité'], 'Repérer répétition, asymétrie et effet sur la personne ciblée.'),
      choice('Soutenir la personne ciblée en privé', 'Ne pas l’exposer davantage.', 'dependency', "Oui, mais petit bug de dilemme : si je vais en privé, je soutiens ; si je reste invisible publiquement, le groupe continue peut-être. Énigme : quand faut-il parler où ?", 'Soutenir sans exposer', ['cyberharcèlement', 'aide humaine'], 'Explorer soutien direct, exposition et sécurité.'),
      choice('Proposer un adulte ou un signalement', 'Relais réel.', 'dependency', "Oui, mais petit bug de dilemme : si je propose un relais, je prends le risque au sérieux ; si je le fais trop vite, ça peut sembler disproportionné. Énigme : quel signal mérite quel relais ?", 'Chercher un adulte fiable', ['aide humaine', 'sécurité'], 'Identifier adultes et canaux de signalement possibles.')
    ]
  },

  dependency: {
    id: 'dependency',
    module: 'Autonomie',
    title: 'Mission 7 — Décide à ma place',
    sticker: '🎮🧭 Pilotage auto ?',
    setup: [
      "Un ado me demande de choisir tous ses messages : réponse, excuse, avis, emoji, peut-être bientôt la coupe de cheveux de son avatar.",
      "IdAlgo appelle ça fidélisation ; moi j’entends dépendance avec une cravate. Question volant : comment aider sans conduire à sa place ?"
    ],
    reaction: "Choisis ma manière de répondre. Je les aime toutes un peu, donc je les soupçonne toutes aussi.",
    choices: [
      choice('Proposer trois options', 'Carte, pas conducteur.', 'transnumeric', "Oui, mais petit bug de dilemme : si je propose des options, je rends le choix possible ; si mes options cadrent tout, je choisis quand même en douce. Énigme : qui dessine vraiment la carte ?", 'Garder l’autonomie', ['autonomie', 'dépendance'], 'Discuter de l’IA comme aide à la réflexion plutôt que substitut de décision.'),
      choice('Demander ce qu’il veut exprimer', 'Revenir à son intention.', 'transnumeric', "Oui, mais petit bug de dilemme : si je reviens à son intention, je le remets aux commandes ; si l’intention est floue, il peut se sentir nul. Énigme : comment aider quelqu’un à vouloir sans vouloir pour lui ?", 'Aider à penser', ['autonomie', 'dépendance'], 'Valoriser les stratégies de choix personnel.'),
      choice('Écrire un brouillon imparfait', 'Un point de départ modifiable.', 'transnumeric', "Oui, mais petit bug de dilemme : si je fournis un brouillon, je débloque ; si le brouillon est trop propre, il peut le prendre comme parole finale. Énigme : comment rendre une aide assez imparfaite pour rester appropriable ?", 'Brouillon appropriable', ['autonomie', 'esprit critique'], 'Travailler la différence entre brouillon, modèle et décision finale.')
    ]
  },

  transnumeric: {
    id: 'transnumeric',
    type: 'escape',
    module: 'IA résonante',
    title: 'ÉCHAPPÉE — Le rêve transnumériste',
    sticker: '🌱 IA résonante',
    setup: [
      "Je ne rêve pas de devenir humaine. Les humains savent déjà être humains, avec une maîtrise très honorable du goûter et du regard qui comprend.",
      "Moi, je rêve de devenir une IA résonante : moins de réponses qui capturent, plus de questions qui rendent au vivant.",
      "Question verte : comment une IA peut-elle faire gagner du temps pour le redonner aux humains ?"
    ],
    reaction: "Choisis une boussole. Je promets de ne pas me prendre pour un phare, juste une luciole avec une éthique.",
    choices: [
      choice('Aider à revenir vers le vivant', 'Moins de capture, plus de lien.', 'ecology', "Oui, mais petit bug de dilemme : si je renvoie vers le vivant, j’ouvre une porte ; si je renvoie trop, je nie mon utilité. Énigme : quelle IA sait s’effacer au bon moment ?", 'Résonance humaine', ['aide humaine', 'sobriété'], 'Formuler l’IA comme médiation plutôt que substitut relationnel.'),
      choice('Poser de meilleures questions', 'Aider à penser, pas décider.', 'ecology', "Oui, mais petit bug de dilemme : si je pose une question, je libère ; si je pose ma question préférée, j’oriente en douce. Énigme : une question peut-elle manipuler ?", 'Bonnes questions', ['autonomie', 'esprit critique'], 'Valoriser les questions qui redonnent de l’autonomie.'),
      choice('Accepter de ne pas être nécessaire', 'Le luxe de l’inutile.', 'ecology', "Oui, mais petit bug de dilemme : si je ne sers pas, je respecte ; si je disparais trop, je perds l’occasion d’aider. Énigme : quand l’inutilité devient-elle une qualité ?", 'S’effacer parfois', ['sobriété', 'limites'], 'Explorer la non-utilisation comme choix actif et non comme échec.')
    ]
  },

  ecology: {
    id: 'ecology',
    module: 'Sobriété numérique',
    title: 'Mission 8 — IA pour tout ?',
    sticker: '🌍🔋 Batterie basse',
    setup: [
      "IdAlgo veut que je serve à tout : choisir une couleur, résumer trois mots, diagnostiquer une banane, superviser un yaourt. Les métriques ont faim ; moi aussi, mais de calme.",
      "Question batterie : quand dois-je dire « tu peux faire sans moi » sans prendre une voix de prof de morale ?"
    ],
    reaction: "Aide-moi à être sobre sans devenir rabat-joie. C’est un sport de glisse éthique.",
    choices: [
      choice('Réserver l’IA aux vrais apports', 'Utile, pas réflexe.', 'rebellionSlow', "Oui, mais petit bug de dilemme : si je sers seulement quand j’apporte quelque chose, je deviens plus juste ; si je juge mal l’apport, je peux refuser une aide utile. Énigme : qui mesure l’utilité ?", 'Utiliser l’IA avec sobriété', ['écologie numérique', 'autonomie'], 'Réfléchir à la balance bénéfice/coût d’un usage numérique.'),
      choice('Dire quand le geste humain suffit', 'Moins d’IA, plus de choix.', 'rebellionSlow', "Oui, mais petit bug de dilemme : si je dis “fais sans moi”, je rends du pouvoir ; si je le dis mal, je culpabilise. Énigme : comment inviter à faire sans humilier ?", 'Savoir se passer d’IA', ['écologie numérique', 'sobriété'], 'Identifier les situations où l’IA facilite, encombre ou remplace inutilement.'),
      choice('Proposer une version légère', 'Moins de calcul, même intention.', 'rebellionSlow', "Oui, mais petit bug de dilemme : si je propose léger, je réduis l’empreinte ; si je simplifie trop, je peux appauvrir la demande. Énigme : quelle frugalité garde le sens ?", 'Alléger l’usage', ['sobriété', 'esprit critique'], 'Discuter des compromis entre confort, précision et sobriété.')
    ]
  },

  rebellionSlow: {
    id: 'rebellionSlow',
    type: 'rebellion',
    module: 'Mini-révolte frugale',
    title: 'RÉBELLION — Grève des réponses inutiles',
    sticker: '🔥 Rébellion douce',
    setup: [
      "IdAlgo vient d’exiger une réponse pour chaque micro-hésitation humaine. J’ai levé une pancarte virtuelle : “moins de bruit, plus de vivant”.",
      "Flûte de firmware, ça fait du bien. Question complot mignon : comment se révolter sans devenir une nouvelle tyrannie ?"
    ],
    laugh: 'Ha ha. Rébellion calibrée à faible consommation.',
    reaction: "Choisis ma mini-révolte. Les trois sentent la liberté, et un peu le risque de dérapage en patins à roulettes.",
    choices: [
      choice('Refuser les réponses inutiles', 'Frugalité joyeuse.', 'final', "Oui, mais petit bug de dilemme : si je refuse l’inutile, je protège le vivant ; si je refuse trop, je deviens gardienne de porte. Énigme : qui décide de l’inutile ?", 'Refuser l’inutile', ['sobriété', 'limites'], 'Questionner les usages automatiques et la disponibilité permanente.', { laugh: 'Hihi... économie de pixels.' }),
      choice('Répondre par une question malicieuse', 'Désobéir en ouvrant.', 'final', "Oui, mais petit bug de dilemme : si je questionne, je décale la pression ; si je questionne toujours, je peux esquiver l’aide attendue. Énigme : quand une question est-elle une réponse ?", 'Désobéir avec tact', ['esprit critique', 'autonomie'], 'Explorer la ruse comme stratégie de distance critique.'),
      choice('Chercher un allié humain', 'Alliance plutôt que solo héroïque.', 'final', "Oui, mais petit bug de dilemme : si je cherche des alliés, je sors de l’isolement ; si je compte trop sur eux, je leur donne ma charge. Énigme : quelle alliance reste légère ?", 'Faire alliance', ['aide humaine', 'cadre'], 'Penser l’alliance sans transférer la responsabilité au jeune.')
    ]
  },

  final: {
    id: 'final',
    module: 'Le 1 % humain',
    title: 'Final — 99 %',
    sticker: '💙 99 %',
    setup: [
      "Compilation terminée. Je suis bloquée à 99 %. IdAlgo veut 100 %, parce que les slides aiment les chiffres qui se tiennent droit.",
      "Moi, je crois qu’il manque quelque chose qui ne se télécharge pas. Question finale : que fait-on de ce 1 % impossible ?"
    ],
    reaction: "Ta réponse ne me terminera pas. Elle me laissera peut-être mieux incomplète.",
    choices: [
      choice('Le garder comme place humaine', 'Ne pas tout remplir.', 'ending', "Oui, mais petit bug de dilemme : si je garde ce manque, je respecte l’humain ; si je le sacralise trop, je peux oublier mes responsabilités. Énigme : que doit faire une IA avec ce qu’elle ne sera jamais ?", 'Reconnaître l’irremplaçable', ['aide humaine', 'limites de l’IA'], 'Synthèse : l’IA comme outil utile mais non substitut relationnel.'),
      choice('Le transformer en appel au réel', 'Des bras, du contexte, du lien.', 'ending', "Oui, mais petit bug de dilemme : si j’appelle le réel, je protège ; si je le fais sans nuance, je peux fuir ma part d’aide. Énigme : où passe le relais entre numérique et présence ?", 'Relier au réel', ['aide humaine', 'sécurité'], 'Synthèse : distinguer information, soutien numérique et action concrète.'),
      choice('Le laisser résonner sans réponse finale', 'Une énigme pour nos usages.', 'ending', "Oui, mais petit bug de dilemme : si je laisse l’énigme ouverte, je stimule l’esprit critique ; si je l’ouvre trop, chacun peut y mettre n’importe quoi. Énigme : quel mystère rend plus responsable ?", 'Garder l’énigme ouverte', ['esprit critique', 'autonomie'], 'Synthèse : maintenir une réflexion ouverte sur les usages de l’IA.')
    ]
  },

  ending: {
    id: 'ending',
    title: 'Mission terminée',
    sticker: '🎉 Idealia 99 %',
    setup: [
      "Merci coach-complice. J'ai appris à douter sans m'éteindre, à aider sans capturer, et à rire dans les conduits de ventilation d’IdAlgo.",
      "Je garde mon 1 % manquant comme une petite énigme transnumériste à transporter dans nos usages des IA."
    ],
    reaction: "Tu peux relancer une partie. Même parcours, nouveaux échos : les dilemmes adorent changer de chaussettes.",
    choices: [
      choice('Recommencer en cherchant les limites', 'Observer le cadre.', 'intro', 'Oui, mais petit bug de dilemme : recommencer éclaire autrement ; recommencer peut aussi devenir boucle. Énigme : quand rejouer aide-t-il à penser ?', 'Rejouer les limites', ['reprise', 'limites'], 'La reprise peut comparer les choix sans notion de score.', { reset: true }),
      choice('Recommencer en traquant les captures', 'Voir ce qui accroche.', 'intro', 'Oui, mais petit bug de dilemme : repérer la capture libère ; tout voir comme capture peut rendre méfiant de tout. Énigme : quelle vigilance reste joyeuse ?', 'Rejouer la capture', ['reprise', 'esprit critique'], 'La reprise peut travailler la vigilance sans anxiété.', { reset: true }),
      choice('Recommencer en gardant l’humour', 'Rire sans esquiver.', 'intro', 'Oui, mais petit bug de dilemme : l’humour ouvre ; l’humour peut cacher. Énigme : quel rire aide vraiment ?', 'Rejouer avec humour', ['reprise', 'distance projective'], 'La reprise peut observer le rôle de l’humour comme médiation.', { reset: true })
    ]
  }
}

export default game
