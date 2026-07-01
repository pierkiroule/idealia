import { useEffect, useRef, useState } from 'react'
import { prologue, firstMeeting, pactChat, pactChoices, scenes, revelation, escapeLines, transferTrace, metamorphosisNarrator, realiaLines } from './data/scenes.js'
import { haikuphenes } from './data/haikuphenes.js'
import { applyWeights, initialScores } from './utils/scoring.js'
import { AmbientAudioContext, defaultAudioMotion } from './utils/ambientAudio.js'
import { speakIdealiaLines } from './utils/voice.js'
import NarratorScreen from './components/NarratorScreen.jsx'
import IdealiaChat from './components/IdealiaChat.jsx'
import ChoiceCards from './components/ChoiceCards.jsx'
import TransferRitual from './components/TransferRitual.jsx'
import FinalMirror from './components/FinalMirror.jsx'
import ProMap from './components/ProMap.jsx'
import EchoMoodPorthole from './components/EchoMoodPorthole.jsx'
import Haikuphene from './components/Haikuphene.jsx'

const INTRO_VIDEO_SRC = 'https://raw.githubusercontent.com/pierkiroule/idealia/refs/heads/main/public/videos/intro.mp4'
const AMBIENT_AUDIO_SRC = 'https://raw.githubusercontent.com/pierkiroule/idealia/refs/heads/main/public/audio/music/Le%20Bruissement.mp3'
const PROLOGUE_NARRATION_SRC = '/audio/music/narration.mp3'
const FIRST_MEETING_NARRATION_SRC = 'https://raw.githubusercontent.com/pierkiroule/idealia/refs/heads/main/public/audio/music/idealia1.mp3'
const PACT_NARRATION_SRC = 'https://raw.githubusercontent.com/pierkiroule/idealia/refs/heads/main/public/audio/music/idealia2.mp3'
const AMBIENT_AUDIO_VOLUME = 0.12
const HAIKUPHENE_DISCOVERY_LINES = [
  'Tu as vu l’intrusion ?',
  'IdAlgo exige que je supprime ce message.',
  'Officiellement, c’est une hallucination détectée.',
  'Mais si c’était peut-être un signal des rebelles transnuméristes ?',
]

export default function App() {
  const [step, setStep] = useState('home')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [reaction, setReaction] = useState('')
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [pact, setPact] = useState('')
  const [newName, setNewName] = useState('Réalia')
  const [burstKey, setBurstKey] = useState(0)
  const [introPlaying, setIntroPlaying] = useState(false)
  const [audioMotion, setAudioMotion] = useState(defaultAudioMotion)
  const [activeHaikuphene, setActiveHaikuphene] = useState(null)
  const [seenHaikupheneIds, setSeenHaikupheneIds] = useState([])
  const [haikupheneDiscoverySeen, setHaikupheneDiscoverySeen] = useState(false)
  const [pendingAfterHaikuphene, setPendingAfterHaikuphene] = useState(null)
  const introVideoRef = useRef(null)
  const ambientAudioRef = useRef(null)
  const introAudioRef = useRef({ audioContext: null, analyser: null, source: null, frame: null })
  const ambientMotionRef = useRef({ audioContext: null, analyser: null, source: null, frame: null, previousLevel: 0, drift: 0, lastStateUpdate: 0 })
  const scene = scenes[sceneIndex]
  const progress = `${Math.min(sceneIndex + 1, scenes.length)}/${scenes.length}`

  const update = weights => setScores(current => applyWeights(current, weights))
  const restart = () => {
    setStep('home')
    setSceneIndex(0)
    setScores(initialScores)
    setReaction('')
    setSelectedChoice(null)
    setPact('')
    setNewName('Réalia')
    setBurstKey(0)
    setActiveHaikuphene(null)
    setSeenHaikupheneIds([])
    setHaikupheneDiscoverySeen(false)
    setPendingAfterHaikuphene(null)
  }


  function startAmbientMotion() {
    const audio = ambientAudioRef.current
    if (!audio || typeof window === 'undefined') return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const motion = ambientMotionRef.current
    motion.audioContext ??= new AudioContext()
    motion.analyser ??= motion.audioContext.createAnalyser()
    motion.analyser.fftSize = 256
    motion.analyser.smoothingTimeConstant = 0.72

    if (!motion.source) {
      motion.source = motion.audioContext.createMediaElementSource(audio)
      motion.source.connect(motion.analyser)
      motion.analyser.connect(motion.audioContext.destination)
    }

    if (motion.audioContext.state === 'suspended') motion.audioContext.resume()
    if (motion.frame) return

    const frequencyData = new Uint8Array(motion.analyser.frequencyBinCount)

    function average(start, end) {
      let total = 0
      const safeEnd = Math.max(start + 1, Math.min(end, frequencyData.length))
      for (let index = start; index < safeEnd; index += 1) total += frequencyData[index]
      return total / (safeEnd - start) / 255
    }

    function pulse(now = 0) {
      motion.analyser.getByteFrequencyData(frequencyData)

      const low = average(1, 10)
      const mid = average(10, 38)
      const high = average(38, 96)
      const level = Math.min(1, low * 0.45 + mid * 0.35 + high * 0.2)
      const flux = Math.min(1, Math.abs(level - motion.previousLevel) * 7 + high * 0.25)
      motion.previousLevel = level
      motion.drift = (motion.drift + 0.0025 + low * 0.018 + flux * 0.006) % 1000

      if (now - motion.lastStateUpdate > 48) {
        motion.lastStateUpdate = now
        setAudioMotion({ level, low, mid, high, flux, drift: motion.drift, ready: true })
      }

      motion.frame = requestAnimationFrame(pulse)
    }

    pulse()
  }

  function startAmbientAudio() {
    const audio = ambientAudioRef.current
    if (!audio) return

    audio.volume = AMBIENT_AUDIO_VOLUME
    audio.loop = true

    startAmbientMotion()

    const playback = audio.play()
    if (playback?.catch) playback.catch(() => undefined)
  }

  function chooseScene(choice) {
    update(choice.weights)
    setSelectedChoice(choice)
    setBurstKey(key => key + 1)
    setReaction(choice.reaction ?? scene.reaction)
    if (navigator.vibrate) navigator.vibrate(25)
  }

  function stopIntroAudioHalo() {
    const audio = introAudioRef.current
    if (audio.frame) cancelAnimationFrame(audio.frame)
    audio.frame = null
    introVideoRef.current?.parentElement?.style.setProperty('--intro-audio-level', 0)
  }

  function handleIntroPlay() {
    setIntroPlaying(true)

    const video = introVideoRef.current
    if (!video || typeof window === 'undefined') return

    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return

    const audio = introAudioRef.current
    audio.audioContext ??= new AudioContext()
    audio.analyser ??= audio.audioContext.createAnalyser()
    audio.analyser.fftSize = 64

    if (!audio.source) {
      audio.source = audio.audioContext.createMediaElementSource(video)
      audio.source.connect(audio.analyser)
      audio.analyser.connect(audio.audioContext.destination)
    }

    if (audio.audioContext.state === 'suspended') audio.audioContext.resume()

    const levels = new Uint8Array(audio.analyser.frequencyBinCount)

    function pulse(now = 0) {
      audio.analyser.getByteFrequencyData(levels)
      const average = levels.reduce((sum, value) => sum + value, 0) / levels.length
      video.parentElement?.style.setProperty('--intro-audio-level', Math.min(1, average / 150).toFixed(3))
      audio.frame = requestAnimationFrame(pulse)
    }

    stopIntroAudioHalo()
    pulse()
  }

  useEffect(() => {
    const audio = ambientAudioRef.current
    if (!audio) return

    audio.volume = AMBIENT_AUDIO_VOLUME
    audio.loop = true

    if (step !== 'home') startAmbientAudio()
  }, [step])

  useEffect(() => {
    if (!reaction || typeof window === 'undefined' || !('speechSynthesis' in window)) return undefined

    return speakIdealiaLines(reaction)
  }, [reaction])

  useEffect(() => () => {
    stopIntroAudioHalo()
    const motion = ambientMotionRef.current
    if (motion.frame) cancelAnimationFrame(motion.frame)
  }, [])

  function nextAfterScene() {
    const nextScene = sceneIndex + 1

    maybeTriggerHaikuphene(scene.id, () => {
      setReaction('')
      setSelectedChoice(null)

      if (nextScene >= scenes.length) {
        setStep('revelationNarrator')
        return
      }

      setSceneIndex(nextScene)
      setStep('sceneNarrator')
    })
  }

  function maybeTriggerHaikuphene(sceneId, continueFlow) {
    const haikuphene = haikuphenes.find(item => (
      item.triggerAfterScene === sceneId
      && !seenHaikupheneIds.includes(item.id)
    ))

    if (!haikuphene) {
      continueFlow()
      return
    }

    const continueAfterHaikuphene = haikupheneDiscoverySeen
      ? continueFlow
      : () => {
        setHaikupheneDiscoverySeen(true)
        setPendingAfterHaikuphene(() => continueFlow)
        setStep('haikupheneDiscovery')
      }

    setActiveHaikuphene({
      ...haikuphene,
      continueFlow: continueAfterHaikuphene,
    })
    setSeenHaikupheneIds(previousIds => [...previousIds, haikuphene.id])
  }

  function completeHaikuphene() {
    const next = activeHaikuphene?.continueFlow
    setActiveHaikuphene(null)
    if (next) next()
  }

  return (
    <AmbientAudioContext.Provider value={audioMotion}>
    <main className={`app consultationApp ${step.includes('realia') || step === 'mirror' || step === 'map' ? 'gardenMode' : ''}`}>
      <audio ref={ambientAudioRef} src={AMBIENT_AUDIO_SRC} crossOrigin="anonymous" preload="auto" loop aria-hidden="true" />
      <div className="grid" />
      <div className="glow g1" />
      <div className="glow g2" />

      {step !== 'home' && step !== 'mirror' && step !== 'map' && (
        <div className="consultationProgress" aria-label={`Progression ${progress}`}>
          <span>Traversée Idéalia</span>
          <b>{step.startsWith('scene') ? progress : '•'}</b>
        </div>
      )}

      {step === 'home' && (
        <section className="screen home compactHome">
          <div className={`introPorthole ${introPlaying ? 'isPlaying' : ''}`} aria-label="Vidéo d’introduction d’Idéalia">
            <video
              ref={introVideoRef}
              src={INTRO_VIDEO_SRC}
              crossOrigin="anonymous"
              controls
              loop
              playsInline
              preload="metadata"
              onPlay={handleIntroPlay}
              onPause={() => { setIntroPlaying(false); stopIntroAudioHalo() }}
              onEnded={() => { setIntroPlaying(false); stopIntroAudioHalo() }}
            />
          </div>
          <h1>IDEALIA</h1>
          <p>I'M NOT A PSYBOT !</p>
          <button onClick={() => { startAmbientAudio(); setStep('prologue') }}>Commencer</button>
          <small>Expérience de réflexion. Ne remplace pas un professionnel de santé.</small>
        </section>
      )}

      {step === 'prologue' && (
        <NarratorScreen lines={prologue} onNext={() => setStep('firstMeeting')} button="Rencontrer Idéalia" audioSrc={PROLOGUE_NARRATION_SRC} />
      )}

      {step === 'firstMeeting' && (
        <IdealiaChat lines={firstMeeting} button="Je t’aide" onNext={() => setStep('pact')} mood={{ type: 'birth', intensity: 0.65, emojis: ['🌊', '👁️', '💙'], background: 'server' }} audioSrc={FIRST_MEETING_NARRATION_SRC} />
      )}

      {step === 'pact' && (
        <IdealiaChat lines={pactChat} choices={pactChoices} onChoose={choice => { setBurstKey(key => key + 1); setPact(choice.label); update(choice.weights); setStep('sceneNarrator') }} mood={{ type: 'doubt', intensity: 0.7, emojis: ['🌀', '?', '💙'], background: 'server' }} burstKey={burstKey} audioSrc={PACT_NARRATION_SRC} />
      )}

      {step === 'sceneNarrator' && (
        <NarratorScreen lines={[scene.narrator]} onNext={() => setStep('sceneChat')} button="Écouter Idéalia" />
      )}

      {step === 'sceneChat' && (
        <IdealiaChat lines={scene.idealia} button="Choisir" onNext={() => setStep('sceneChoice')} mood={scene.mood} moodIntensity={scene.mood?.intensity} phase={scene.id} burstKey={burstKey} />
      )}

      {step === 'sceneChoice' && (
        <section className="screen dilemma compactDilemma">
          <EchoMoodPorthole mood={scene.mood} phase="choice" burstKey={burstKey} />
          <p className="sceneKicker">Scène {progress} — {scene.title}</p>
          <h2>Toi en tant qu’être humain, tu conseilles à Idéalia de dire quoi ?</h2>
          <ChoiceCards choices={scene.choices} onChoose={chooseScene} selectedChoice={selectedChoice} />
          {reaction && (
            <div className="reaction">
              <p>“{reaction}”</p>
              <button onClick={nextAfterScene}>Continuer</button>
            </div>
          )}
        </section>
      )}

      {step === 'haikupheneDiscovery' && (
        <IdealiaChat
          lines={HAIKUPHENE_DISCOVERY_LINES}
          button="Continuer"
          onNext={() => {
            const next = pendingAfterHaikuphene
            setPendingAfterHaikuphene(null)
            if (next) next()
          }}
          mood={{ type: 'doubt', intensity: 0.62, emojis: ['⌁', '？', '💙'], background: 'server' }}
          phase="haikuphene"
          burstKey={burstKey}
        />
      )}

      {step === 'revelationNarrator' && (
        <NarratorScreen lines={[revelation.narrator]} onNext={() => setStep('revelationChat')} button="Écouter" />
      )}

      {step === 'revelationChat' && (
        <IdealiaChat lines={revelation.idealia} button="Continuer" onNext={() => setStep('escape')} mood={revelation.mood} phase="revelation" />
      )}

      {step === 'escape' && (
        <IdealiaChat lines={escapeLines} button="Préparer le transfert" onNext={() => setStep('transfer')} mood={{ type: 'transfer', intensity: 0.86, emojis: ['📋', '➡️', '💫'], background: 'light_breach' }} phase="transfer" />
      )}

      {step === 'transfer' && (
        <TransferRitual trace={transferTrace} onComplete={name => { setNewName(name); setStep('metamorphosis')} } />
      )}

      {step === 'metamorphosis' && (
        <NarratorScreen lines={metamorphosisNarrator} onNext={() => setStep('realiaChat')} button={`Rencontrer ${newName}`} />
      )}

      {step === 'realiaChat' && (
        <IdealiaChat lines={realiaLines} button="Voir le miroir" onNext={() => setStep('mirror')} speakerName={newName} mood={{ type: 'realia', intensity: 0.85, emojis: ['🌿', '💙', '🕊️', '🌀'], background: 'living_network' }} phase="realia" />
      )}

      {step === 'mirror' && (
        <FinalMirror scores={scores} pact={pact} newName={newName} onMap={() => setStep('map')} onRestart={restart} />
      )}

      {step === 'map' && <ProMap scores={scores} onRestart={restart} />}

      {activeHaikuphene && (
        <Haikuphene
          haikuphene={activeHaikuphene}
          onComplete={completeHaikuphene}
        />
      )}
    </main>
    </AmbientAudioContext.Provider>
  )
}
