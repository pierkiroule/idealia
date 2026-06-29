import { motion } from 'framer-motion'

export default function MemoryFragment({ fragment, collected = [], onDone }) {
  if (!fragment) return null
  return (
    <motion.section className="memoryStage" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
      <span>Fragment de mémoire débloqué</span>
      <article className="fragmentCard">
        <strong>{fragment.title}</strong>
        <p>“{fragment.text}”</p>
      </article>
      <div className="fragmentCollection" aria-label="Fragments collectionnés">
        {collected.map(item => <i key={item.id} title={item.title} />)}
      </div>
      <button type="button" className="primaryAction" onClick={onDone}>L’ajouter au cœur-code</button>
    </motion.section>
  )
}
