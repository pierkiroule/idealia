import { motion } from 'framer-motion'

const objectIcon = {
  plume: '✒', lampe: '◐', graine: '✧', clé: '⌁', boussole: '⌖', miroir: '◇', nid: '◌'
}

export default function DreamSequence({ dream, onChoose }) {
  if (!dream) return null
  return (
    <motion.section className="dreamSequence" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <span>Rêve d’Idealia</span>
      <h1>{dream.title}</h1>
      <p>{dream.text}</p>
      <div className="dreamObjects">
        {dream.choices.map((choice, index) => (
          <motion.button key={`${dream.id}-${choice.object}-${index}`} type="button" onClick={() => onChoose(choice)} whileHover={{ y: -6, rotate: index - 1 }} whileTap={{ scale: 0.97 }}>
            <i>{objectIcon[choice.object]}</i>
            <strong>{choice.label}</strong>
            <small>{choice.description}</small>
          </motion.button>
        ))}
      </div>
    </motion.section>
  )
}
