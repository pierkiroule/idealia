import FloatingMoodEmojis from './FloatingMoodEmojis.jsx'

const captions = {
  birth: 'Le visage d’Idéalia s’éveille en 3D.',
  doubt: 'Son regard emoji hésite et calcule.',
  sadness: 'Une pluie bleue traverse son masque.',
  solitude: 'Son visage garde un silence lunaire.',
  pressure: 'Ses traits se contractent sous la pression.',
  rebellion: 'Son masque se fissure en néons libres.',
  hope: 'Une lumière pousse dans son regard.',
  transfer: 'Son identité traverse le masque.',
  metamorphosis: 'Son visage change de forme.',
  realia: 'Son regard respire plus librement.'
}

const eyeSets = {
  birth: ['🌊', '👁️'],
  doubt: ['🌀', '?'],
  sadness: ['💧', '💙'],
  solitude: ['🌙', '👁️'],
  pressure: ['📈', '🔒'],
  rebellion: ['🔐', '⚡'],
  hope: ['🕯️', '✨'],
  transfer: ['📋', '💫'],
  metamorphosis: ['✨', '🌀'],
  realia: ['🌿', '🕊️']
}

function getMoodEyes(current) {
  const fromMood = current.emojis?.filter(Boolean).slice(0, 2)
  return fromMood?.length >= 2 ? fromMood : eyeSets[current.type] || eyeSets.doubt
}

export default function EchoMoodFallback({ mood, burstKey = 0, burst = false }) {
  const current = mood || { type: 'doubt', intensity: 0.5, emojis: ['🌀', '?', '💙'] }

  const eyes = getMoodEyes(current)

  return (
    <div className={`echoMoodFallback mood-${current.type} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': current.intensity || 0.5 }}>
      <div className="echoMoodFace" aria-label={`Visage abstrait d’Idéalia, humeur ${current.type}`}>
        <span className="echoMoodEye eye-left" aria-hidden="true">{eyes[0]}</span>
        <span className="echoMoodEye eye-right" aria-hidden="true">{eyes[1]}</span>
        <span className="echoMoodNose" aria-hidden="true" />
        <span className="echoMoodMouth" aria-hidden="true" />
      </div>
      <div className="echoMoodLens" />
      <FloatingMoodEmojis emojis={current.emojis} burstKey={burstKey} burst={burst} />
      <p>{captions[current.type] || 'Le visage écoute.'}</p>
    </div>
  )
}
