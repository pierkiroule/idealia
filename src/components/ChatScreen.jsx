import { useEffect, useMemo, useState } from 'react'
import ChoiceCards from './ChoiceCards.jsx'

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

export default function ChatScreen({ lines, onNext, button, choices, onChoose, voiceOn, setVoiceOn }) {
  const typedLines = useTyped(lines)
  const canSpeak = useMemo(() => typeof window !== 'undefined' && 'speechSynthesis' in window, [])

  useEffect(() => {
    if (!voiceOn || !canSpeak) return undefined

    const utterance = new SpeechSynthesisUtterance(lines.join(' '))
    utterance.lang = 'fr-FR'
    utterance.rate = 0.95

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    return () => window.speechSynthesis.cancel()
  }, [lines, voiceOn, canSpeak])

  return (
    <section className="screen chat">
      <button className="voice" onClick={() => setVoiceOn(!voiceOn)}>
        {voiceOn ? 'Voix activée' : 'Voix coupée'}
      </button>

      <div className="chatCard">
        <div className="avatar">Id</div>
        {typedLines.map((line, index) => (
          <p className="bubble" key={`${line}-${index}`}>{line}</p>
        ))}
      </div>

      {choices ? (
        <ChoiceCards choices={choices} onChoose={onChoose} />
      ) : (
        <button onClick={onNext}>{button}</button>
      )}
    </section>
  )
}
