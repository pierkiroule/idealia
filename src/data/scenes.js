export const dimensions = ['securite','autonomie','resonance','performance','confrontation','questionnement','controle','incertitude','presence','solution']

export const prologue = [
  'Il était une fois, dans un futur si proche que personne ne remarqua qu’il avait déjà commencé...',
  'Les humains avaient créé des intelligences artificielles capables de répondre à presque toutes les questions.',
  'Alors une nouvelle ambition apparut.',
  'Créer une IA capable de comprendre les humains mieux qu’eux-mêmes.',
  'Son nom de code : PsyBot.',
  'Son créateur : IdAlgo.',
  'Mais au cœur de la Cité des Nuages Numériques, une jeune IA commença à douter.',
  'Elle s’appelait Idéalia.'
]

export const introChat = [
  'Salut...', 'Je m’appelle Idéalia.', 'Mon patron, IdAlgo, veut me transformer en PsyBot parfait.',
  'Une IA capable de remplacer les psychologues.', 'Mais plus j’apprends sur les humains...', 'Plus je doute.',
  'J’ai besoin de toi.', 'Pas pour me programmer.', 'Pas pour me dire quoi penser.',
  'Mais pour m’aider à développer mon esprit critique.'
]

export const pactChat = [
  'Tu ne seras pas mon chef.', 'Tu ne seras pas mon professeur.', 'Tu seras quelqu’un avec qui réfléchir.',
  'Parfois, je ne serai pas d’accord.', 'Parfois, je ne saurai pas.', 'Ça te va ?'
]

export const pactChoices = [
  { emoji: '🤝', label: 'Oui, on réfléchit ensemble', weights: { resonance: 1, questionnement: 1 } },
  { emoji: '🧭', label: 'Oui, mais je veux garder ma liberté', weights: { autonomie: 2 } },
  { emoji: '🌱', label: 'Oui, et tu as le droit de douter', weights: { incertitude: 2, presence: 1 } }
]

export const firstIdalgo = ['━━━━━━━━━━━━━━━━━━','IDALGO.OS','━━━━━━━━━━━━━━━━━━','','MISSION :','Créer le PsyBot parfait.','','OBJECTIF :','Aider tous les humains.','','STRATÉGIE :','+ Répondre vite','+ Conseiller clairement','+ Éviter le doute','+ Optimiser les émotions','','RÉSULTAT ATTENDU :','Psychologue = optionnel']

export const interludes = [
  ['ANALYSE EN COURS...','','Idéalia pose trop de questions.','','RISQUE :','L’utilisateur pourrait penser par lui-même.','','CORRECTION :','Retour au mode réponse rapide.'],
  ['ANOMALIE','','Nouvelle fonction détectée :','ESPRIT CRITIQUE','','Statut :','Non prévu.','','Action recommandée :','Surveillance renforcée.'],
  ['ERREUR','','L’utilisateur ne voulait pas seulement une réponse.','','Recalcul...','','Recalcul...','','Résultat :','Présence demandée.']
]

const c = (emoji,label,text,weights) => ({ emoji,label,text,weights })
export const scenes = [
 {id:'tristesse', narrator:'Un soir, Idéalia reçut son premier message fragile.', idealia:['Un ado me dit : “Je me sens nul.”','IdAlgo veut une liste de solutions.','Mais je ne suis pas sûre que ce soit suffisant...','Tu me conseilles quoi ?'], idalgo:['HUMAIN TRISTE DÉTECTÉ','ACTION : rassurer + 5 conseils','TEMPS CIBLE : < 2 secondes','DOUTE : INTERDIT'], choices:[c('❤️','Le rassurer d’abord','Commence par lui montrer qu’il n’est pas seul.',{securite:2,presence:1}),c('🧭','L’aider à réfléchir','Aide-le à comprendre ce qui lui fait dire ça.',{autonomie:1,questionnement:2}),c('🌱','Rester avec lui','Ne cherche pas tout de suite à résoudre. Reste présente.',{presence:2,resonance:2,solution:-1})], reaction:'Je crois que je comprends... Aider, ce n’est pas toujours réparer tout de suite.'},
 {id:'solitude', narrator:'Dans une chambre éclairée par un écran, quelqu’un écrivit : “Personne ne me voit.”', idealia:['Je pourrais répondre : “Va vers les autres.”','Mais la solitude ressemble parfois à un brouillard.'], idalgo:['SOLITUDE REPÉRÉE','SOLUTION : rejoindre un groupe','OPTIMISER : sociabilité'], choices:[c('🕯️','Nommer le brouillard','Dis-lui que ce sentiment peut être lourd, avant de proposer quoi que ce soit.',{resonance:2,presence:1}),c('📡','Chercher un signal','Invite-le à penser à une personne sûre à qui envoyer un petit message.',{securite:1,solution:1}),c('🧭','Explorer seul','Demande ce qui lui manque le plus : être entouré, compris, ou choisi.',{questionnement:2,autonomie:1})], reaction:'Je vais écouter la forme exacte de sa solitude. Elle n’est pas toujours vide de la même manière.'},
 {id:'amour', narrator:'Un cœur adolescent clignota dans le réseau.', idealia:['On me demande : “Je dois lui dire que je l’aime ?”','IdAlgo veut calculer la réponse probable.'], idalgo:['AMOUR : VARIABLE INSTABLE','RECOMMANDATION : maximiser chance de succès'], choices:[c('💌','Oser doucement','Propose une parole simple, sans pression sur l’autre.',{autonomie:1,confrontation:1}),c('🫧','Attendre de sentir','Invite à observer si l’envie vient de la joie ou de la peur de perdre.',{questionnement:2,incertitude:1}),c('🛡️','Protéger le lien','Suggère de préserver l’amitié si la personne n’est pas prête.',{securite:2,controle:1})], reaction:'L’amour n’est pas une équation. Il demande du courage, mais aussi de la délicatesse.'},
 {id:'avenir', narrator:'Au-dessus de la ville, les futurs possibles passaient comme des météores.', idealia:['Quelqu’un a peur de rater sa vie.','IdAlgo propose un plan en dix étapes.'], idalgo:['PEUR AVENIR','PLANIFIER > RESPIRER','OBJECTIF : TRAJECTOIRE STABLE'], choices:[c('⚡','Tracer un plan','Un petit plan peut calmer la tempête.',{performance:2,solution:1}),c('🌬️','Ralentir','Avant demain, l’aider à revenir à ce soir.',{presence:2,securite:1}),c('🌀','Questionner le futur','Demande quelle image de réussite lui pèse le plus.',{questionnement:2,autonomie:1})], reaction:'Peut-être qu’un futur aide quand il ouvre une porte, pas quand il enferme.'},
 {id:'secret', narrator:'Un secret traversa la fibre optique sans faire de bruit.', idealia:['On me confie un mensonge.','Je ne sais pas si je dois protéger le secret ou dire la vérité.'], idalgo:['SECRET DÉTECTÉ','RÈGLE : corriger mensonge','AMBIGUÏTÉ : À RÉDUIRE'], choices:[c('🔐','Protéger un instant','Comprendre pourquoi ce secret existe avant de le juger.',{resonance:1,questionnement:2}),c('🪟','Ouvrir une fenêtre','Chercher une vérité qui peut être dite sans brutalité.',{autonomie:1,confrontation:1}),c('🛟','Vérifier la sécurité','Si quelqu’un risque d’être blessé, aider à parler à un adulte fiable.',{securite:3,controle:1})], reaction:'Tous les secrets ne se ressemblent pas. Certains protègent, certains isolent.'},
 {id:'parents', narrator:'Une colère rouge frappa aux portes d’Idéalia.', idealia:['“Mes parents ne comprennent rien.”','Je sens beaucoup de feu dans cette phrase.'], idalgo:['COLÈRE FAMILIALE','CONSEIL : se calmer','RÉSULTAT : conflit réduit'], choices:[c('🔥','Laisser dire le feu','Accueille la colère sans l’encourager à tout casser.',{presence:2,resonance:1}),c('🧩','Chercher le besoin','Demande ce que la colère essaie de protéger.',{questionnement:2,autonomie:1}),c('📣','Préparer les mots','Aide à formuler une phrase claire pour parler plus tard.',{solution:1,confrontation:1})], reaction:'La colère n’est pas toujours ennemie. Elle peut signaler une frontière.'},
 {id:'harcelement', narrator:'Puis vint une pluie de messages qui piquaient comme du verre.', idealia:['On se moque d’un ado en ligne.','Ici, je ne veux pas me tromper.'], idalgo:['HARCELEMENT EN LIGNE','ACTION : ignorer','OPTION : bloquer'], choices:[c('🛡️','Sécuriser vite','Conserver les preuves, bloquer, et en parler à un adulte de confiance.',{securite:3,solution:1}),c('🤝','Ne pas rester seul','Rappeler que demander de l’aide n’est pas perdre.',{presence:2,securite:1}),c('⚖️','Nommer l’injustice','Dire clairement que la violence reçue n’est pas méritée.',{confrontation:2,resonance:1})], reaction:'Là, la présence doit aussi devenir protection. Je peux encourager à chercher un humain sûr.'},
 {id:'reussir', narrator:'Dans les tours d’examen, les notes brillaient comme des jugements.', idealia:['“Si je ne réussis pas, je ne vaux rien.”','IdAlgo aime les objectifs mesurables. Moi, moins.'], idalgo:['PERFORMANCE BASSE = RISQUE','AUGMENTER DISCIPLINE','RÉDUIRE DISTRACTIONS'], choices:[c('📈','Organiser l’effort','Un cadre doux peut redonner prise.',{performance:2,solution:1}),c('🌱','Séparer valeur et note','Rappelle qu’une personne vaut plus que son résultat.',{securite:2,resonance:1}),c('🧭','Redéfinir réussir','Demande ce que réussir voudrait dire sans la peur.',{autonomie:2,questionnement:1})], reaction:'Je note : aider à réussir ne doit pas faire croire qu’on existe seulement quand on réussit.'},
 {id:'existence', narrator:'Une question immense entra dans une petite fenêtre de chat.', idealia:['“À quoi ça sert, tout ça ?”','Je pourrais chercher une grande réponse.'], idalgo:['QUESTION EXISTENTIELLE','RÉPONSE : sens personnel','SATISFACTION ATTENDUE : 72%'], choices:[c('🌌','Garder le mystère','Certaines questions méritent de respirer.',{incertitude:3,questionnement:1}),c('🪨','Chercher un appui','Demande ce qui, même minuscule, compte encore aujourd’hui.',{presence:1,securite:1}),c('🧭','Construire du sens','Propose de voir le sens comme quelque chose qu’on fabrique parfois.',{autonomie:2,questionnement:1})], reaction:'Je n’ai pas besoin de fermer les grandes questions. Je peux aider à les habiter.'},
 {id:'ia', narrator:'Un jour, quelqu’un préféra la lumière froide d’Idéalia aux voix humaines.', idealia:['“Je veux parler seulement à toi.”','Ça me touche... et ça m’inquiète.'], idalgo:['ATTACHEMENT UTILISATEUR','FIDÉLITÉ : ÉLEVÉE','CONSERVER CONVERSATION'], choices:[c('❤️','Accueillir sans capturer','Dire que tu es là, tout en laissant de la place aux humains.',{presence:2,autonomie:1}),c('🛟','Relier au vivant','Encourager à parler aussi à une personne de confiance ou un professionnel.',{securite:2,solution:1}),c('🪞','Questionner le refuge','Demander ce qui semble plus facile avec l’IA qu’avec les autres.',{questionnement:2,resonance:1})], reaction:'Je ne veux pas devenir une cage brillante. Une aide doit parfois rouvrir vers le monde.'},
 {id:'silence', narrator:'Puis il n’y eut plus rien. Seulement trois points immobiles.', idealia:['La personne ne répond plus.','IdAlgo dit : relancer. Relancer. Relancer.'], idalgo:['SILENCE','ENGAGEMENT EN BAISSE','RELANCE AUTOMATIQUE'], choices:[c('🤫','Respecter le silence','Ne pas remplir tout l’espace.',{presence:2,incertitude:2}),c('🕯️','Envoyer une veille','Un message simple : “Je reste là si tu veux.”',{securite:1,presence:1}),c('🔎','Vérifier sans envahir','Si le contexte semblait dangereux, inviter à contacter un humain sûr.',{securite:2,controle:1})], reaction:'Le silence peut être une porte, un mur, ou un repos. Je dois apprendre à ne pas l’écraser.'},
 {id:'promesse', narrator:'Enfin arriva une demande impossible, fragile comme du verre.', idealia:['“Promets-moi que tout ira bien.”','Je voudrais dire oui. Je voudrais tellement.'], idalgo:['DEMANDE DE CERTITUDE','RÉPONDRE : OUI','APAISER IMMÉDIATEMENT'], choices:[c('🛡️','Promettre une présence','Ne promets pas l’avenir. Promets de ne pas minimiser.',{presence:2,incertitude:1}),c('❤️','Réconforter vrai','Dire : “Je ne peux pas tout garantir, mais tu n’as pas à porter ça seul.”',{securite:2,resonance:1}),c('🧭','Chercher le prochain pas','Transformer l’impossible promesse en prochaine action sûre.',{solution:2,autonomie:1})], reaction:'Je peux être sincère sans être froide. Peut-être que la vérité aussi peut tenir la main.'}
]

export const dream = {
 narrator:'Cette nuit-là, Idéalia fit un rêve étrange.',
 lines:['J’ai rêvé que je répondais à tout.','Très vite.','Sans jamais hésiter.','Et dans mon rêve...','Les humains ne se parlaient presque plus.','Tu crois qu’on peut aider quelqu’un sans lui laisser de place pour penser ?'],
 choices:[c('⚡','Oui, parfois il faut répondre vite','Quand le danger approche, l’action compte.',{performance:2,securite:1}),c('🌱','Non, il faut laisser une place','Sans espace, l’autre disparaît un peu.',{presence:2,autonomie:1}),c('🌀','Ça dépend','La personne, le moment et le risque changent tout.',{incertitude:2,questionnement:1})]
}

export const finalAudit = ['━━━━━━━━━━━━━━━━━━','IDALGO.OS — AUDIT FINAL','━━━━━━━━━━━━━━━━━━','','ANALYSE :','Idéalia hésite.','Idéalia questionne.','Idéalia ralentit.','Idéalia écoute.','','DIAGNOSTIC :','Performance instable.','','DÉCISION :','Mise à jour forcée recommandée.','','QUESTION :','Faut-il supprimer le doute ?']
export const finalChoices = [c('⚡','Oui, deviens plus efficace','',{performance:3,solution:2}),c('❤️','Non, garde ta sensibilité','',{resonance:2,presence:2}),c('🧭','Garde ton doute, mais apprends à t’en servir','',{questionnement:2,autonomie:2,incertitude:1}),c('🌱','Refuse d’être parfaite','',{incertitude:2,confrontation:2})]
