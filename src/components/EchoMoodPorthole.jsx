import { useEffect, useRef, useState } from 'react'
import EchoMoodFallback from './EchoMoodFallback.jsx'
import FloatingMoodEmojis from './FloatingMoodEmojis.jsx'

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
  doubt: 'Le hublot semble hésiter.',
  pressure: 'Le hublot se contracte.',
  hope: 'Une lumière pousse derrière la vitre.',
  metamorphosis: 'Quelque chose change de forme.',
  realia: 'Le hublot respire plus librement.'
}

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255]
}

export default function EchoMoodPorthole({ mood, intensity, phase = 'chat', burstKey = 0 }) {
  const canvasRef = useRef(null)
  const [webglOk, setWebglOk] = useState(true)
  const [burst, setBurst] = useState(false)
  const current = mood || { type: 'doubt', intensity: 0.55, emojis: ['🌀', '?', '💙'], background: 'server' }
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
      attribute vec2 a_position;
      uniform float u_time;
      uniform float u_intensity;
      void main() {
        float pulse = sin(u_time * 0.0018 + a_position.x * 5.0) * 0.035 * u_intensity;
        gl_Position = vec4(a_position.x + pulse, a_position.y + pulse, 0.0, 1.0);
        gl_PointSize = 3.0 + 8.0 * u_intensity * (0.5 + fract(a_position.x * 9.17));
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
        float alpha = smoothstep(0.5, 0.08, d) * (0.45 + 0.45 * u_intensity);
        vec3 color = mix(u_base, u_accent, 0.5 + 0.5 * sin(u_time * 0.002));
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

    const particleCount = 180
    const positions = new Float32Array(particleCount * 2)
    for (let index = 0; index < particleCount; index += 1) {
      const angle = index * 2.399963
      const radius = Math.sqrt(index / particleCount) * 0.9
      positions[index * 2] = Math.cos(angle) * radius
      positions[index * 2 + 1] = Math.sin(angle) * radius
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

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
    <div className={`echoMoodPorthole mood-${current.type} phase-${phase}`} style={{ '--mood-intensity': level }}>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="echoMoodGlass" />
      <FloatingMoodEmojis emojis={current.emojis} burstKey={burstKey} burst={burst} />
      <p>{captions[current.type] || 'Le hublot écoute.'}</p>
    </div>
  )
}
