import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SecretMessage({ message, onDone }) {
  const [opened, setOpened] = useState(false)
  if (!message) return null
  return (
    <motion.section className="secretMessage" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      {!opened ? (
        <button type="button" onClick={() => setOpened(true)}>🔒 Message secret d’Idealia</button>
      ) : (
        <div>
          <span>Hors surveillance d’IdAlgo</span>
          <p>“{message}”</p>
          <button type="button" className="primaryAction" onClick={onDone}>Garder le secret</button>
        </div>
      )}
    </motion.section>
  )
}
