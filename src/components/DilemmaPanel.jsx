import { motion } from 'framer-motion'

export default function DilemmaPanel({ dilemma, reaction, onNext }) {
  if (!dilemma) return null
  return (
    <motion.section className="dilemmaPanel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <span>Le tiraillement</span>
      <h2>{dilemma.title}</h2>
      <p>{dilemma.text}</p>
      {reaction && <p className="reactionLine">Idealia : “{reaction}”</p>}
      <button type="button" className="primaryAction" onClick={onNext}>Continuer la réparation</button>
    </motion.section>
  )
}
