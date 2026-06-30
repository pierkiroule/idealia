import { motion, useReducedMotion } from 'framer-motion'

function seededPosition(index, burstKey = 0) {
  const seed = (index + 1) * 97 + burstKey * 31
  return {
    left: `${18 + (seed * 17) % 64}%`,
    top: `${16 + (seed * 23) % 62}%`,
    delay: ((seed % 9) / 10),
    rotate: (seed % 38) - 19
  }
}

export default function FloatingMoodEmojis({ emojis = [], burstKey = 0, burst = false }) {
  const reduced = useReducedMotion()
  const items = burst ? Array.from({ length: 8 }, (_, index) => emojis[index % Math.max(1, emojis.length)] || '✨') : emojis

  return (
    <div className="floatingMoodEmojis" aria-hidden="true">
      {items.map((emoji, index) => {
        const position = seededPosition(index, burstKey)
        return (
          <motion.span
            key={`${emoji}-${index}-${burstKey}`}
            style={{ left: position.left, top: position.top }}
            initial={{ opacity: 0, scale: burst ? 0.4 : 0.8, rotate: position.rotate }}
            animate={{
              opacity: burst ? [0, 0.9, 0] : [0.18, 0.5, 0.22],
              scale: burst ? [0.5, 1.45, 0.8] : [0.9, 1.05, 0.95],
              y: reduced ? 0 : burst ? [0, -28, -42] : [0, -8, 5, 0],
              rotate: reduced ? position.rotate : [position.rotate, position.rotate + 8, position.rotate - 6]
            }}
            transition={{ duration: burst ? 1 : reduced ? 10 : 5.8, delay: position.delay, repeat: burst ? 0 : Infinity, ease: 'easeInOut' }}
          >
            {emoji}
          </motion.span>
        )
      })}
    </div>
  )
}
