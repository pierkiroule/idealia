import { motion } from 'framer-motion'

export default function DilemmaPanel({ dilemma, onNext, isLast }) {
  if (!dilemma) return null
  return (
    <motion.section className="dilemmaPanel" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
      <span>Le tiraillement</span>
      <h2>{dilemma.title}</h2>
      <p>{dilemma.text}</p>
      <button type="button" className="primaryAction" onClick={onNext}>{isLast ? 'Découvrir mon reflet' : 'Continuer'}</button>
    </motion.section>
  )
}
