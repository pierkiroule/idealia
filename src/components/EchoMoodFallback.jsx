import FloatingMoodEmojis from './FloatingMoodEmojis.jsx'

const captions = {
  birth: 'Le hublot s’éveille doucement.',
  doubt: 'Le hublot semble hésiter.',
  sadness: 'Une pluie bleue traverse la vitre.',
  solitude: 'Le hublot garde un espace vide.',
  pressure: 'Le hublot se contracte.',
  rebellion: 'Des fissures roses cherchent l’air.',
  hope: 'Une lumière pousse derrière la vitre.',
  transfer: 'La trace commence à circuler.',
  metamorphosis: 'Quelque chose change de forme.',
  realia: 'Le hublot respire plus librement.'
}

export default function EchoMoodFallback({ mood, burstKey = 0, burst = false }) {
  const current = mood || { type: 'doubt', intensity: 0.5, emojis: ['🌀', '?', '💙'] }

  return (
    <div className={`echoMoodFallback mood-${current.type}`} style={{ '--mood-intensity': current.intensity || 0.5 }}>
      <div className="echoMoodLens" />
      <FloatingMoodEmojis emojis={current.emojis} burstKey={burstKey} burst={burst} />
      <p>{captions[current.type] || 'Le hublot écoute.'}</p>
    </div>
  )
}
