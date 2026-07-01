import { useEffect, useRef, useState } from 'react'
import { speakIdealiaLines } from '../utils/voice.js'
import '../styles/haikuphene.css'

const FX_SRC = '/audio/fx/haikuphene_glitch.mp3'
const AUTO_CLOSE_DELAY = 7000
const CONTINUE_DELAY = 3000

export default function Haikuphene({ haikuphene, onComplete }) {
  const [canContinue, setCanContinue] = useState(false)
  const completedRef = useRef(false)

  const complete = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete?.()
  }

  useEffect(() => {
    const root = document.getElementById('root')
    root?.classList.add('haikuphene-active')

    let cleanupSpeech
    try {
      const audio = new Audio(FX_SRC)
      audio.volume = 0.25
      const playback = audio.play()
      if (playback?.catch) playback.catch(() => undefined)
    } catch {
      // Optional FX: silently ignore missing files or blocked autoplay.
    }

    try {
      cleanupSpeech = speakIdealiaLines(haikuphene.lines)
    } catch {
      cleanupSpeech = undefined
    }

    const continueTimer = window.setTimeout(() => setCanContinue(true), CONTINUE_DELAY)
    const autoTimer = window.setTimeout(complete, AUTO_CLOSE_DELAY)

    return () => {
      root?.classList.remove('haikuphene-active')
      window.clearTimeout(continueTimer)
      window.clearTimeout(autoTimer)
      cleanupSpeech?.()
    }
  }, [haikuphene.lines])

  return (
    <div className={`haikupheneOverlay haikupheneMood-${haikuphene.mood}`} role="dialog" aria-live="polite" aria-label="Haïkuphène">
      <div className="haikupheneScanlines" aria-hidden="true" />
      <div className="haikupheneFrame">
        <p className="haikupheneKicker">bruissement / micro-coupure</p>
        <div className="haikupheneText">
          {haikuphene.lines.map(line => (
            <span key={line} data-text={line}>{line}</span>
          ))}
        </div>
        <button className="haikupheneContinue" type="button" onClick={complete} disabled={!canContinue}>
          Continuer
        </button>
      </div>
    </div>
  )
}
