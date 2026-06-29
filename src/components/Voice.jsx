import { useEffect, useRef } from 'react'

function cleanText(text = '') {
  return text
    .replace(/[⚠️✅🎮👋😅😵🤯😭😰📩🤖✨🌙🔒🫣🐙💾🧠⚡📱🔥💬🧭🌍🔋💙🎉]/g, '')
    .replace(/[“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function pickVoice(voices, role) {
  const fr = voices.filter(voice => voice.lang?.toLowerCase().startsWith('fr'))

  if (role === 'boss') {
    return (
      fr.find(voice => voice.name.toLowerCase().includes('male')) ||
      fr.find(voice => voice.name.toLowerCase().includes('homme')) ||
      fr.find(voice => voice.name.toLowerCase().includes('thomas')) ||
      fr[1] ||
      fr[0] ||
      voices[0]
    )
  }

  return (
    fr.find(voice => voice.name.toLowerCase().includes('female')) ||
    fr.find(voice => voice.name.toLowerCase().includes('femme')) ||
    fr.find(voice => voice.name.toLowerCase().includes('amelie')) ||
    fr.find(voice => voice.name.toLowerCase().includes('google')) ||
    fr[0] ||
    voices[0]
  )
}

export default function Voice({
  text,
  enabled = true,
  role = 'idealia',
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

    const spokenText = cleanText(text)
    if (!spokenText) {
      onEndRef.current?.()
      return undefined
    }

    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      onEndRef.current?.()
      return undefined
    }

    let cancelled = false
    let utterance
    let completed = false
    const synth = window.speechSynthesis

    const speak = () => {
      if (cancelled) return

      synth.cancel()
      utterance = new SpeechSynthesisUtterance(spokenText)
      const voice = pickVoice(synth.getVoices(), role)

      if (voice) utterance.voice = voice

      utterance.lang = 'fr-FR'

      if (role === 'boss') {
        utterance.rate = 1.08
        utterance.pitch = 0.58
        utterance.volume = 1
      } else {
        utterance.rate = 1.02
        utterance.pitch = 1.24
        utterance.volume = 1
      }

      utterance.onstart = () => onStartRef.current?.()
      utterance.onend = () => {
        completed = true
        onEndRef.current?.()
      }
      utterance.onerror = () => {
        completed = true
        onEndRef.current?.()
      }

      synth.speak(utterance)
    }

    const waitForVoices = () => {
      const voices = synth.getVoices()
      if (voices.length > 0) {
        speak()
        return undefined
      }

      const timer = setTimeout(speak, 350)
      synth.addEventListener?.('voiceschanged', speak, { once: true })

      return () => {
        clearTimeout(timer)
        synth.removeEventListener?.('voiceschanged', speak)
      }
    }

    const cleanupVoices = waitForVoices()

    return () => {
      cancelled = true
      cleanupVoices?.()
      if (utterance) {
        utterance.onstart = null
        utterance.onend = null
        utterance.onerror = null
      }
      synth.cancel()
      if (!completed) onEndRef.current?.()
    }
  }, [text, enabled, role])

  return null
}
