import { useEffect, useState } from 'react'
import ChoiceCards from './ChoiceCards.jsx'
import EchoMoodPorthole from './EchoMoodPorthole.jsx'
import { speakIdealiaLines } from '../utils/voice.js'
import { playTypeTick, playUiBlip } from '../utils/uiSfx.js'

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function useTyped(lines) {
  const [completed, setCompleted] = useState([])
  const [currentLine, setCurrentLine] = useState('')

  useEffect(() => {
    let cancelled = false

    async function runTyping() {
      setCompleted([])
      setCurrentLine('')

      for (const line of lines) {
        let nextLine = ''

        for (const character of line) {
          if (cancelled) return
          nextLine += character
          setCurrentLine(nextLine)
          if (nextLine.length % 4 === 0) playTypeTick()
          await wait(18)
        }

        if (cancelled) return
        setCompleted(previous => [...previous, line])
        setCurrentLine('')
        await wait(220)
      }
    }

    runTyping()

    return () => {
      cancelled = true
    }
  }, [lines])

  return currentLine ? [...completed, currentLine] : completed
}

export default function IdealiaChat({ lines, onNext, button, choices, onChoose, speakerName = 'Idéalia', mood, moodIntensity, phase = 'chat', burstKey = 0 }) {
  const typedLines = useTyped(lines)
  const avatarIntensity = Math.min(1.15, (moodIntensity ?? mood?.intensity ?? 0.55) + 0.18)

  useEffect(() => speakIdealiaLines(lines), [lines])

  return (
    <section className="screen chat">
      <div className="chatPresence" aria-live="polite">
        <EchoMoodPorthole mood={mood} intensity={avatarIntensity} phase={phase} burstKey={burstKey} />
        <div className="presenceCopy">
          <span>{speakerName}</span>
          <small>hublot projectif · paysage intérieur</small>
        </div>
      </div>

      <div className="chatCard">
        {typedLines.map((line, index) => (
          <p className="bubble" key={`${line}-${index}`}>{line}</p>
        ))}
      </div>

      {choices ? (
        <ChoiceCards choices={choices} onChoose={onChoose} />
      ) : button ? (
        <button onClick={() => { playUiBlip('confirm'); onNext() }}>{button}</button>
      ) : null}
    </section>
  )
}
