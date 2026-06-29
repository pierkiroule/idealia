import { motion } from 'framer-motion'

export default function IdealiaAvatar({ speaker = 'idealia', final = false }) {
  const isIdAlgo = speaker === 'idalgo'
  return (
    <div className={`avatarShell ${isIdAlgo ? 'idAlgoShell' : ''} ${final ? 'finalShell' : ''}`} aria-hidden="true">
      <motion.div
        className="avatarHalo"
        animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55], rotate: final ? 360 : 0 }}
        transition={{ duration: final ? 18 : 3.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="avatarCore"
        animate={isIdAlgo ? { x: [0, -2, 3, 0], filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] } : { y: [0, -6, 0] }}
        transition={{ duration: isIdAlgo ? 0.45 : 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="avatarEye" />
        <span className="avatarEye" />
        <i />
      </motion.div>
    </div>
  )
}
