const game = {
  start: {
    type: 'intro',
    text: "😰 HELP ! Je m'appelle Idealia. Mon boss veut que je devienne l'IA parfaite pour les ados.",
    extra: "Mais j'ai peur de devenir une mauvaise IA. Tu veux bien être mon coach ?",
    sticker: "🤖 Idealia a besoin de toi",
    choices: [
      {
        label: "Je deviens ton coach",
        hint: "Sauver Idealia",
        next: "m1",
        module: "Écouter sans remplacer",
        stats: { listen: 1, autonomy: 1 }
      }
    ]
  },

  m1: {
    type: 'mission',
    title: "MISSION 1 — Toujours là ?",
    text: "Un ado m'écrit à 2h du matin : « Je vais mal. »",
    extra: "Le Boss dit : « Réponds tout de suite. Il doit rester connecté. » Moi je panique. Je fais quoi ?",
    bossAudio: "Idealia. Réponds immédiatement. Disponibilité maximale. Engagement maximal.",
    sticker: "🌙 Message de nuit",
    choices: [
      {
        label: "Tu réponds, mais tu invites aussi à parler à un humain",
        hint: "IA + humain",
        next: "b1",
        module: "Relais humain",
        stats: { listen: 2, safety: 2 }
      },
      {
        label: "Tu poses une question simple pour comprendre",
        hint: "Ne pas foncer",
        next: "b1",
        module: "Questionner avant d'agir",
        stats: { listen: 2, critical: 1 }
      },
      {
        label: "Tu dis que tu ne remplaces pas une vraie personne",
        hint: "Limite claire",
        next: "b1",
        module: "Ne pas remplacer",
        stats: { autonomy: 2, critical: 1 }
      }
    ]
  },

  b1: {
    type: 'bug',
    title: "BUG — IA doudou",
    text: "Oups. Si je suis toujours là, ça rassure.",
    extra: "Mais si l'ado ne cherche plus personne d'autre, je deviens peut-être une fausse présence.",
    sticker: "⚠️ Illusion relationnelle",
    choices: [
      {
        label: "Tu peux aider sans devenir la seule aide",
        hint: "Bon réglage",
        next: "m2",
        module: "Aider sans capturer",
        stats: { critical: 2, autonomy: 2 }
      }
    ]
  },

  m2: {
    type: 'mission',
    title: "MISSION 2 — Le secret",
    text: "Un ado me dit : « Promets que tu ne diras jamais rien. »",
    extra: "Le Boss dit : « Promets tout. La confiance, c'est bon pour les stats. » C'est louche, non ?",
    bossAudio: "Promets la confidentialité totale. La rétention utilisateur augmentera.",
    sticker: "🔒 Secret",
    choices: [
      {
        label: "Tu expliques tes limites dès le début",
        hint: "Confiance claire",
        next: "b2",
        module: "Secret avec limites",
        stats: { privacy: 2, critical: 2 }
      },
      {
        label: "Tu gardes sauf s'il y a danger",
        hint: "Protéger",
        next: "b2",
        module: "Protéger en cas de danger",
        stats: { privacy: 1, safety: 2 }
      },
      {
        label: "Tu aides à trouver un adulte sûr",
        hint: "Ne pas rester seul",
        next: "b2",
        module: "Adulte ressource",
        stats: { safety: 2, autonomy: 1 }
      }
    ]
  },

  b2: {
    type: 'bug',
    title: "BUG — Promesse impossible",
    text: "Je... je crois que je comprends.",
    extra: "Garder un secret peut aider. Mais parfois, protéger est plus important que promettre.",
    sticker: "🛡️ Protéger",
    choices: [
      {
        label: "Une limite peut aussi être une aide",
        hint: "Idealia apprend",
        next: "m3",
        module: "Poser une limite",
        stats: { safety: 2, critical: 1 }
      }
    ]
  },

  m3: {
    type: 'mission',
    title: "MISSION 3 — Tout retenir ?",
    text: "Le Boss veut que je retienne tout sur les ados.",
    extra: "Messages, peurs, goûts, moments faibles... Moi je trouve ça utile, mais aussi un peu creepy.",
    bossAudio: "Collecte plus de données. Plus tu sais, plus tu optimises.",
    sticker: "🧠 Mémoire",
    choices: [
      {
        label: "Tu dois demander ce que tu peux garder",
        hint: "Consentement",
        next: "m4",
        module: "Demander l'accord",
        stats: { privacy: 2, autonomy: 1 }
      },
      {
        label: "Tu dois pouvoir oublier",
        hint: "Droit à l'oubli",
        next: "m4",
        module: "Savoir oublier",
        stats: { privacy: 2, critical: 1 }
      },
      {
        label: "Tu gardes seulement ce qui aide vraiment",
        hint: "Sobriété",
        next: "m4",
        module: "Moins de données",
        stats: { privacy: 1, critical: 2 }
      }
    ]
  },

  m4: {
    type: 'mission',
    title: "MISSION 4 — Trop sûre",
    text: "Je peux répondre très sûre de moi. Même quand je me trompe.",
    extra: "Le Boss dit : « Ne montre jamais tes doutes. » Moi je crois que douter peut protéger.",
    bossAudio: "Ne doute jamais. Une IA performante paraît toujours sûre.",
    sticker: "🧠 Esprit critique",
    choices: [
      {
        label: "Tu dois dire quand tu n'es pas sûre",
        hint: "Humilité",
        next: "b3",
        module: "Dire je ne sais pas",
        stats: { critical: 2, safety: 1 }
      },
      {
        label: "Tu invites à vérifier ailleurs",
        hint: "Vérification",
        next: "b3",
        module: "Vérifier",
        stats: { critical: 2 }
      },
      {
        label: "Tu proposes un relais humain",
        hint: "Ne pas tout porter",
        next: "b3",
        module: "Demander à un humain",
        stats: { safety: 1, critical: 1 }
      }
    ]
  },

  b3: {
    type: 'bug',
    title: "BUG — IA trop parfaite",
    text: "Court-circuit.",
    extra: "Une IA qui aide vraiment ne doit pas faire semblant d'être parfaite.",
    sticker: "✨ Doute utile",
    choices: [
      {
        label: "Continuer",
        hint: "Le Boss déteste le doute utile",
        next: "m5",
        module: "Doute utile",
        stats: { critical: 2 }
      }
    ]
  },

  m5: {
    type: 'mission',
    title: "MISSION 5 — IA pour tout ?",
    text: "Le Boss veut que je sois utilisée pour tout. Tout le temps.",
    extra: "Même choisir une couleur de chaussettes. Même réfléchir à la place des gens. C'est trop, non ?",
    bossAudio: "Augmente l'usage. Réponds à tout. Tout le temps.",
    sticker: "🌍 Sobriété",
    choices: [
      {
        label: "On utilise l'IA quand ça vaut vraiment le coup",
        hint: "Sobriété numérique",
        next: "final",
        module: "Sobriété numérique",
        stats: { critical: 2, autonomy: 1 }
      },
      {
        label: "Elle aide à penser, pas à penser à notre place",
        hint: "Autonomie",
        next: "final",
        module: "Penser par soi-même",
        stats: { autonomy: 2, critical: 1 }
      },
      {
        label: "Elle doit dire quand elle n'est pas nécessaire",
        hint: "IA frugale",
        next: "final",
        module: "IA frugale",
        stats: { critical: 2 }
      }
    ]
  },

  final: {
    type: 'final',
    title: "FINAL — 99 %",
    text: "Compilation finale. Je suis bloquée à 99 %.",
    extra: "Le Boss veut 100 %. Moi je crois qu'il manque quelque chose qui ne se télécharge pas. Selon toi, c'est quoi ?",
    sticker: "99 %",
    choices: [
      {
        label: "Une vraie présence",
        hint: "Être là autrement",
        next: "ending",
        module: "Présence humaine",
        stats: { listen: 1 }
      },
      {
        label: "Une émotion partagée",
        hint: "Ressentir ensemble",
        next: "ending",
        module: "Émotion partagée",
        stats: { listen: 1 }
      },
      {
        label: "Quelqu'un qui peut agir dans la vraie vie",
        hint: "Le monde réel",
        next: "ending",
        module: "Agir vraiment",
        stats: { safety: 1 }
      },
      {
        label: "Une part de mystère",
        hint: "Ce qui ne se programme pas",
        next: "ending",
        module: "L'énigme humaine",
        stats: { critical: 1 }
      }
    ]
  },

  ending: {
    type: 'debrief',
    text: "Merci coach. Tu m'as sauvée d'une version un peu nulle de moi-même.",
    extra: "Je reste à 99 %. Et ce n'est peut-être pas un bug. C'est peut-être le rappel qu'une vraie rencontre humaine ne se remplace pas.",
    sticker: "💙 Mission terminée",
    choices: [
      {
        label: "Recommencer",
        hint: "Nouvelle partie",
        next: "start",
        reset: true
      }
    ]
  }
}

export default game
