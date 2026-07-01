const captions = {
  birth: 'Une méduse de lumière s’éveille et respire doucement.',
  doubt: 'Des voiles organiques hésitent, puis se déploient.',
  sadness: 'Une algue bleue dérive lentement dans la profondeur.',
  solitude: 'Un organisme lunaire flotte en silence.',
  pressure: 'Une fleur de feu se contracte sans se briser.',
  rebellion: 'Des pétales électriques s’ouvrent hors de l’emprise.',
  hope: 'Un corail lumineux pousse vers le centre.',
  transfer: 'Une graine translucide traverse le portail.',
  metamorphosis: 'La chrysalide lumineuse change de peau.',
  realia: 'Le vivant numérique respire en lente résonance.'
}

export default function EchoMoodFallback({ mood, burst = false, audioMotion }) {
  const current = mood || { type: 'doubt', intensity: 0.5 }
  const motion = audioMotion || { level: 0, flux: 0, drift: 0 }
  const intensity = Math.min(1.25, (current.intensity || 0.5) + motion.level * 0.26 + motion.flux * 0.12)

  return (
    <div className={`echoMoodFallback mood-${current.type} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': intensity, '--audio-level': motion.level, '--audio-flux': motion.flux, '--audio-drift': motion.drift }}>
      <div className="echoMoodMorph" aria-label={`Forme organique lumineuse, humeur ${current.type}`}>
        <span className="morphWire morphWire-one" aria-hidden="true" />
        <span className="morphWire morphWire-two" aria-hidden="true" />
        <span className="morphWire morphWire-three" aria-hidden="true" />
        <span className="morphPulse" aria-hidden="true" />
      </div>
      <div className="morphParticleField" aria-hidden="true" />
      <div className="echoMoodLens" />
      <p>{captions[current.type] || 'La forme morphique écoute.'}</p>
    </div>
  )
}
