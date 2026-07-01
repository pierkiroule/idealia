import { prepareTextForTTS } from './ttsDictionary.js'

let idealiaMotionFrame

function stopIdealiaVoiceMotion() {
  if (idealiaMotionFrame) window.clearInterval(idealiaMotionFrame)
  idealiaMotionFrame = undefined
  window.dispatchEvent(new CustomEvent('idealia-voice-motion', { detail: { level: 0, flux: 0, speaking: false } }))
}

function startIdealiaVoiceMotion(text) {
  if (typeof window === 'undefined') return
  stopIdealiaVoiceMotion()

  const prepared = prepareTextForTTS(text)
  const seed = [...prepared].reduce((sum, character) => sum + character.charCodeAt(0), 0)
  let tick = 0

  idealiaMotionFrame = window.setInterval(() => {
    tick += 1
    const vowelPulse = Math.abs(Math.sin(tick * 0.72 + seed * 0.013))
    const breath = Math.abs(Math.sin(tick * 0.19 + seed * 0.007))
    const consonantSpark = Math.abs(Math.sin(tick * 1.37 + seed * 0.021))
    window.dispatchEvent(new CustomEvent('idealia-voice-motion', {
      detail: {
        level: Math.min(1, 0.24 + vowelPulse * 0.48 + breath * 0.22),
        flux: Math.min(1, consonantSpark * 0.62 + vowelPulse * 0.18),
        speaking: true,
      },
    }))
  }, 72)
}

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

export function createIdalgoUtterance(text) {
  const utterance = new SpeechSynthesisUtterance(prepareTextForTTS(text))
  utterance.lang = 'fr-FR'
  utterance.rate = 0.72
  utterance.pitch = 0.48
  utterance.volume = 0.95

  const voices = window.speechSynthesis?.getVoices?.() ?? []
  const preferredVoice = voices.find(voice => /fr/i.test(voice.lang) && /thomas|male|google français|paul|henri/i.test(voice.name))
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
    utterance.onstart = () => startIdealiaVoiceMotion(line)
    utterance.onend = () => {
      stopIdealiaVoiceMotion()
      if (index < queue.length - 1) {
        window.speechSynthesis.pause()
        window.setTimeout(() => window.speechSynthesis.resume(), /[?？]$/.test(line.trim()) ? 360 : 180)
      }
    }
    utterance.onerror = stopIdealiaVoiceMotion
    window.speechSynthesis.speak(utterance)
  })

  return () => {
    stopIdealiaVoiceMotion()
    window.speechSynthesis.cancel()
  }
}

export function speakHaikupheneSequence(idalgoLine, idealiaLines) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined

  const queue = [createIdalgoUtterance(idalgoLine), ...(Array.isArray(idealiaLines) ? idealiaLines : [idealiaLines]).map(createIdealiaUtterance)]
  window.speechSynthesis.cancel()

  queue.forEach((utterance, index) => {
    const isIdealia = index > 0
    if (isIdealia) utterance.onstart = () => startIdealiaVoiceMotion(utterance.text)
    utterance.onend = () => {
      if (isIdealia) stopIdealiaVoiceMotion()
      if (index < queue.length - 1) {
        window.speechSynthesis.pause()
        window.setTimeout(() => window.speechSynthesis.resume(), isIdealia ? 220 : 420)
      }
    }
    utterance.onerror = stopIdealiaVoiceMotion
    window.speechSynthesis.speak(utterance)
  })

  return () => {
    stopIdealiaVoiceMotion()
    window.speechSynthesis.cancel()
  }
}
