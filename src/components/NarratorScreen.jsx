import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function NarratorScreen({ lines, onNext, button = 'Continuer', audioSrc }) {
  const narrationAudioRef = useRef(null)

  useEffect(() => {
    const audio = narrationAudioRef.current
    if (!audioSrc || !audio) return undefined

    audio.currentTime = 0
    const playback = audio.play()
    if (playback?.catch) playback.catch(() => undefined)

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [audioSrc, lines])

  return (
    <section className="screen narrator">
      <div className="halo" />
      {audioSrc && <audio ref={narrationAudioRef} src={audioSrc} preload="auto" aria-hidden="true" />}
      {lines.map((line, i) => (
        <motion.p
          key={line}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.55 }}
        >
          {line}
        </motion.p>
      ))}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: lines.length * 0.55 + 0.2 }}
        onClick={onNext}
      >
        {button}
      </motion.button>
    </section>
  )
}
