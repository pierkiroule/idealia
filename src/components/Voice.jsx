import { useEffect } from 'react'

function cleanText(text = '') {
  return text
    .replace(/[⚠️✅🎮👋😅😵🤯😭😰📩]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function pickVoice(voices, role) {
  const fr = voices.filter(v => v.lang?.startsWith('fr'))

  if (role === 'boss') {
    return (
      fr.find(v => v.name.toLowerCase().includes('male')) ||
      fr.find(v => v.name.toLowerCase().includes('homme')) ||
      fr[1] ||
      fr[0] ||
      voices[0]
    )
  }

  return (
    fr.find(v => v.name.toLowerCase().includes('female')) ||
    fr.find(v => v.name.toLowerCase().includes('femme')) ||
    fr.find(v => v.name.toLowerCase().includes('google')) ||
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
  useEffect(() => {
    if (!enabled) return
    if (!('speechSynthesis' in window)) return

    window.speechSynthesis.cancel()

    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(cleanText(text))
      const voices = window.speechSynthesis.getVoices()
      const voice = pickVoice(voices, role)

      if (voice) utterance.voice = voice

      utterance.lang = 'fr-FR'

      if (role === 'boss') {
        utterance.rate = 1.22
        utterance.pitch = 0.62
        utterance.volume = 1
      } else {
        utterance.rate = 1.16
        utterance.pitch = 1.38
        utterance.volume = 1
      }

      utterance.onstart = () => onStart?.()
      utterance.onend = () => onEnd?.()
      utterance.onerror = () => onEnd?.()

      window.speechSynthesis.speak(utterance)
    }

    const timer = setTimeout(speak, 60)

    return () => {
      clearTimeout(timer)
      window.speechSynthesis.cancel()
      onEnd?.()
    }
  }, [text, enabled, role])

  return null
}
