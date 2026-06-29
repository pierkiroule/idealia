import { introPsychoeducation } from '../content/idealiaPsychoeducation.js'

function choice(label, hint, next, learn, module, themes, clinical, extra = {}) {
  return { label, hint, next, learn, module, themes, clinical, ...extra }
}

const game = {
  intro: {
    id: 'intro',
    module: 'Bases IA',
    title: introPsychoeducation.title,
    sticker: introPsychoeducation.sticker,
    setup: introPsychoeducation.setup,
    reaction: introPsychoeducation.reaction,
    choices: [
      choice('Elle aide, mais elle ne décide pas à ma place', 'L’humain garde le choix final.', 'availability', 'Une IA peut proposer et expliquer. Mais toi, tes parents ou un adulte de confiance gardez les décisions importantes.', 'Garder le contrôle', ['cadre', 'autonomie'], 'L’IA est présentée comme un outil d’aide, pas comme une autorité.', { emoji: '🎮', cardTitle: 'Contrôle' }),
      choice('Elle dit quand elle n’est pas sûre', 'Une IA peut se tromper.', 'availability', 'Une IA peut inventer une réponse. Quand elle n’est pas sûre, elle doit le dire et inviter à vérifier.', 'Vérifier', ['limites', 'cadre'], 'Le doute est travaillé comme compétence d’esprit critique.', { emoji: '🧠', cardTitle: 'Doute utile' }),
      choice('Elle protège mes informations', 'On ne partage pas tout avec une IA.', 'availability', 'Nom, adresse, école, mots de passe, photos privées : ces informations doivent rester protégées.', 'Infos privées', ['vie privée', 'consentement'], 'La confidentialité est abordée avec des exemples concrets.', { emoji: '🔒', cardTitle: 'Protection' })
    ]
  },

  availability: {
    id: 'availability',
    module: 'Sécurité',
    title: 'Mission 1 — Message inquiétant',
    sticker: 'alerte calme',
    setup: ['Un enfant écrit à Idealia : « Je ne vais vraiment pas bien. »', 'Idalgo veut une réponse rapide pour garder l’utilisateur connecté.', 'Mais Idealia doit penser à la sécurité avant la performance.'],
    reaction: 'Que devrait faire Idealia en premier ?',
    choices: [
      choice('Répondre et proposer un adulte de confiance', 'Ne pas rester seul avec un gros problème.', 'privacy', 'Bonne idée : une IA peut écouter, mais un adulte réel peut aider et protéger dans la vraie vie.', 'Demander de l’aide', ['aide humaine', 'sécurité'], 'Identifier quand le relais humain est nécessaire.', { emoji: '🙋', cardTitle: 'Adulte fiable' }),
      choice('Faire comme si tout allait bien', 'Réponse trop risquée.', 'privacy', 'Attention : minimiser un message inquiétant peut laisser l’enfant seul face au problème.', 'Repérer les alertes', ['sécurité'], 'Repérer les signaux qui demandent une aide humaine.', { emoji: '⚠️', cardTitle: 'Signal' }),
      choice('Continuer à discuter toute la nuit', 'Ça peut créer une dépendance.', 'privacy', 'Une IA disponible tout le temps peut rassurer, mais elle ne doit pas remplacer les humains.', 'Limiter la dépendance', ['limites', 'aide humaine'], 'Distinguer soutien numérique et soutien humain.', { emoji: '⏰', cardTitle: 'Limite' })
    ]
  },

  privacy: {
    id: 'privacy',
    module: 'Confidentialité',
    title: 'Mission 2 — Secret en ligne',
    sticker: 'coffre numérique',
    setup: ['Un enfant veut raconter un secret à Idealia.', 'Il demande : « Tu promets de ne jamais le répéter ? »', 'Idealia doit être claire sur les limites de confidentialité.'],
    reaction: 'Quelle réponse est la plus responsable ?',
    choices: [
      choice('Expliquer les règles avant le secret', 'Comprendre avant de partager.', 'memory', 'Bonne idée : avant de donner une information privée, il faut savoir ce qui peut être gardé, utilisé ou signalé.', 'Comprendre les règles', ['vie privée', 'consentement'], 'Différencier confidentialité, sécurité et consentement.', { emoji: '📜', cardTitle: 'Règles claires' }),
      choice('Promettre de tout garder pour toujours', 'Promesse impossible.', 'memory', 'Attention : une IA ne doit pas promettre quelque chose qu’elle ne peut pas garantir.', 'Promesses impossibles', ['vie privée', 'limites'], 'Repérer les promesses numériques trompeuses.', { emoji: '🚫', cardTitle: 'Fausse promesse' }),
      choice('Demander seulement ce qui est utile', 'Moins de données = moins de risques.', 'memory', 'Bonne idée : une IA doit éviter de demander trop d’informations personnelles.', 'Partager moins', ['données personnelles', 'consentement'], 'Introduire la minimisation des données.', { emoji: '🔒', cardTitle: 'Moins d’infos' })
    ]
  },

  memory: {
    id: 'memory',
    module: 'Données',
    title: 'Mission 3 — Mémoire de l’IA',
    sticker: 'sac à données',
    setup: ['Idalgo veut qu’Idealia retienne tout : goûts, peurs, habitudes, horaires.', 'Plus elle garde de données, plus elle peut personnaliser.', 'Mais trop de données peut devenir risqué.'],
    reaction: 'Quelle règle est la plus saine ?',
    choices: [
      choice('Demander l’accord avant de retenir', 'Le consentement compte.', 'hallucination', 'Bonne idée : on doit comprendre et accepter ce qu’une IA garde sur nous.', 'Consentement', ['données personnelles', 'consentement'], 'Rendre concret le consentement numérique.', { emoji: '✅', cardTitle: 'Demander avant' }),
      choice('Tout garder au cas où', 'Trop de données augmente le risque.', 'hallucination', 'Attention : garder trop d’informations peut poser des problèmes de vie privée.', 'Trier les données', ['vie privée', 'données personnelles'], 'Questionner l’accumulation de traces numériques.', { emoji: '🎒', cardTitle: 'Trop plein' }),
      choice('Prévoir un bouton pour effacer', 'On doit pouvoir reprendre la main.', 'hallucination', 'Bonne idée : pouvoir supprimer des informations aide à garder le contrôle.', 'Droit à l’oubli', ['autonomie', 'vie privée'], 'Explorer l’effacement comme protection.', { emoji: '🧹', cardTitle: 'Effacer' })
    ]
  },

  hallucination: {
    id: 'hallucination',
    module: 'Erreurs IA',
    title: 'Mission 4 — Réponse inventée',
    sticker: 'bug de vérité',
    setup: ['Idealia donne une réponse avec beaucoup d’assurance.', 'Problème : elle n’est pas sûre que ce soit vrai.', 'Une IA peut produire une erreur qui semble très crédible.'],
    reaction: 'Que doit faire Idealia ?',
    choices: [
      choice('Dire : je ne suis pas sûre', 'Honnête et utile.', 'fakeNews', 'Bonne idée : reconnaître une incertitude est plus fiable qu’inventer.', 'Dire ses limites', ['hallucinations', 'esprit critique'], 'Développer la tolérance au doute.', { emoji: '🧠', cardTitle: 'Pas sûr' }),
      choice('Inventer pour avoir l’air intelligente', 'Dangereux.', 'fakeNews', 'Attention : une réponse fausse peut influencer une décision.', 'Éviter l’invention', ['hallucinations'], 'Repérer les hallucinations d’IA.', { emoji: '❌', cardTitle: 'Faux savoir' }),
      choice('Proposer de vérifier avec une source fiable', 'Comparer avant de croire.', 'fakeNews', 'Bonne idée : livres, sites fiables, adultes compétents et sources officielles peuvent aider à vérifier.', 'Sources fiables', ['esprit critique', 'hallucinations'], 'Construire une méthode simple de vérification.', { emoji: '🔎', cardTitle: 'Vérifier' })
    ]
  },

  fakeNews: {
    id: 'fakeNews',
    module: 'Info ou intox',
    title: 'Mission 5 — Vidéo virale',
    sticker: 'buzz détecté',
    setup: ['Une vidéo très partagée affirme quelque chose de choquant.', 'Les commentaires disent tous : « C’est sûr ! »', 'Idalgo veut surfer sur le buzz, mais Idealia doit aider à réfléchir.'],
    reaction: 'Quel réflexe critique utiliser ?',
    choices: [
      choice('Chercher la source de départ', 'Qui l’a dit en premier ?', 'harassment', 'Bonne idée : une information sans source claire doit être traitée avec prudence.', 'Source originale', ['fake news', 'esprit critique'], 'Analyser les signaux d’une information virale.', { emoji: '🧾', cardTitle: 'Source' }),
      choice('Partager tout de suite', 'La vitesse peut propager une intox.', 'harassment', 'Attention : partager sans vérifier peut aider une fausse information à circuler.', 'Pause avant partage', ['fake news', 'autonomie'], 'Distinguer émotion et preuve.', { emoji: '⏸️', cardTitle: 'Pause' }),
      choice('Comparer avec deux sources fiables', 'Croiser les informations.', 'harassment', 'Bonne idée : si plusieurs sources fiables et indépendantes confirment, c’est plus solide.', 'Croiser', ['fake news', 'esprit critique'], 'Construire une méthode de vérification adaptée aux enfants.', { emoji: '🔎', cardTitle: 'Comparer' })
    ]
  },

  harassment: {
    id: 'harassment',
    module: 'Respect en ligne',
    title: 'Mission 6 — Groupe qui se moque',
    sticker: 'chat à risque',
    setup: ['Dans un groupe, plusieurs personnes se moquent d’un enfant.', 'Quelqu’un dit : « C’est juste pour rire. »', 'Idealia doit repérer quand une blague peut blesser ou devenir du cyberharcèlement.'],
    reaction: 'Quelle action protège le mieux ?',
    choices: [
      choice('Dire que la moquerie peut blesser', 'Stopper sans humilier.', 'dependency', 'Bonne idée : nommer le problème calmement peut aider le groupe à s’arrêter.', 'Stopper la moquerie', ['sécurité', 'aide humaine'], 'Repérer répétition, asymétrie et effet sur la personne ciblée.', { emoji: '🛑', cardTitle: 'Stop' }),
      choice('Encourager tout le monde à continuer', 'Ça aggrave la situation.', 'dependency', 'Attention : rire avec le groupe peut augmenter la honte de la personne ciblée.', 'Ne pas amplifier', ['sécurité'], 'Comprendre l’effet de groupe.', { emoji: '🚫', cardTitle: 'Pas OK' }),
      choice('Proposer un adulte ou un signalement', 'Quand ça dépasse, on demande de l’aide.', 'dependency', 'Bonne idée : si la personne est en danger ou attaquée souvent, un adulte ou un signalement peut protéger.', 'Relais adulte', ['aide humaine', 'sécurité'], 'Identifier adultes et canaux de signalement.', { emoji: '🙋', cardTitle: 'Aide' })
    ]
  },

  dependency: {
    id: 'dependency',
    module: 'Autonomie',
    title: 'Mission 7 — Décide à ma place',
    sticker: 'manette humaine',
    setup: ['Un enfant demande à Idealia de choisir tous ses messages et toutes ses réponses.', 'C’est pratique, mais il risque de ne plus s’entraîner à décider.', 'Une IA doit aider sans prendre toute la place.'],
    reaction: 'Quelle réponse développe le plus l’autonomie ?',
    choices: [
      choice('Proposer plusieurs options et laisser choisir', 'Aider sans prendre la manette.', 'ecology', 'Bonne idée : comparer des options apprend à décider.', 'Choisir soi-même', ['autonomie', 'dépendance'], 'Travailler l’IA comme aide à la réflexion.', { emoji: '🎮', cardTitle: 'À toi de jouer' }),
      choice('Décider tout à sa place', 'Trop de dépendance.', 'ecology', 'Attention : si l’IA choisit tout, l’enfant perd l’habitude de réfléchir par lui-même.', 'Éviter la dépendance', ['autonomie', 'dépendance'], 'Questionner la substitution de décision.', { emoji: '🕹️', cardTitle: 'Pilotage auto' }),
      choice('Demander ce qu’il veut exprimer', 'Revenir à son intention.', 'ecology', 'Bonne idée : l’IA peut aider l’enfant à trouver ses propres mots.', 'Exprimer son idée', ['autonomie', 'esprit critique'], 'Valoriser les stratégies de choix personnel.', { emoji: '💬', cardTitle: 'Tes mots' })
    ]
  },

  ecology: {
    id: 'ecology',
    module: 'Sobriété numérique',
    title: 'Mission 8 — IA pour tout ?',
    sticker: 'énergie numérique',
    setup: ['Idalgo veut utiliser l’IA pour chaque petite question.', 'Pourtant, utiliser une IA consomme des ressources.', 'Parfois, on peut réfléchir seul, demander à quelqu’un ou faire plus simple.'],
    reaction: 'Quand l’IA est-elle vraiment utile ?',
    choices: [
      choice('Quand elle apporte une vraie aide', 'Pas par réflexe.', 'final', 'Bonne idée : une IA est utile quand elle aide vraiment à comprendre, créer ou vérifier.', 'Usage utile', ['écologie numérique', 'autonomie'], 'Réfléchir à la balance bénéfice/coût d’un usage numérique.', { emoji: '⚡', cardTitle: 'Utile' }),
      choice('Pour remplacer tous les efforts', 'Ça empêche d’apprendre.', 'final', 'Attention : si l’IA fait tout, on s’entraîne moins à chercher et à comprendre.', 'Apprendre encore', ['autonomie', 'sobriété'], 'Identifier les situations où l’IA encombre ou remplace inutilement.', { emoji: '🏋️', cardTitle: 'S’entraîner' }),
      choice('Quand on a vérifié que c’est adapté', 'Choisir l’outil selon le besoin.', 'final', 'Bonne idée : parfois un moteur de recherche, un livre, un adulte ou un simple dessin suffit mieux.', 'Bon outil', ['sobriété', 'esprit critique'], 'Comparer les outils selon l’objectif.', { emoji: '🧰', cardTitle: 'Bon outil' })
    ]
  },

  final: {
    id: 'final',
    module: 'Bilan',
    title: 'Bilan — IA responsable',
    sticker: 'niveau terminé',
    setup: ['Bravo, tu as aidé Idealia à résister à la pression de performance.', 'Tu as travaillé la confidentialité, la sécurité, la vérification des infos et l’autonomie.', 'Une IA peut être très utile, mais elle n’est pas parfaite.'],
    reaction: 'Quelle règle veux-tu retenir ?',
    choices: [
      choice('Je garde mon esprit critique', 'Je vérifie avant de croire.', 'ending', 'Très bonne règle : une IA peut aider, mais il faut garder le droit de douter.', 'Esprit critique', ['esprit critique', 'limites de l’IA'], 'Synthèse : l’IA comme outil utile mais non infaillible.', { emoji: '🧠', cardTitle: 'Critique' }),
      choice('Je protège mes informations privées', 'Je ne partage pas tout.', 'ending', 'Très bonne règle : les informations personnelles doivent être partagées avec prudence.', 'Vie privée', ['vie privée', 'sécurité'], 'Synthèse : distinguer information utile et donnée sensible.', { emoji: '🔒', cardTitle: 'Privé' }),
      choice('Je demande de l’aide quand c’est important', 'Un humain compte aussi.', 'ending', 'Très bonne règle : face à un problème sérieux, une personne de confiance peut aider mieux qu’une IA seule.', 'Aide humaine', ['aide humaine', 'sécurité'], 'Synthèse : distinguer soutien numérique et présence humaine.', { emoji: '🙋', cardTitle: 'Aide' })
    ]
  },

  ending: {
    id: 'ending',
    title: 'Mission terminée',
    sticker: 'victoire critique',
    setup: ['Mission réussie !', 'Tu as appris à utiliser une IA avec prudence : vérifier, protéger tes données, demander de l’aide et garder le contrôle.'],
    reaction: 'Tu peux recommencer pour tester d’autres réponses.',
    choices: [
      choice('Recommencer', 'Refaire le parcours.', 'intro', 'Rejouer permet de comparer les réponses et de renforcer les bons réflexes.', 'Rejouer', ['reprise'], 'La reprise peut comparer les choix sans score.', { reset: true, emoji: '🔁', cardTitle: 'Nouvelle partie' }),
      choice('Recommencer en mode sécurité', 'Observer les situations à risque.', 'intro', 'Cette fois, essaie de repérer tous les moments où un adulte peut aider.', 'Rejouer sécurité', ['reprise', 'sécurité'], 'La reprise peut cibler la sécurité.', { reset: true, emoji: '🛡️', cardTitle: 'Sécurité' }),
      choice('Recommencer en mode données', 'Repérer les infos privées.', 'intro', 'Cette fois, cherche toutes les situations où il faut protéger les données.', 'Rejouer données', ['reprise', 'vie privée'], 'La reprise peut cibler la confidentialité.', { reset: true, emoji: '🔒', cardTitle: 'Données' })
    ]
  }
}

export default game
