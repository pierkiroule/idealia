export function getHeartCodeState(scores, sceneMood = 'stable', heartShift = {}) {
  const resonance = (scores.presence || 0) + (scores.reconnaissance || 0) + (scores.relaisHumain || 0) + (heartShift.resonance || 0)
  const lucidity = (scores.clarte || 0) + (scores.doute || 0) + (scores.liberte || 0)
  const friction = (scores.controle || 0) + (scores.evitement || 0) + (heartShift.glitch || 0)
  const creativity = (scores.creativite || 0) + (heartShift.particles || 0)

  if (sceneMood === 'fragmentee' || friction - resonance >= 4) return { label: 'Fragmentée', className: 'fragmentee', intensity: 74 }
  if (sceneMood === 'trouble' || friction >= lucidity + 2) return { label: 'Trouble', className: 'trouble', intensity: 48 }
  if (sceneMood === 'lucide' || lucidity >= resonance + 3) return { label: 'Lucide', className: 'lucide', intensity: 64 }
  if (sceneMood === 'resonante' || resonance + creativity >= 7) return { label: 'Résonante', className: 'resonante', intensity: 86 }
  return { label: 'Stable', className: 'stable', intensity: 56 }
}

export function mergeEffects(currentShift = {}, nextShift = {}) {
  return {
    resonance: (currentShift.resonance || 0) + (nextShift.resonance || 0),
    glitch: (currentShift.glitch || 0) + (nextShift.glitch || 0),
    particles: (currentShift.particles || 0) + (nextShift.particles || 0)
  }
}
