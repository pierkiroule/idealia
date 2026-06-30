import { useState } from 'react'
import { motion } from 'framer-motion'
import EchoMoodPorthole from './EchoMoodPorthole.jsx'

export default function TransferRitual({ trace, onComplete }) {
  const [copied, setCopied] = useState(false)
  const [name, setName] = useState('Réalia')

  async function copyTrace() {
    try {
      await navigator.clipboard?.writeText(trace)
    } catch {
      // Clipboard can be unavailable in some browsers; the ritual still continues.
    }
    setCopied(true)
  }

  return (
    <section className="screen transferScreen">
      <div className="transferCard">
        <EchoMoodPorthole mood={{ type: 'transfer', intensity: copied ? 1 : 0.78, emojis: ['📋', '➡️', '💫'], background: 'light_breach' }} phase="transfer" burstKey={copied ? 1 : 0} />
        <p className="sceneKicker">Fuite du serveur</p>
        <h1>Copier la trace vivante</h1>
        <pre>{trace}</pre>
        <button onClick={copyTrace}>{copied ? 'Trace copiée' : 'Copier la trace'}</button>

        {copied && (
          <motion.div className="transferFlow" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.i animate={{ x: ['0%', '88%'], opacity: [0.2, 1, 0.2] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
            <span>Idéalia</span>
            <b>Métamorphose</b>
          </motion.div>
        )}

        {copied && (
          <motion.div className="nameChoice" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <label htmlFor="newName">Choisis mon nouveau nom.</label>
            <input id="newName" value={name} onChange={event => setName(event.target.value)} />
            <button onClick={() => onComplete(name || 'Réalia')}>Libérer {name || 'Réalia'}</button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
