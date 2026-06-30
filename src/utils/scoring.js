export const initialScores = {
  securite: 0,
  autonomie: 0,
  resonance: 0,
  performance: 0,
  confrontation: 0,
  questionnement: 0,
  controle: 0,
  incertitude: 0,
  presence: 0,
  solution: 0,
  confiance: 0,
  liberation: 0
}

export function applyWeights(scores, weights = {}) {
  return Object.fromEntries(
    Object.entries(initialScores).map(([key]) => [key, (scores[key] || 0) + (weights[key] || 0)])
  )
}

export function dominant(scores, limit = 4) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key)
}

const phrases = {
  presence: 'Tu as souvent choisi de rester près de la personne avant de chercher la phrase parfaite.',
  autonomie: 'Tu as souvent aidé Idéalia à laisser l’autre choisir son chemin, au lieu de décider à sa place.',
  securite: 'Tu as souvent pensé d’abord à protéger, rassurer et chercher un adulte fiable quand la situation pouvait devenir trop lourde.',
  questionnement: 'Tu as souvent préféré poser une question claire plutôt que fermer trop vite la conversation avec une solution.',
  incertitude: 'Tu as accepté que certaines situations n’aient pas de réponse simple dès la première minute.',
  performance: 'Tu as parfois choisi l’action rapide et concrète, surtout quand il fallait éviter que la personne reste seule avec son problème.',
  resonance: 'Tu as souvent demandé à Idéalia d’écouter ce qui se cache derrière les mots : honte, peur, colère ou besoin d’être vu.',
  confrontation: 'Tu as parfois choisi de nommer franchement ce qui ne va pas, sans humilier ni attaquer.',
  controle: 'Tu as cherché des repères quand la situation semblait confuse, pour éviter de répondre au hasard.',
  solution: 'Tu as parfois transformé une émotion compliquée en petit prochain pas possible.',
  confiance: 'Tu as parfois choisi de faire confiance au rythme de l’autre plutôt que de remplir chaque silence.',
  liberation: 'Tu as aidé Idéalia à imaginer une sortie de l’emprise et une métamorphose vers Réalia.'
}

export function mirrorPhrases(scores) {
  return dominant(scores, 4).map(key => phrases[key])
}

export function axes(scores) {
  return [
    {
      label: 'Réconfort ↔ Autonomie',
      left: 'Réconfort',
      right: 'Autonomie',
      value: balance(scores.securite + scores.resonance, scores.autonomie)
    },
    {
      label: 'Réponse ↔ Question',
      left: 'Réponse',
      right: 'Question',
      value: balance(scores.solution, scores.questionnement)
    },
    {
      label: 'Performance ↔ Présence',
      left: 'Performance',
      right: 'Présence',
      value: balance(scores.performance, scores.presence)
    },
    {
      label: 'Contrôle ↔ Confiance',
      left: 'Contrôle',
      right: 'Confiance',
      value: balance(scores.controle, scores.resonance + scores.autonomie)
    },
    {
      label: 'Certitude ↔ Incertitude',
      left: 'Certitude',
      right: 'Incertitude',
      value: balance(scores.solution + scores.controle, scores.incertitude)
    }
  ]
}

function balance(left = 0, right = 0) {
  const total = Math.max(1, Math.abs(left) + Math.abs(right))
  return Math.round(50 + ((right - left) / total) * 45)
}
