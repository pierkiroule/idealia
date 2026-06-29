import { useEffect, useRef } from 'react'
import { speak, stopSpeech } from '../services/tts.js'

export default function Voice({
  text,
  enabled = true,
  role = 'idealia',
  character,
  emotion = 'neutral',
  onStart,
  onEnd
}) {
  const onStartRef = useRef(onStart)
  const onEndRef = useRef(onEnd)

  useEffect(() => {
    onStartRef.current = onStart
    onEndRef.current = onEnd
  }, [onStart, onEnd])

  useEffect(() => {
    if (!enabled) return undefined

    let cancelled = false
    onStartRef.current?.()

    speak(text, {
      character: character || role,
      emotion
    }).then(() => {
      if (!cancelled) onEndRef.current?.()
    })

    return () => {
      cancelled = true
      stopSpeech()
      onEndRef.current?.()
    }
  }, [text, enabled, role, character, emotion])

  return null
}
