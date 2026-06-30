import { prepareTextForTTS } from './ttsDictionary.js'

export function createIdealiaUtterance(text) {
  const utterance = new SpeechSynthesisUtterance(prepareTextForTTS(text))
  utterance.lang = 'fr-FR'

  const trimmed = text.trim()
  const isQuestion = /[?？]$/.test(trimmed)
  const isSoft = /\.\.\.$/.test(trimmed) || /…$/.test(trimmed)

  utterance.rate = isQuestion ? 0.9 : isSoft ? 0.82 : 0.88
  utterance.pitch = isQuestion ? 1.18 : isSoft ? 0.98 : 1.06
  utterance.volume = 1

  const voices = window.speechSynthesis?.getVoices?.() ?? []
  const preferredVoice = voices.find(voice => /fr[-_]FR/i.test(voice.lang) && /female|amelie|audrey|hortense|thomas|google français/i.test(voice.name))
    ?? voices.find(voice => /^fr/i.test(voice.lang))

  if (preferredVoice) utterance.voice = preferredVoice

  return utterance
}

export function speakIdealiaLines(lines) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined

  const queue = Array.isArray(lines) ? lines : [lines]
  window.speechSynthesis.cancel()

  queue.forEach((line, index) => {
    const utterance = createIdealiaUtterance(line)
    utterance.onend = () => {
      if (index < queue.length - 1) {
        window.speechSynthesis.pause()
        window.setTimeout(() => window.speechSynthesis.resume(), /[?？]$/.test(line.trim()) ? 360 : 180)
      }
    }
    window.speechSynthesis.speak(utterance)
  })

  return () => window.speechSynthesis.cancel()
}
