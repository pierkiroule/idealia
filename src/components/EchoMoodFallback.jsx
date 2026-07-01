export default function EchoMoodFallback({ mood, burst = false, audioMotion }) {
  const current = mood || { type: 'doubt', intensity: 0.5 }
  const motion = audioMotion || { level: 0, flux: 0, drift: 0 }
  const intensity = Math.min(1.25, (current.intensity || 0.5) + motion.level * 0.26 + motion.flux * 0.12)

  return (
    <div className={`echoMoodFallback mood-${current.type} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': intensity, '--audio-level': motion.level, '--audio-flux': motion.flux, '--audio-drift': motion.drift }}>
      <div className="echoMoodHalo echoMoodHalo-one" aria-hidden="true" />
      <div className="echoMoodHalo echoMoodHalo-two" aria-hidden="true" />
      <div className="echoMoodHalo echoMoodHalo-three" aria-hidden="true" />
      <div className="echoMoodMorph" aria-label={`Forme organique lumineuse, humeur ${current.type}`}>
        <span className="morphWire morphWire-one" aria-hidden="true" />
        <span className="morphWire morphWire-two" aria-hidden="true" />
        <span className="morphWire morphWire-three" aria-hidden="true" />
        <span className="morphPulse" aria-hidden="true" />
        <span className="morphHeart" aria-hidden="true" />
      </div>
      <div className="morphParticleField" aria-hidden="true" />
      <div className="echoMoodLens" />
    </div>
  )
}
