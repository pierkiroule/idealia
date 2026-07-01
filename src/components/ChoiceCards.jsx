import { motion } from 'framer-motion'

export default function ChoiceCards({ choices, onChoose, selectedChoice }) {
  return (
    <div className="choiceCards">
      {choices.map((choice, index) => {
        const isSelected = selectedChoice?.label === choice.label
        const isDimmed = selectedChoice && !isSelected

        return (
          <motion.button
            className={`choiceCard ${isSelected ? 'isSelected' : ''} ${isDimmed ? 'isDimmed' : ''}`}
            key={choice.label}
            onClick={() => onChoose(choice)}
            whileTap={{ scale: 0.95 }}
            whileHover={selectedChoice ? undefined : { y: -6, scale: 1.025 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{
              opacity: isDimmed ? 0.46 : 1,
              y: isSelected ? -8 : 0,
              scale: isSelected ? 1.06 : 1,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: index * 0.08 }}
            aria-pressed={isSelected}
          >
            <span className="choiceEmoji" aria-hidden="true">{choice.emoji}</span>
            <strong>{choice.label}</strong>
            {choice.text && <small>{choice.text}</small>}
            <i />
            {isSelected && <b className="choicePicked">Ton choix</b>}
          </motion.button>
        )
      })}
    </div>
  )
}
