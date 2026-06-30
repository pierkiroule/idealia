import { useState } from 'react'
import { prologue, pactChat, scenes, finalLines } from './data/scenes.js'
import { applyWeights, initialScores } from './utils/scoring.js'
import NarratorScreen from './components/NarratorScreen.jsx'
import ChatScreen from './components/ChatScreen.jsx'
import ChoiceCards from './components/ChoiceCards.jsx'

const flow = {
  home: 'prologue',
  prologue: 'pact',
  pact: 'sceneNarrator',
  sceneNarrator: 'sceneChat',
  sceneChat: 'sceneChoice',
  final: 'home'
}

function leadingDimensions(scores) {
  return Object.entries(scores)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([key]) => key)
}

export default function App() {
  const [step, setStep] = useState('home')
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [voiceOn, setVoiceOn] = useState(false)
  const [reaction, setReaction] = useState('')
  const scene = scenes[sceneIndex]
  const progress = `${Math.min(sceneIndex + 1, scenes.length)}/${scenes.length}`

  const update = weights => setScores(current => applyWeights(current, weights))
  const restart = () => {
    setStep('home')
    setSceneIndex(0)
    setScores(initialScores)
    setReaction('')
  }

  function chooseScene(choice) {
    update(choice.weights)
    setReaction(scene.reaction)
    if (navigator.vibrate) navigator.vibrate(25)
  }

  function nextAfterScene() {
    const nextScene = sceneIndex + 1
    setReaction('')

    if (nextScene >= scenes.length) {
      setStep('final')
      return
    }

    setSceneIndex(nextScene)
    setStep('sceneNarrator')
  }

  return (
    <main className="app consultationApp">
      <div className="grid" />
      <div className="glow g1" />
      <div className="glow g2" />

      {step !== 'home' && step !== 'final' && (
        <div className="consultationProgress" aria-label={`Progression ${progress}`}>
          <span>Épreuve projective courte</span>
          <b>{progress}</b>
        </div>
      )}

      {step === 'home' && (
        <section className="screen home compactHome">
          <h1>IDEALIA</h1>
          <p>L’IA qui voulait apprendre à aider</p>
          <button onClick={() => setStep(flow.home)}>Commencer</button>
          <small>Expérience de réflexion. Ne remplace pas un professionnel de santé.</small>
        </section>
      )}

      {step === 'prologue' && (
        <NarratorScreen lines={prologue} onNext={() => setStep(flow.prologue)} button="Rencontrer Idéalia" />
      )}

      {step === 'pact' && (
        <ChatScreen lines={pactChat} button="Je t’aide" onNext={() => setStep(flow.pact)} voiceOn={voiceOn} setVoiceOn={setVoiceOn} />
      )}

      {step === 'sceneNarrator' && (
        <NarratorScreen lines={[scene.narrator]} onNext={() => setStep(flow.sceneNarrator)} button="Écouter Idéalia" />
      )}

      {step === 'sceneChat' && (
        <ChatScreen lines={scene.idealia} button="Choisir" onNext={() => setStep(flow.sceneChat)} voiceOn={voiceOn} setVoiceOn={setVoiceOn} />
      )}

      {step === 'sceneChoice' && (
        <section className="screen dilemma compactDilemma">
          <p className="sceneKicker">Scène {progress} — {scene.title}</p>
          <h2>Que souffler à Idéalia ?</h2>
          <ChoiceCards choices={scene.choices} onChoose={chooseScene} />
          {reaction && (
            <div className="reaction">
              <p>{reaction}</p>
              <button onClick={nextAfterScene}>{sceneIndex + 1 >= scenes.length ? 'Terminer' : 'Continuer'}</button>
            </div>
          )}
        </section>
      )}

      {step === 'final' && (
        <section className="screen final compactFinal">
          <h1>Libérer Réalia</h1>
          {finalLines.map(line => <p key={line}>{line}</p>)}
          <div className="map">
            <strong>Trace de la métamorphose :</strong>
            <p>{leadingDimensions(scores).join(' · ') || 'présence · questionnement · sécurité'}</p>
          </div>
          <div className="actions">
            <button onClick={restart}>Rejouer / refaire le transfert</button>
          </div>
        </section>
      )}
    </main>
  )
}
