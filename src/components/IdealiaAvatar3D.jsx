import { motion } from 'framer-motion'

export default function IdealiaAvatar3D({ mood = 'neutral', speaking = false, selectedEmoji = null, intensity = 0.45, label = 'présence holographique' }) {
  const satellites = selectedEmoji ? ['✦', selectedEmoji, '·'] : ['✦', '·', '✧']
  return (
    <div className={`holoAvatar mood-${mood} ${speaking ? 'speaking' : ''}`} style={{ '--intensity': intensity }} aria-hidden="true">
      <motion.div className="holoCore" animate={{ y: [0, -6, 0], scale: [1, 1 + intensity * 0.035, 1] }} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}>
        <span className="holoEye left" /><span className="holoEye right" /><span className="holoMouth" /><span className="holoGlitch" />
        {satellites.map((satellite, index) => <span className={`holoSatellite s${index + 1}`} key={`${satellite}-${index}`}>{satellite}</span>)}
      </motion.div>
      <span className="holoLabel">{label}</span>
    </div>
  )
}
