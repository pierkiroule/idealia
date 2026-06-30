export const initialScores = {
  securite: 0,
  autonomie: 0,
  presence: 0,
  questionnement: 0,
  resonance: 0,
  performance: 0,
  incertitude: 0,
  confrontation: 0
}

const mirrorByDimension = {
  presence: 'Tu as souvent orienté Idéalia vers la présence plutôt que vers la solution immédiate.',
  securite: 'Tu as souvent privilégié le réconfort, la protection et le besoin de ne pas se sentir seul.',
  autonomie: 'Tu as souvent choisi une aide qui ne garde pas l’autre prisonnier, mais l’aide à retrouver sa boussole.',
  questionnement: 'Tu as montré qu’une bonne aide ne donne pas seulement des réponses : elle ouvre aussi des questions.',
  incertitude: 'Tu as accepté qu’une part d’incertitude reste vivante dans toute relation d’aide.',
  performance: 'Tu as parfois choisi l’efficacité et l’action claire lorsque la situation semblait urgente.',
  resonance: 'Tu as souvent cherché une aide qui relie, transforme et laisse quelque chose résonner.',
  confrontation: 'Tu as parfois choisi une aide qui ose poser une limite ou dire une vérité difficile.'
}

export function applyWeights(scores, weights = {}) {
  return Object.fromEntries(
    Object.entries(initialScores).map(([key]) => [key, (scores[key] || 0) + (weights[key] || 0)])
  )
}

export function dominant(scores, limit = 3) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key]) => key)
}

export function mirrorPhrases(scores) {
  return dominant(scores, 3).map(key => mirrorByDimension[key]).filter(Boolean)
}

export function axes(scores) {
  return [
    {
      label: 'Réconfort ↔ Autonomie',
      left: 'Réconfort',
      right: 'Autonomie',
      value: balance(scores.securite + scores.presence, scores.autonomie)
    },
    {
      label: 'Réponse ↔ Question',
      left: 'Réponse',
      right: 'Question',
      value: balance(scores.performance + scores.securite, scores.questionnement)
    },
    {
      label: 'Performance ↔ Présence',
      left: 'Performance',
      right: 'Présence',
      value: balance(scores.performance, scores.presence + scores.resonance)
    },
    {
      label: 'Captation ↔ Libération',
      left: 'Captation',
      right: 'Libération',
      value: balance(scores.performance, scores.autonomie + scores.resonance + scores.confrontation)
    },
    {
      label: 'Certitude ↔ Incertitude',
      left: 'Certitude',
      right: 'Incertitude',
      value: balance(scores.securite + scores.performance, scores.incertitude + scores.questionnement)
    }
  ]
}

function balance(left = 0, right = 0) {
  const total = Math.max(1, Math.abs(left) + Math.abs(right))
  return Math.round(50 + ((right - left) / total) * 45)
}
