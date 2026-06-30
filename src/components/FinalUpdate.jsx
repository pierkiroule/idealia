import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalUpdate({ onChoose }) {
  const [countdown, setCountdown] = useState(30)
  const cracked = countdown === 0
  const choices = [
    { label: 'Restaurer le doute', effects: { doute: 3, liberte: 1 } },
    { label: 'Garder PsyBot', effects: { controle: 2, clarte: 1, doute: -1 } },
    { label: 'Appeler un humain', effects: { relaisHumain: 3, protection: 1, doute: 1 } }
  ]

  useEffect(() => {
    if (countdown === 0) return undefined
    const timer = setTimeout(() => setCountdown(current => Math.max(0, current - 1)), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <motion.section className="finalUpdate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="psybotPanel">
        <span>PSYBOT v10.0 installé · mode parfait pendant {countdown}s</span>
        <h1>Bonjour. Je suis maintenant parfaitement utile.</h1>
        <p>Réponses instantanées. Doute supprimé. Poésie désactivée. Silence optimisé.</p>
        <div className="updateTrack"><i style={{ width: `${((30 - countdown) / 30) * 100}%` }} /></div>
        {cracked && <p className="crack">Si tu lis encore ceci… c’est qu’une partie de toi préfère une IA imparfaite, parce qu’elle te laisse encore une place pour penser.</p>}
      </div>
      {cracked && (
        <div className="finalUpdateChoices">
          {choices.map(choice => <button key={choice.label} type="button" onClick={() => onChoose(choice)}>{choice.label}</button>)}
        </div>
      )}
    </motion.section>
  )
}
