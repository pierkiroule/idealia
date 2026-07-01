import { useEffect, useRef, useState } from 'react'
import EchoMoodFallback from './EchoMoodFallback.jsx'
import { useAmbientAudioMotion } from '../utils/ambientAudio.js'

const colors = {
  birth: ['#4cc9f0', '#bde0fe'],
  doubt: ['#3a0ca3', '#7209b7'],
  sadness: ['#1d4ed8', '#93c5fd'],
  solitude: ['#0f172a', '#a5b4fc'],
  pressure: ['#ef4444', '#f59e0b'],
  rebellion: ['#ec4899', '#22d3ee'],
  hope: ['#22c55e', '#bef264'],
  transfer: ['#06b6d4', '#f0abfc'],
  metamorphosis: ['#facc15', '#38bdf8'],
  realia: ['#10b981', '#fef3c7']
}

const captions = {
  birth: 'Une méduse de lumière s’éveille et respire doucement.',
  doubt: 'Des voiles organiques hésitent, puis se déploient.',
  sadness: 'Une algue bleue dérive lentement dans la profondeur.',
  solitude: 'Un organisme lunaire flotte en silence.',
  pressure: 'Une fleur de feu se contracte sans se briser.',
  rebellion: 'Des pétales électriques s’ouvrent hors de l’emprise.',
  hope: 'Un corail lumineux pousse vers le centre.',
  transfer: 'Une graine translucide traverse le portail.',
  metamorphosis: 'La chrysalide lumineuse change de peau.',
  realia: 'Le vivant numérique respire en lente résonance.'
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255]
}

export default function EchoMoodPorthole({ mood, intensity, phase = 'chat', burstKey = 0 }) {
  const canvasRef = useRef(null)
  const [webglOk, setWebglOk] = useState(true)
  const [burst, setBurst] = useState(false)
  const [voiceMotion, setVoiceMotion] = useState({ level: 0, flux: 0, speaking: false })
  const voiceMotionRef = useRef(voiceMotion)
  voiceMotionRef.current = voiceMotion
  const audioMotion = useAmbientAudioMotion()
  const audioMotionRef = useRef(audioMotion)
  audioMotionRef.current = audioMotion
  const current = mood || { type: 'doubt', intensity: 0.55, background: 'server' }
  const baseLevel = Math.min(1.2, intensity ?? current.intensity ?? 0.5)
  const level = Math.min(1.3, baseLevel + audioMotion.level * 0.18 + audioMotion.flux * 0.1 + voiceMotion.level * 0.34 + voiceMotion.flux * 0.16)

  useEffect(() => {
    function syncVoiceMotion(event) {
      setVoiceMotion(event.detail || { level: 0, flux: 0, speaking: false })
    }

    window.addEventListener('idealia-voice-motion', syncVoiceMotion)
    return () => window.removeEventListener('idealia-voice-motion', syncVoiceMotion)
  }, [])

  useEffect(() => {
    if (!burstKey) return undefined
    setBurst(true)
    const timeout = window.setTimeout(() => setBurst(false), 950)
    return () => window.clearTimeout(timeout)
  }, [burstKey])

  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas?.getContext('webgl', { alpha: true, antialias: true })
    if (!canvas || !gl) {
      setWebglOk(false)
      return undefined
    }

    const vertexSource = `
      attribute vec3 a_seed;
      uniform float u_time;
      uniform float u_intensity;
      uniform vec4 u_audio;
      uniform float u_drift;
      void main() {
        float t = u_time * 0.001;
        float band = a_seed.y;
        float bass = u_audio.x;
        float mids = u_audio.y;
        float treble = u_audio.z;
        float flux = u_audio.w;
        float slow = t * (0.105 + bass * 0.11 + flux * 0.06);
        float petal = sin(a_seed.x * 37.6991 + slow + u_drift * 0.8);
        float tide = sin(a_seed.z * 19.0 + slow * 1.7) * cos(a_seed.y * 11.0 - slow * 1.15);
        float angle = a_seed.x * 6.2831853 + tide * (0.78 + mids * 0.34) + slow * 0.38;
        float breathe = 0.78 + bass * 0.26 + sin(slow * 2.2 + a_seed.x * 9.0 + u_drift) * (0.09 + flux * 0.08);
        float radius = (0.12 + band * (0.62 + bass * 0.16) + petal * (0.11 + treble * 0.05) + tide * 0.08) * breathe;
        vec2 pos = vec2(
          cos(angle + sin(slow + band * 7.0) * 0.42) * radius,
          sin(angle + cos(slow * 1.2 + a_seed.z * 5.0) * 0.35) * radius * (0.82 + 0.12 * cos(slow + band * 6.0))
        );
        pos += vec2(sin(slow * 2.4 + a_seed.z * 11.0), cos(slow * 1.9 + a_seed.z * 7.0)) * (0.025 + flux * 0.04) * u_intensity;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = 2.2 + 7.8 * u_intensity * (0.32 + band) + flux * 1.8 + treble * 1.1;
      }
    `
    const fragmentSource = `
      precision mediump float;
      uniform vec3 u_base;
      uniform vec3 u_accent;
      uniform float u_time;
      uniform float u_intensity;
      uniform vec4 u_audio;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.04, d) * (0.34 + 0.42 * u_intensity + u_audio.w * 0.36);
        vec3 color = mix(u_base, u_accent, 0.5 + 0.5 * sin(u_time * (0.0018 + u_audio.z * 0.004) + d * (7.0 + u_audio.y * 9.0)));
        gl_FragColor = vec4(color, alpha);
      }
    `

    function shader(type, source) {
      const result = gl.createShader(type)
      gl.shaderSource(result, source)
      gl.compileShader(result)
      return result
    }

    const program = gl.createProgram()
    gl.attachShader(program, shader(gl.VERTEX_SHADER, vertexSource))
    gl.attachShader(program, shader(gl.FRAGMENT_SHADER, fragmentSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const particleCount = 520
    const seeds = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      seeds[index * 3] = index / particleCount
      seeds[index * 3 + 1] = ((index * 37) % particleCount) / particleCount
      seeds[index * 3 + 2] = ((index * 91) % particleCount) / particleCount
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    const seed = gl.getAttribLocation(program, 'a_seed')
    gl.enableVertexAttribArray(seed)
    gl.vertexAttribPointer(seed, 3, gl.FLOAT, false, 0, 0)

    const timeUniform = gl.getUniformLocation(program, 'u_time')
    const intensityUniform = gl.getUniformLocation(program, 'u_intensity')
    const audioUniform = gl.getUniformLocation(program, 'u_audio')
    const driftUniform = gl.getUniformLocation(program, 'u_drift')
    const baseUniform = gl.getUniformLocation(program, 'u_base')
    const accentUniform = gl.getUniformLocation(program, 'u_accent')
    let frame

    function resize() {
      const size = canvas.clientWidth * Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = size
      canvas.height = size
      gl.viewport(0, 0, size, size)
    }

    function render(time) {
      const [base, accent] = colors[current.type] || colors.doubt
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(timeUniform, time)
      const motion = audioMotionRef.current
      const voice = voiceMotionRef.current
      const reactiveLevel = Math.min(1.3, baseLevel + motion.level * 0.18 + motion.flux * 0.1 + voice.level * 0.34 + voice.flux * 0.16)
      gl.uniform1f(intensityUniform, burst ? Math.min(1.35, reactiveLevel + 0.35) : reactiveLevel)
      gl.uniform4f(audioUniform, Math.max(motion.low, voice.level * 0.7), Math.max(motion.mid, voice.level), Math.max(motion.high, voice.flux), Math.max(motion.flux, voice.flux))
      gl.uniform1f(driftUniform, motion.drift)
      gl.uniform3fv(baseUniform, hexToRgb(base))
      gl.uniform3fv(accentUniform, hexToRgb(accent))
      gl.drawArrays(gl.POINTS, 0, particleCount)
      frame = requestAnimationFrame(render)
    }

    resize()
    render(0)
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [current.type, baseLevel, burst])

  if (!webglOk) return <EchoMoodFallback mood={current} burstKey={burstKey} burst={burst} audioMotion={audioMotion} />

  return (
    <div className={`echoMoodPorthole mood-${current.type} phase-${phase} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': level, '--audio-level': Math.max(audioMotion.level, voiceMotion.level), '--audio-flux': Math.max(audioMotion.flux, voiceMotion.flux), '--audio-drift': audioMotion.drift, '--voice-level': voiceMotion.level, '--voice-flux': voiceMotion.flux }}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="echoMoodHalo echoMoodHalo-one" aria-hidden="true" />
      <div className="echoMoodHalo echoMoodHalo-two" aria-hidden="true" />
      <div className="echoMoodHalo echoMoodHalo-three" aria-hidden="true" />
      <div className="echoMoodMorph" aria-label={`Forme organique lumineuse, humeur ${current.type}`}>
        <span className="morphWire morphWire-one" aria-hidden="true" />
        <span className="morphWire morphWire-two" aria-hidden="true" />
        <span className="morphWire morphWire-three" aria-hidden="true" />
        <span className="morphPulse" aria-hidden="true" />
        <span className="morphHeart" aria-hidden="true" />
      </div>
      <div className="echoMoodGlass" />
      <p>{captions[current.type] || 'La forme morphique écoute.'}</p>
    </div>
  )
}
