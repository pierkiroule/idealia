const captions = {
  birth: 'La forme filaire s’éveille en pulsation néon.',
  doubt: 'La géométrie hésite et se recompose.',
  sadness: 'Une nappe de points bleus dérive lentement.',
  solitude: 'Le réseau suspend son orbite silencieuse.',
  pressure: 'Les lignes vibrent comme un signal saturé.',
  rebellion: 'Le maillage rompt sa symétrie.',
  hope: 'Un motif lumineux converge au centre.',
  transfer: 'La trame traverse le portail.',
  metamorphosis: 'La forme morphique change de dimension.',
  realia: 'La structure respire en réseau vivant.'
}

export default function EchoMoodFallback({ mood, burst = false }) {
  const current = mood || { type: 'doubt', intensity: 0.5 }

  return (
    <div className={`echoMoodFallback mood-${current.type} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': current.intensity || 0.5 }}>
      <div className="echoMoodMorph" aria-label={`Forme géométrique filaire néon, humeur ${current.type}`}>
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
