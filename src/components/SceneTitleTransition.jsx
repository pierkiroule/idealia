import { motion } from 'framer-motion'

const particles = Array.from({ length: 34 }, (_, index) => ({
  id: index,
  angle: (index / 34) * Math.PI * 2,
  distance: 92 + (index % 7) * 19,
  delay: (index % 11) * 0.045,
}))

export default function SceneTitleTransition({ progress, title }) {
  return (
    <div className="sceneTitleTransition" aria-label={`Scène ${progress} — ${title}`}>
      <div className="sceneTitleVignette" aria-hidden="true" />
      <div className="sceneTitleScan" aria-hidden="true" />
      <div className="sceneTitleParticles" aria-hidden="true">
        {particles.map(particle => (
          <i
            key={particle.id}
            style={{
              '--particle-x': `${Math.cos(particle.angle) * particle.distance}px`,
              '--particle-y': `${Math.sin(particle.angle) * particle.distance}px`,
              '--particle-delay': `${particle.delay}s`,
            }}
          />
        ))}
      </div>
      <motion.span
        className="sceneTitleEyebrow"
        initial={{ opacity: 0, letterSpacing: '0.4em' }}
        animate={{ opacity: 1, letterSpacing: '0.18em' }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
      >
        Scène {progress}
      </motion.span>
      <motion.h1
        initial={{ opacity: 0, y: 22, scale: 0.96, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h1>
    </div>
  )
}
