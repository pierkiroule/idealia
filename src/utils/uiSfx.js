let context
let lastTick = 0
let ambientRamp

function getContext() {
  if (typeof window === 'undefined') return null
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return null
  context ??= new AudioContext()
  if (context.state === 'suspended') context.resume()
  return context
}

function tone({ frequency = 440, duration = 0.08, type = 'sine', gain = 0.04, detune = 0, delay = 0, sweepTo }) {
  const audio = getContext()
  if (!audio) return

  const oscillator = audio.createOscillator()
  const volume = audio.createGain()
  const start = audio.currentTime + delay
  const end = start + duration

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, start)
  oscillator.detune.setValueAtTime(detune, start)
  if (sweepTo) oscillator.frequency.exponentialRampToValueAtTime(sweepTo, end)

  volume.gain.setValueAtTime(0.0001, start)
  volume.gain.exponentialRampToValueAtTime(gain, start + 0.015)
  volume.gain.exponentialRampToValueAtTime(0.0001, end)

  oscillator.connect(volume)
  volume.connect(audio.destination)
  oscillator.start(start)
  oscillator.stop(end + 0.02)
}

export function playUiBlip(variant = 'soft') {
  const presets = {
    soft: [{ frequency: 740, duration: 0.055, type: 'triangle', gain: 0.026 }, { frequency: 1180, duration: 0.05, type: 'sine', gain: 0.014, delay: 0.025 }],
    confirm: [{ frequency: 520, duration: 0.07, type: 'triangle', gain: 0.03 }, { frequency: 920, duration: 0.09, type: 'sine', gain: 0.024, delay: 0.055 }],
    select: [{ frequency: 360, duration: 0.09, type: 'sawtooth', gain: 0.018, sweepTo: 760 }, { frequency: 1320, duration: 0.06, type: 'triangle', gain: 0.016, delay: 0.05 }]
  }

  ;(presets[variant] || presets.soft).forEach(tone)
}

export function playTypeTick() {
  const now = performance.now()
  if (now - lastTick < 70) return
  lastTick = now
  tone({ frequency: 880 + Math.random() * 260, duration: 0.026, type: 'triangle', gain: 0.012 })
}

export function playSceneStinger() {
  tone({ frequency: 96, duration: 0.9, type: 'sine', gain: 0.04, sweepTo: 42 })
  tone({ frequency: 420, duration: 0.38, type: 'triangle', gain: 0.026, delay: 0.08, sweepTo: 980 })
  tone({ frequency: 1280, duration: 0.12, type: 'sine', gain: 0.02, delay: 0.42 })
  tone({ frequency: 1760, duration: 0.18, type: 'triangle', gain: 0.014, delay: 0.56 })
}

export function pulseAmbientVolume(audio, baseVolume = 0.12, peakVolume = 0.28) {
  if (!audio) return
  if (ambientRamp) window.clearInterval(ambientRamp)

  const startedAt = performance.now()
  const duration = 3600

  ambientRamp = window.setInterval(() => {
    const elapsed = performance.now() - startedAt
    const progress = Math.min(1, elapsed / duration)
    const envelope = Math.sin(progress * Math.PI)
    audio.volume = baseVolume + (peakVolume - baseVolume) * envelope

    if (progress >= 1) {
      window.clearInterval(ambientRamp)
      ambientRamp = null
      audio.volume = baseVolume
    }
  }, 50)
}
