import { useEffect, useRef, useState } from 'react'
import EchoMoodFallback from './EchoMoodFallback.jsx'

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
  const current = mood || { type: 'doubt', intensity: 0.55, background: 'server' }
  const level = Math.min(1.2, intensity ?? current.intensity ?? 0.5)

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
      void main() {
        float t = u_time * 0.001;
        float angle = a_seed.x * 18.8495559 + t * (0.35 + u_intensity * 0.55);
        float band = a_seed.y;
        float audio = 0.78 + 0.22 * sin(t * 6.0 + a_seed.x * 31.0) * u_intensity;
        float lissajous = sin(angle * 2.0 + t * 1.7) * cos(angle * 3.0 - t * 1.2);
        float radius = (0.18 + band * 0.74 + lissajous * 0.08 * u_intensity) * audio;
        vec2 pos = vec2(
          cos(angle + sin(t + band * 9.0) * 0.65) * radius,
          sin(angle * (1.0 + 0.18 * sin(t * 0.7))) * radius * (0.72 + 0.28 * cos(t + band * 6.0))
        );
        pos += vec2(sin(t * 2.4 + a_seed.z * 11.0), cos(t * 2.1 + a_seed.z * 7.0)) * 0.045 * u_intensity;
        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = 1.5 + 5.8 * u_intensity * (0.35 + band);
      }
    `
    const fragmentSource = `
      precision mediump float;
      uniform vec3 u_base;
      uniform vec3 u_accent;
      uniform float u_time;
      uniform float u_intensity;
      void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float alpha = smoothstep(0.5, 0.04, d) * (0.38 + 0.5 * u_intensity);
        vec3 color = mix(u_base, u_accent, 0.5 + 0.5 * sin(u_time * 0.0025 + d * 8.0));
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
      gl.uniform1f(intensityUniform, burst ? Math.min(1.25, level + 0.35) : level)
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
  }, [current.type, level, burst])

  if (!webglOk) return <EchoMoodFallback mood={current} burstKey={burstKey} burst={burst} />

  return (
    <div className={`echoMoodPorthole mood-${current.type} phase-${phase} ${burst ? 'is-bursting' : ''}`} style={{ '--mood-intensity': level }}>
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
