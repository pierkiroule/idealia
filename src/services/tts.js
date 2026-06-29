const KOKORO_MODEL = 'onnx-community/Kokoro-82M-ONNX'

const characterProfiles = {
  idealia: {
    lang: 'fr-FR',
    voiceHints: ['female', 'femme', 'amelie', 'google'],
    kokoroVoice: 'af_sky',
    baseRate: 1.02,
    basePitch: 1.22,
    volume: 1
  },
  boss: {
    lang: 'fr-FR',
    voiceHints: ['male', 'homme', 'thomas'],
    kokoroVoice: 'am_adam',
    baseRate: 1.08,
    basePitch: 0.58,
    volume: 1
  }
}

const emotionProfiles = {
  neutral: { rate: 1, pitch: 1, pause: 1 },
  joy: { rate: 1.04, pitch: 1.08, pause: 0.9 },
  stress: { rate: 1.08, pitch: 1.04, pause: 0.72 },
  laugh: { rate: 0.96, pitch: 1.14, pause: 1.15 },
  angry: { rate: 1.1, pitch: 0.9, pause: 0.65 },
  poem: { rate: 0.86, pitch: 0.98, pause: 1.45 }
}

let kokoroModulePromise
let kokoroEnginePromise
let activeWebUtterance = null
let activeAudio = null
let cancelToken = 0

export function cleanText(text = '') {
  return text
    .replace(/[⚠️✅🎮👋😅😵🤯😭😰📩🤖✨🌙🔒🫣🐙💾🧠⚡📱🔥💬🧭🌍🔋💙🎉]/g, '')
    .replace(/[“”]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function getCharacter(character = 'idealia') {
  return characterProfiles[character] || characterProfiles.idealia
}

function getEmotion(emotion = 'neutral') {
  return emotionProfiles[emotion] || emotionProfiles.neutral
}

function hasBrowserSpeech() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window
}

function canTryKokoro() {
  return typeof window !== 'undefined' && typeof Audio !== 'undefined'
}

function loadKokoroModule() {
  if (!canTryKokoro()) return Promise.resolve(null)

  if (window.KokoroTTS) return Promise.resolve({ KokoroTTS: window.KokoroTTS })
  if (!window.__KOKORO_MODULE_URL__) return Promise.resolve(null)

  if (!kokoroModulePromise) {
    kokoroModulePromise = import(/* @vite-ignore */ window.__KOKORO_MODULE_URL__).catch(() => null)
  }

  return kokoroModulePromise
}

async function getKokoroEngine() {
  if (!canTryKokoro()) return null

  if (!kokoroEnginePromise) {
    kokoroEnginePromise = loadKokoroModule().then(module => {
      if (!module?.KokoroTTS) return null

      return module.KokoroTTS.from_pretrained(KOKORO_MODEL, {
        dtype: 'q8',
        device: 'wasm'
      }).catch(() => null)
    })
  }

  return kokoroEnginePromise
}

function splitIntoSegments(text) {
  return cleanText(text)
    .replace(/([.!?…]+)(\s+)/g, '$1\n')
    .split('\n')
    .map(segment => segment.trim())
    .filter(Boolean)
}

function punctuationPreset(segment) {
  if (/!\?$|\?!$/.test(segment)) return { rate: 0.96, pitch: 1.12, pause: 420 }
  if (/!+$/.test(segment)) return { rate: 1.06, pitch: 1.08, pause: 260 }
  if (/\?+$/.test(segment)) return { rate: 0.94, pitch: 1.1, pause: 360 }
  if (/…$/.test(segment)) return { rate: 0.86, pitch: 0.96, pause: 560 }
  if (/,$/.test(segment)) return { rate: 1, pitch: 1, pause: 170 }
  return { rate: 1, pitch: 1, pause: 280 }
}

function pickVoice(voices, character) {
  const profile = getCharacter(character)
  const fr = voices.filter(voice => voice.lang?.toLowerCase().startsWith('fr'))
  const candidates = fr.length > 0 ? fr : voices

  return (
    profile.voiceHints
      .map(hint => candidates.find(voice => voice.name.toLowerCase().includes(hint)))
      .find(Boolean) ||
    candidates[character === 'boss' ? 1 : 0] ||
    voices[0]
  )
}

function waitForVoices(synth) {
  const voices = synth.getVoices()
  if (voices.length > 0) return Promise.resolve(voices)

  return new Promise(resolve => {
    const timer = window.setTimeout(() => resolve(synth.getVoices()), 350)
    synth.addEventListener?.('voiceschanged', () => {
      window.clearTimeout(timer)
      resolve(synth.getVoices())
    }, { once: true })
  })
}

function pause(ms, token) {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve(token === cancelToken)
    }, ms)
  })
}

async function speakWithWebSpeech(text, options, token) {
  if (!hasBrowserSpeech()) return false

  const synth = window.speechSynthesis
  const profile = getCharacter(options.character)
  const emotion = getEmotion(options.emotion)
  const voices = await waitForVoices(synth)
  const voice = pickVoice(voices, options.character)
  const segments = splitIntoSegments(text)

  for (const segment of segments) {
    if (token !== cancelToken) return false

    const punctuation = punctuationPreset(segment)
    const utterance = new SpeechSynthesisUtterance(segment)
    activeWebUtterance = utterance

    if (voice) utterance.voice = voice
    utterance.lang = profile.lang
    utterance.rate = Math.min(1.4, Math.max(0.55, profile.baseRate * emotion.rate * punctuation.rate))
    utterance.pitch = Math.min(2, Math.max(0.1, profile.basePitch * emotion.pitch * punctuation.pitch))
    utterance.volume = profile.volume

    await new Promise(resolve => {
      utterance.onend = resolve
      utterance.onerror = resolve
      synth.resume?.()
      synth.speak(utterance)
    })

    activeWebUtterance = null
    if (token !== cancelToken) return false

    const shouldContinue = await pause(punctuation.pause * emotion.pause, token)
    if (!shouldContinue) return false
  }

  return true
}

function objectUrlFromAudio(audio) {
  if (audio?.toBlob) return audio.toBlob().then(blob => URL.createObjectURL(blob))
  if (audio?.blob instanceof Blob) return Promise.resolve(URL.createObjectURL(audio.blob))
  if (audio instanceof Blob) return Promise.resolve(URL.createObjectURL(audio))
  if (audio?.url) return Promise.resolve(audio.url)
  return Promise.resolve(null)
}

async function speakWithKokoro(text, options, token) {
  const engine = await getKokoroEngine()
  if (!engine || token !== cancelToken) return false

  const profile = getCharacter(options.character)
  const emotion = getEmotion(options.emotion)
  const kokoroVoice = options.voice || profile.kokoroVoice
  const segments = splitIntoSegments(text)

  for (const segment of segments) {
    if (token !== cancelToken) return false

    const punctuation = punctuationPreset(segment)
    const audio = await engine.generate(segment, {
      voice: kokoroVoice,
      speed: Math.min(1.35, Math.max(0.65, profile.baseRate * emotion.rate * punctuation.rate))
    }).catch(() => null)
    const url = audio ? await objectUrlFromAudio(audio) : null

    if (!url || token !== cancelToken) return false

    await new Promise(resolve => {
      activeAudio = new Audio(url)
      activeAudio.onended = resolve
      activeAudio.onerror = resolve
      activeAudio.play().catch(resolve)
    })

    URL.revokeObjectURL(url)
    activeAudio = null

    const shouldContinue = await pause(punctuation.pause * emotion.pause, token)
    if (!shouldContinue) return false
  }

  return true
}

export function stopSpeech() {
  cancelToken += 1

  if (activeAudio) {
    activeAudio.pause()
    activeAudio.src = ''
    activeAudio = null
  }

  if (activeWebUtterance) {
    activeWebUtterance.onend = null
    activeWebUtterance.onerror = null
    activeWebUtterance = null
  }

  if (hasBrowserSpeech()) window.speechSynthesis.cancel()
}

export async function speak(text, options = {}) {
  const spokenText = cleanText(text)
  if (!spokenText) return { engine: 'none', spoken: false }

  stopSpeech()
  const token = cancelToken
  const normalizedOptions = {
    character: options.character || options.role || 'idealia',
    emotion: options.emotion || 'neutral',
    voice: options.voice
  }

  const usedKokoro = await speakWithKokoro(spokenText, normalizedOptions, token)
  if (usedKokoro) return { engine: 'kokoro', spoken: true }

  const usedWebSpeech = await speakWithWebSpeech(spokenText, normalizedOptions, token)
  return { engine: usedWebSpeech ? 'web-speech' : 'none', spoken: usedWebSpeech }
}
