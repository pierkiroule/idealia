import { profiles } from '../data/profiles.js'

export const initialScores = {
  presence: 0,
  clarte: 0,
  protection: 0,
  liberte: 0,
  reconnaissance: 0,
  relaisHumain: 0,
  controle: 0,
  evitement: 0
}

export function updateScores(scores, choiceEffects = {}) {
  return Object.keys(initialScores).reduce((next, key) => {
    next[key] = (scores[key] || 0) + (choiceEffects[key] || 0)
    return next
  }, {})
}

export function getFinalProfile(scores) {
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const [primaryKey, primaryValue] = ranked[0]
  const [secondaryKey, secondaryValue] = ranked[1]

  if (primaryValue > 0 && primaryValue - secondaryValue <= 1) {
    const primary = profiles[primaryKey]
    const secondary = profiles[secondaryKey]
    return {
      id: `${primaryKey}-${secondaryKey}`,
      name: `${primary.name} / ${secondary.name}`,
      mirror: `${primary.mirror} ${secondary.mirror}`,
      need: `${primary.need} ${secondary.need}`,
      vigilance: `${primary.vigilance} ${secondary.vigilance}`,
      invitation: `${primary.invitation}`,
      final: `${primary.final} ${secondary.final}`,
      isHybrid: true
    }
  }

  return { id: primaryKey, ...profiles[primaryKey], isHybrid: false }
}
