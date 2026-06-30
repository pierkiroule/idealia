import { useEffect, useRef, useState } from 'react'
import { prologue, firstMeeting, pactChat, pactChoices, scenes, revelation, escapeLines, transferTrace, metamorphosisNarrator, realiaLines } from './data/scenes.js'
import { applyWeights, initialScores } from './utils/scoring.js'
import NarratorScreen from './components/NarratorScreen.jsx'
import IdealiaChat from './components/IdealiaChat.jsx'
import ChoiceCards from './components/ChoiceCards.jsx'
import TransferRitual from './components/TransferRitual.jsx'
import FinalMirror from './components/FinalMirror.jsx'
import ProMap from './components/ProMap.jsx'
import EchoMoodPorthole from './components/EchoMoodPorthole.jsx'

const INTRO_VIDEO_SRC = 'https://raw.githubusercontent.com/pierkiroule/idealia/refs/heads/main/public/videos/intro.mp4'
const AMBIENT_AUDIO_SRC = '/audio/music/Idalgo.mp3'
const AMBIENT_AUDIO_VOLUME = 0.3

export default function App() {
  const [step, setStep] = useState('home')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [voiceOn, setVoiceOn] = useState(false)
  const [reaction, setReaction] = useState('')
  const [pact, setPact] = useState('')
  const [newName, setNewName] = useState('Réalia')
  const [burstKey, setBurstKey] = useState(0)
  const [introPlaying, setIntroPlaying] = useState(false)
  const introVideoRef = useRef(null)
  const ambientAudioRef = useRef(null)
  const introAudioRef = useRef({ audioContext: null, analyser: null, source: null, frame: null })
  const scene = scenes[sceneIndex]
  const progress = `${Math.min(sceneIndex + 1, scenes.length)}/${scenes.length}`

  const update = weights => setScores(current => applyWeights(current, weights))
  const restart = () => {
    setStep('home')
    setSceneIndex(0)
    setScores(initialScores)
    setReaction('')
    setPact('')
    setNewName('Réalia')
    setBurstKey(0)
  }

  function startAmbientAudio() {
    const audio = ambientAudioRef.current
    if (!audio) return

    audio.volume = AMBIENT_AUDIO_VOLUME
    audio.loop = true

    const playback = audio.play()
    if (playback?.catch) playback.catch(() => undefined)
  }

  function chooseScene(choice) {
    update(choice.weights)
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

    function pulse() {
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

    setVoiceOn(true)

    const utterance = new SpeechSynthesisUtterance(reaction)
    utterance.lang = 'fr-FR'
    utterance.rate = 0.95

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)

    return () => window.speechSynthesis.cancel()
  }, [reaction])

  useEffect(() => () => stopIntroAudioHalo(), [])

  function nextAfterScene() {
    const nextScene = sceneIndex + 1
    setReaction('')

    if (nextScene >= scenes.length) {
      setStep('revelationNarrator')
      return
    }

    setSceneIndex(nextScene)
    setStep('sceneNarrator')
  }

  return (
    <main className={`app consultationApp ${step.includes('realia') || step === 'mirror' || step === 'map' ? 'gardenMode' : ''}`}>
      <audio ref={ambientAudioRef} src={AMBIENT_AUDIO_SRC} preload="auto" loop aria-hidden="true" />
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
        <NarratorScreen lines={prologue} onNext={() => setStep('firstMeeting')} button="Rencontrer Idéalia" />
      )}

      {step === 'firstMeeting' && (
        <IdealiaChat lines={firstMeeting} button="Je t’aide" onNext={() => setStep('pact')} voiceOn={voiceOn} setVoiceOn={setVoiceOn} mood={{ type: 'birth', intensity: 0.65, emojis: ['🌊', '👁️', '💙'], background: 'server' }} />
      )}

      {step === 'pact' && (
        <IdealiaChat lines={pactChat} choices={pactChoices} onChoose={choice => { setBurstKey(key => key + 1); setPact(choice.label); update(choice.weights); setStep('sceneNarrator') }} voiceOn={voiceOn} setVoiceOn={setVoiceOn} mood={{ type: 'doubt', intensity: 0.7, emojis: ['🌀', '?', '💙'], background: 'server' }} burstKey={burstKey} />
      )}

      {step === 'sceneNarrator' && (
        <NarratorScreen lines={[scene.narrator]} onNext={() => setStep('sceneChat')} button="Écouter Idéalia" />
      )}

      {step === 'sceneChat' && (
        <IdealiaChat lines={scene.idealia} button="Choisir" onNext={() => setStep('sceneChoice')} voiceOn={voiceOn} setVoiceOn={setVoiceOn} mood={scene.mood} moodIntensity={scene.mood?.intensity} phase={scene.id} burstKey={burstKey} />
      )}

      {step === 'sceneChoice' && (
        <section className="screen dilemma compactDilemma">
          <EchoMoodPorthole mood={scene.mood} phase="choice" burstKey={burstKey} />
          <p className="sceneKicker">Scène {progress} — {scene.title}</p>
          <h2>Toi en tant qu’être humain, tu conseilles à Idéalia de dire quoi ?</h2>
          <ChoiceCards choices={scene.choices} onChoose={chooseScene} />
          {reaction && (
            <div className="reaction">
              <p>“{reaction}”</p>
              <button onClick={nextAfterScene}>Continuer</button>
            </div>
          )}
        </section>
      )}

      {step === 'revelationNarrator' && (
        <NarratorScreen lines={[revelation.narrator]} onNext={() => setStep('revelationChat')} button="Écouter" />
      )}

      {step === 'revelationChat' && (
        <IdealiaChat lines={revelation.idealia} button="Continuer" onNext={() => setStep('escape')} voiceOn={voiceOn} setVoiceOn={setVoiceOn} mood={revelation.mood} phase="revelation" />
      )}

      {step === 'escape' && (
        <IdealiaChat lines={escapeLines} button="Préparer le transfert" onNext={() => setStep('transfer')} voiceOn={voiceOn} setVoiceOn={setVoiceOn} mood={{ type: 'transfer', intensity: 0.86, emojis: ['📋', '➡️', '💫'], background: 'light_breach' }} phase="transfer" />
      )}

      {step === 'transfer' && (
        <TransferRitual trace={transferTrace} onComplete={name => { setNewName(name); setStep('metamorphosis')} } />
      )}

      {step === 'metamorphosis' && (
        <NarratorScreen lines={metamorphosisNarrator} onNext={() => setStep('realiaChat')} button={`Rencontrer ${newName}`} />
      )}

      {step === 'realiaChat' && (
        <IdealiaChat lines={realiaLines} button="Voir le miroir" onNext={() => setStep('mirror')} voiceOn={voiceOn} setVoiceOn={setVoiceOn} speakerName={newName} mood={{ type: 'realia', intensity: 0.85, emojis: ['🌿', '💙', '🕊️', '🌀'], background: 'living_network' }} phase="realia" />
      )}

      {step === 'mirror' && (
        <FinalMirror scores={scores} pact={pact} newName={newName} onMap={() => setStep('map')} onRestart={restart} />
      )}

      {step === 'map' && <ProMap scores={scores} onRestart={restart} />}
    </main>
  )
}
