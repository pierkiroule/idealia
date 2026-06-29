import { motion } from 'framer-motion'

export default function ChoiceButton({ choice, index, onChoose }) {
  return (
    <motion.button
      type="button"
      className="choiceButton"
      onClick={() => onChoose(index)}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <span>0{index + 1}</span>
      {choice.label}
    </motion.button>
  )
}
