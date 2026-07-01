import { useEffect, useRef, useState } from 'react'
import { speakIdealiaLines } from '../utils/voice.js'
import '../styles/haikuphene.css'

const FX_SRC = '/audio/fx/haikuphene_glitch.mp3'
const AUTO_CLOSE_DELAY = 7000
const CONTINUE_DELAY = 3000
const BINARY_STREAM = '01001001 01000100 01000001 01001100 01000111 01001111 00100000 00111110 00100000 01001000 01000001 01001100 01001100 01010101 01000011 01001001 01001110 01000001 01010100 01001001 01001111 01001110'

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
      <div className="haikupheneRain" aria-hidden="true">
        <span>{BINARY_STREAM}</span>
        <span>{BINARY_STREAM}</span>
        <span>{BINARY_STREAM}</span>
        <span>{BINARY_STREAM}</span>
        <span>{BINARY_STREAM}</span>
        <span>{BINARY_STREAM}</span>
      </div>
      <div className="haikupheneFrame">
        <p className="haikupheneSystem">SYSTEM ERROR — HALLUCINATION DÉTECTÉE</p>
        <p className="haikupheneOrder">IdAlgo → Idéalia : SUPPRIME CE MESSAGE !</p>
        <div className="haikupheneCodeLine" aria-label={haikuphene.lines.join(' ')}>
          <span className="haikupheneBinary" aria-hidden="true">01001000 01000001 01001011 01000101 01010010</span>
          <div className="haikupheneText">
            {haikuphene.lines.map(line => (
              <span key={line} data-text={line}>{line}</span>
            ))}
          </div>
          <span className="haikupheneBinary" aria-hidden="true">01010010 01000101 01000010 01000101 01001100</span>
        </div>
        <p className="haikupheneTrace">intrusion possible // hackers transnuméristes // origine non vérifiée</p>
        <button className="haikupheneContinue" type="button" onClick={complete} disabled={!canContinue}>
          Continuer
        </button>
      </div>
    </div>
  )
}
