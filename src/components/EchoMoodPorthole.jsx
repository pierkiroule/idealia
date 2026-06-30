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
  birth: 'La forme filaire s’éveille en pulsation néon.',
  doubt: 'La géométrie hésite et se recompose.',
  sadness: 'Une nappe de points bleus dérive lentement.',
  solitude: 'Le réseau suspend son orbite silencieuse.',
  pressure: 'Les lignes vibrent comme un signal saturé.',
  rebellion: 'Le maillage rompt sa symétrie.',
  hope: 'Un motif lumineux converge au centre.',
  transfer: 'La trame traverse le portail.',
  metamorphosis: 'La forme morphique change de dimension.',
  realia: 'La structure respire en réseau vivant.'
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255]
}

export default function EchoMoodPorthole({ mood, intensity, phase = 'chat', burstKey = 0 }) {
  const canvasRef = useRef(null)
  const [webglOk, setWebglOk] = useState(true)
  const [burst, setBurst] = useState(false)
  const audioMotion = useAmbientAudioMotion()
  const audioMotionRef = useRef(audioMotion)
  audioMotionRef.current = audioMotion
  const current = mood || { type: 'doubt', intensity: 0.55, background: 'server' }
  const baseLevel = Math.min(1.2, intensity ?? current.intensity ?? 0.5)
  const level = Math.min(1.3, baseLevel + audioMotion.level * 0.28 + audioMotion.flux * 0.14)

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
        float morph = sin(u_drift * 2.7 + a_seed.z * 12.0) * cos(t * 0.19 + band * 8.0);
        float turn = 0.23 + u_intensity * 0.38 + bass * 0.8 + flux * 0.35;
        float angle = a_seed.x * 18.8495559 + t * turn + morph * (0.55 + mids);
        float breathe = 0.72 + bass * 0.55 + treble * 0.28 + sin(t * (1.2 + mids * 2.6) + a_seed.x * 31.0 + u_drift) * (0.08 + flux * 0.18);
        float lissajous = sin(angle * (1.4 + mids * 1.6) + t * (0.8 + treble)) * cos(angle * (2.6 + bass) - t * (0.65 + flux));
        float radius = (0.16 + band * (0.65 + bass * 0.35) + lissajous * (0.08 + treble * 0.16) * u_intensity) * breathe;
        vec2 pos = vec2(
          cos(angle + sin(t * (0.55 + flux) + band * 9.0 + u_drift) * (0.45 + treble)) * radius,
          sin(angle * (0.92 + 0.25 * sin(u_drift + treble * 4.0))) * radius * (0.66 + 0.22 * cos(t + band * 6.0) + mids * 0.22)
        );
        pos += vec2(sin(t * (1.8 + treble * 3.4) + a_seed.z * 11.0), cos(t * (1.4 + bass * 3.0) + a_seed.z * 7.0)) * (0.035 + flux * 0.085) * u_intensity;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = 1.4 + 5.6 * u_intensity * (0.28 + band) + flux * 4.0 + treble * 2.2;
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
      const reactiveLevel = Math.min(1.3, baseLevel + motion.level * 0.28 + motion.flux * 0.14)
      gl.uniform1f(intensityUniform, burst ? Math.min(1.35, reactiveLevel + 0.35) : reactiveLevel)
      gl.uniform4f(audioUniform, motion.low, motion.mid, motion.high, motion.flux)
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
    <div className={`echoMoodPorthole mood-${current.type} phase-${phase} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': level, '--audio-level': audioMotion.level, '--audio-flux': audioMotion.flux, '--audio-drift': audioMotion.drift }}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="echoMoodMorph" aria-label={`Forme géométrique filaire néon, humeur ${current.type}`}>
        <span className="morphWire morphWire-one" aria-hidden="true" />
        <span className="morphWire morphWire-two" aria-hidden="true" />
        <span className="morphWire morphWire-three" aria-hidden="true" />
        <span className="morphPulse" aria-hidden="true" />
      </div>
      <div className="echoMoodGlass" />
      <p>{captions[current.type] || 'La forme morphique écoute.'}</p>
    </div>
  )
}
