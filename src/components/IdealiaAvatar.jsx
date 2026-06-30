import { motion } from 'framer-motion'

export default function IdealiaAvatar({ speaking = false, variant = 'idealia' }) {
  const isRealia = variant === 'realia'

  return (
    <div
      className={`avatarShell ${speaking ? 'isSpeaking' : ''} ${isRealia ? 'realiaShell' : ''}`}
      aria-label={isRealia ? 'Présence organique de Réalia' : 'Présence abstraite d’Idéalia'}
      role="img"
    >
      <motion.div
        className="avatarHaloRing"
        animate={{ scale: speaking ? [1, 1.08, 0.98, 1.04] : [1, 1.025, 1], rotate: isRealia ? 360 : -360 }}
        transition={{ duration: speaking ? 1.4 : 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="avatarFace"
        animate={{ y: speaking ? [0, -3, 2, 0] : [0, -2, 0] }}
        transition={{ duration: speaking ? 1.1 : 4.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.span className="avatarBrow left" animate={{ rotate: speaking ? [-12, -28, -8] : [-10, -15, -10] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.span className="avatarBrow right" animate={{ rotate: speaking ? [12, 28, 8] : [10, 15, 10] }} transition={{ duration: 1.2, repeat: Infinity }} />
        <motion.span className="avatarEye" animate={{ scaleY: speaking ? [0.7, 1.25, 0.8] : [1, 0.82, 1] }} transition={{ duration: speaking ? 0.8 : 3.2, repeat: Infinity }} />
        <motion.span className="avatarEye" animate={{ scaleY: speaking ? [0.8, 1.2, 0.7] : [1, 0.82, 1] }} transition={{ duration: speaking ? 0.86 : 3.2, repeat: Infinity }} />
        <motion.i className="avatarMouth" animate={{ scaleX: speaking ? [0.7, 1.25, 0.9] : [1, 0.86, 1], scaleY: speaking ? [0.8, 1.8, 1] : [1, 0.7, 1] }} transition={{ duration: speaking ? 0.55 : 2.8, repeat: Infinity }} />
      </motion.div>
      <b className="particle p1" /><b className="particle p2" /><b className="particle p3" />
      <span className="avatarSignal">{isRealia ? 'Réalia' : speaking ? 'voix vivante' : 'présence'}</span>
    </div>
  )
}
