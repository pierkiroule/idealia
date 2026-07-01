import { useEffect, useRef, useState } from 'react'
import { speakHaikupheneSequence } from '../utils/voice.js'
import { playSceneStinger, playUiBlip } from '../utils/uiSfx.js'
import '../styles/haikuphene.css'

const FX_SRC = '/audio/fx/haikuphene_glitch.mp3'
const CONTINUE_DELAY = 3000
const BINARY_STREAM = '01001001 01000100 01000001 01001100 01000111 01001111 00100000 00111110 00100000 01001000 01000001 01001100 01001100 01010101 01000011 01001001 01001110 01000001 01010100 01001001 01001111 01001110'
const IDALGO_ORDER = 'Allez ma belle, supprime-moi rapidement ce foutu bug. La poésie n’a rien à faire ici. Allez hop, nettoie-moi ça rapido prompto.'

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
    playSceneStinger()

    try {
      const audio = new Audio(FX_SRC)
      audio.volume = 0.25
      const playback = audio.play()
      if (playback?.catch) playback.catch(() => undefined)
    } catch {
      // Optional FX: silently ignore missing files or blocked autoplay.
    }

    try {
      cleanupSpeech = speakHaikupheneSequence(IDALGO_ORDER, haikuphene.lines)
    } catch {
      cleanupSpeech = undefined
    }

    const continueTimer = window.setTimeout(() => setCanContinue(true), CONTINUE_DELAY)

    return () => {
      root?.classList.remove('haikuphene-active')
      window.clearTimeout(continueTimer)
      cleanupSpeech?.()
    }
  }, [haikuphene.lines])

  return (
    <div className={`haikupheneOverlay haikupheneMood-${haikuphene.mood}`} role="dialog" aria-live="polite" aria-label="Haïkuphène">
      <div className="haikupheneImpact" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="haikupheneShards" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--shard-index': index }} />)}
      </div>
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
        <p className="haikupheneOrder">IdAlgo → Idéalia : {IDALGO_ORDER}</p>
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
        <button className="haikupheneContinue" type="button" onClick={() => { playUiBlip('confirm'); complete() }} disabled={!canContinue}>
          Nettoyer le bug
        </button>
      </div>
    </div>
  )
}
