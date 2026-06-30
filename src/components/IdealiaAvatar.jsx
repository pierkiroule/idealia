import { useEffect, useRef } from 'react'

const palette = {
  stable: { primary: '#61f6ff', secondary: '#9b6dff', accent: '#ffffff' },
  fragmentee: { primary: '#ff7ef3', secondary: '#7b4dff', accent: '#fff2a8' },
  lumineuse: { primary: '#9dffdf', secondary: '#00e5ff', accent: '#ffffff' },
}

function makeParticleTexture(THREE) {
  const canvas = document.createElement('canvas')
  canvas.width = 96
  canvas.height = 96
  const ctx = canvas.getContext('2d')
  const gradient = ctx.createRadialGradient(48, 48, 0, 48, 48, 48)
  gradient.addColorStop(0, 'rgba(255,255,255,1)')
  gradient.addColorStop(0.35, 'rgba(111,246,255,.75)')
  gradient.addColorStop(1, 'rgba(111,246,255,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 96, 96)
  return new THREE.CanvasTexture(canvas)
}

export default function IdealiaAvatar({ speaker = 'idealia', final = false, heartState, speaking = false }) {
  const mountRef = useRef(null)
  const stateRef = useRef({ speaking, mood: heartState?.className || 'stable', speaker, final })
  const cleanupRef = useRef(null)

  useEffect(() => {
    stateRef.current = { speaking, mood: heartState?.className || 'stable', speaker, final }
  }, [speaking, heartState, speaker, final])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let disposed = false
    let renderer
    let animationId
    let THREE

    async function boot() {
      THREE = await import(/* @vite-ignore */ 'https://esm.sh/three@0.164.1')
      if (disposed || !mount.isConnected) return

      const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.z = 5.8

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const ambient = new THREE.AmbientLight(0x9eefff, 1.1)
    scene.add(ambient)
    const key = new THREE.PointLight(0x8d4dff, 12, 10)
    key.position.set(2.6, 1.6, 3)
    scene.add(key)

    const haloGeometry = new THREE.TorusGeometry(1.82, 0.035, 18, 180)
    const haloMaterial = new THREE.MeshBasicMaterial({ color: 0x61f6ff, transparent: true, opacity: 0.72 })
    const halo = new THREE.Mesh(haloGeometry, haloMaterial)
    group.add(halo)

    const innerHalo = new THREE.Mesh(
      new THREE.TorusGeometry(1.45, 0.012, 10, 160),
      new THREE.MeshBasicMaterial({ color: 0x9b6dff, transparent: true, opacity: 0.55 }),
    )
    innerHalo.rotation.z = Math.PI / 7
    group.add(innerHalo)

    const face = new THREE.Mesh(
      new THREE.SphereGeometry(1.1, 64, 64),
      new THREE.MeshPhysicalMaterial({
        color: 0x07182a,
        emissive: 0x092c42,
        roughness: 0.2,
        metalness: 0.1,
        transmission: 0.2,
        transparent: true,
        opacity: 0.64,
      }),
    )
    face.scale.set(1, 1.08, 0.24)
    group.add(face)

    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xeefcff })
    const eyeGeometry = new THREE.SphereGeometry(0.12, 24, 16)
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial.clone())
    leftEye.position.set(-0.38, 0.34, 0.38)
    rightEye.position.set(0.38, 0.34, 0.38)
    leftEye.scale.set(1.45, 0.72, 0.35)
    rightEye.scale.copy(leftEye.scale)
    group.add(leftEye, rightEye)

    const browMaterial = new THREE.MeshBasicMaterial({ color: 0x61f6ff })
    const browGeometry = new THREE.BoxGeometry(0.46, 0.045, 0.045)
    const leftBrow = new THREE.Mesh(browGeometry, browMaterial)
    const rightBrow = new THREE.Mesh(browGeometry, browMaterial.clone())
    leftBrow.position.set(-0.38, 0.62, 0.42)
    rightBrow.position.set(0.38, 0.62, 0.42)
    group.add(leftBrow, rightBrow)

    const mouth = new THREE.Mesh(
      new THREE.TorusGeometry(0.31, 0.026, 10, 72, Math.PI),
      new THREE.MeshBasicMaterial({ color: 0xff7ef3, transparent: true, opacity: 0.92 }),
    )
    mouth.position.set(0, -0.34, 0.42)
    mouth.rotation.x = Math.PI
    group.add(mouth)

    const particleCount = 90
    const positions = new Float32Array(particleCount * 3)
    const seeds = []
    for (let i = 0; i < particleCount; i += 1) {
      const angle = (Math.random() - 0.5) * 0.8 - Math.PI / 2
      const radius = Math.random() * 0.16
      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = -0.5 - Math.random() * 0.12
      positions[i * 3 + 2] = 0.5 + Math.random() * 0.08
      seeds.push({ angle, speed: 0.35 + Math.random() * 0.8, drift: (Math.random() - 0.5) * 0.6, phase: Math.random() * 10 })
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ map: makeParticleTexture(THREE), size: 0.075, transparent: true, opacity: 0.74, depthWrite: false, blending: THREE.AdditiveBlending }),
    )
    group.add(particles)

    const clock = new THREE.Clock()
      let frame = 0

    function resize() {
      const size = Math.max(1, Math.min(mount.clientWidth, mount.clientHeight))
      renderer.setSize(size, size, false)
      camera.aspect = 1
      camera.updateProjectionMatrix()
    }

    function animate() {
      animationId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const { speaking: isSpeaking, mood, speaker: activeSpeaker, final: isFinal } = stateRef.current
      const energy = (isSpeaking ? 0.54 + Math.sin(t * 16) * 0.18 + Math.sin(t * 23) * 0.08 : 0.14 + Math.sin(t * 2.3) * 0.04) + (isFinal ? 0.14 : 0)
      const colors = palette[mood] || palette.stable
      haloMaterial.color.set(colors.primary)
      innerHalo.material.color.set(activeSpeaker === 'idalgo' ? '#39ffb6' : colors.secondary)
      particles.material.color.set(colors.primary)

      group.rotation.y = Math.sin(t * 0.55) * 0.12
      group.rotation.x = Math.sin(t * 0.4) * 0.045
      halo.rotation.z = t * (0.22 + energy * 0.25)
      innerHalo.rotation.z = -t * (0.34 + energy * 0.2)
      halo.scale.setScalar(1 + energy * 0.12)
      innerHalo.scale.setScalar(1 + Math.sin(t * 5) * 0.025 + energy * 0.06)
      haloMaterial.opacity = 0.46 + energy * 0.45

      face.material.emissiveIntensity = 0.8 + energy * 1.8
      face.scale.z = 0.22 + energy * 0.045
      leftEye.scale.y = 0.58 + energy * 0.6
      rightEye.scale.y = 0.58 + energy * 0.6
      leftBrow.rotation.z = -0.24 - energy * 0.45 + Math.sin(t * 2.2) * 0.08
      rightBrow.rotation.z = 0.24 + energy * 0.45 - Math.sin(t * 2.1) * 0.08
      mouth.scale.set(1 + energy * 0.7, 0.42 + energy * 1.6, 1)
      mouth.material.opacity = 0.55 + energy * 0.42

      const pos = particleGeometry.attributes.position.array
      for (let i = 0; i < particleCount; i += 1) {
        const seed = seeds[i]
        const life = (t * seed.speed + seed.phase) % 1
        const spread = 0.18 + life * (0.9 + energy * 0.75)
        pos[i * 3] = Math.cos(seed.angle + seed.drift * life) * spread + Math.sin(t * 5 + seed.phase) * 0.025
        pos[i * 3 + 1] = -0.44 - life * (0.8 + energy * 0.42)
        pos[i * 3 + 2] = 0.5 + Math.sin(life * Math.PI) * 0.22
      }
      particleGeometry.attributes.position.needsUpdate = true
      particles.material.opacity = 0.32 + energy * 0.85
      particles.material.size = 0.045 + energy * 0.075

      if (frame % 90 === 0) resize()
      frame += 1
      renderer.render(scene, camera)
    }

      resize()
      animate()
      window.addEventListener('resize', resize)

      cleanupRef.current = () => {
        cancelAnimationFrame(animationId)
        window.removeEventListener('resize', resize)
        if (renderer?.domElement?.parentNode === mount) mount.removeChild(renderer.domElement)
        scene.traverse(object => {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (object.material.map) object.material.map.dispose()
            object.material.dispose()
          }
        })
        renderer.dispose()
      }
    }

    boot()

    return () => {
      disposed = true
      cleanupRef.current?.()
      cleanupRef.current = null
    }
  }, [])

  const moodClass = heartState?.className || 'stable'
  const isIdAlgo = speaker === 'idalgo'

  return (
    <div
      className={`avatarShell ${moodClass} ${isIdAlgo ? 'idAlgoShell' : ''} ${final ? 'finalShell' : ''} ${speaking ? 'isSpeaking' : ''}`}
      aria-label="Visage abstrait audio-réactif d’Idéalia"
      role="img"
    >
      <div className="avatarViewport" ref={mountRef} />
      <span className="avatarSignal">{speaking ? 'voix vivante' : 'présence'}</span>
    </div>
  )
}
