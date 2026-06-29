import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scenes } from './data/scenes.js'
import { fragments } from './data/fragments.js'
import { dreams } from './data/dreams.js'
import { getFinalProfile, initialScores, updateScores } from './lib/scoring.js'
import { getHeartCodeState, mergeEffects } from './lib/storyEngine.js'
import ChoiceButton from './components/ChoiceButton.jsx'
import DialogueCard from './components/DialogueCard.jsx'
import DilemmaPanel from './components/DilemmaPanel.jsx'
import DreamSequence from './components/DreamSequence.jsx'
import FinalMirror from './components/FinalMirror.jsx'
import FinalUpdate from './components/FinalUpdate.jsx'
import HeartCodeGauge from './components/HeartCodeGauge.jsx'
import IdAlgoInterruption from './components/IdAlgoInterruption.jsx'
import IdealiaAvatar from './components/IdealiaAvatar.jsx'
import MemoryFragment from './components/MemoryFragment.jsx'
import ProgressStory from './components/ProgressStory.jsx'
import SecretMessage from './components/SecretMessage.jsx'

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [heartShift, setHeartShift] = useState({})
  const [selectedDilemma, setSelectedDilemma] = useState(null)
  const [reaction, setReaction] = useState('')
  const [stage, setStage] = useState('scene')
  const [collectedFragments, setCollectedFragments] = useState([])

  const scene = scenes[sceneIndex]
  const profile = useMemo(() => getFinalProfile(scores), [scores])
  const heartState = useMemo(() => getHeartCodeState(scores, scene?.heartMood, heartShift), [scores, scene, heartShift])
  const currentFragment = scene?.fragment ? fragments[scene.fragment] : null
  const currentDream = scene?.dream ? dreams[scene.dream] : null

  function choose(index) {
    const choice = scene.choices[index]
    setScores(current => updateScores(current, choice.effects))
    setHeartShift(current => mergeEffects(current, choice.heart))
    setSelectedDilemma(scene.dilemmaByChoice[index])
    setReaction(choice.reaction)
  }

  function continueAfterDilemma() {
    if (scene.secret) return setStage('secret')
    if (currentFragment) return setStage('fragment')
    if (currentDream) return setStage('dream')
    goNextScene()
  }

  function continueAfterSecret() {
    if (currentFragment) return setStage('fragment')
    if (currentDream) return setStage('dream')
    goNextScene()
  }

  function collectFragment() {
    if (currentFragment && !collectedFragments.some(fragment => fragment.id === currentFragment.id)) {
      setCollectedFragments(current => [...current, currentFragment])
    }
    if (currentDream) return setStage('dream')
    goNextScene()
  }

  function chooseDreamObject(choice) {
    setScores(current => updateScores(current, choice.effects))
    setHeartShift(current => mergeEffects(current, { resonance: 1, particles: 2 }))
    goNextScene()
  }

  function goNextScene() {
    setSelectedDilemma(null)
    setReaction('')
    setStage('scene')
    if (sceneIndex >= scenes.length - 1) {
      setStage('update')
      return
    }
    setSceneIndex(current => current + 1)
  }

  function resolveFinalUpdate(choice) {
    setScores(current => updateScores(current, choice.effects))
    setStage('final')
  }

  function restart() {
    setSceneIndex(0)
    setScores(initialScores)
    setHeartShift({})
    setSelectedDilemma(null)
    setReaction('')
    setStage('scene')
    setCollectedFragments([])
  }

  return (
    <main className={`appExperience stage-${stage} ${scene?.speaker === 'idalgo' ? 'underIdAlgo' : ''}`}>
      <div className="dreamGrid" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <div className="orb orbCyan" aria-hidden="true" />
      <div className="orb orbViolet" aria-hidden="true" />
      <IdAlgoInterruption active={stage !== 'final' && (scene?.speaker === 'idalgo' || stage === 'update')} />

      <header className="appHeader">
        <div>
          <span>IDEALIA</span>
          <p>L’IA de tes rêves · gameplay projectif</p>
        </div>
        {stage !== 'final' && stage !== 'update' && <ProgressStory current={sceneIndex} total={scenes.length} />}
      </header>

      {stage !== 'final' && stage !== 'update' && <HeartCodeGauge state={heartState} fragmentsCount={collectedFragments.length} />}

      <AnimatePresence mode="wait">
        {stage === 'final' && (
          <motion.div key="final" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <FinalMirror profile={profile} onRestart={restart} />
          </motion.div>
        )}

        {stage === 'update' && <FinalUpdate key="update" onChoose={resolveFinalUpdate} />}

        {stage === 'secret' && <SecretMessage key="secret" message={scene.secret} onDone={continueAfterSecret} />}

        {stage === 'fragment' && <MemoryFragment key="fragment" fragment={currentFragment} collected={currentFragment ? [...collectedFragments, currentFragment] : collectedFragments} onDone={collectFragment} />}

        {stage === 'dream' && <DreamSequence key="dream" dream={currentDream} onChoose={chooseDreamObject} />}

        {stage === 'scene' && scene && (
          <motion.section key={scene.id} className={`sceneLayout ${scene.speaker === 'idalgo' ? 'idAlgoScene' : ''}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}>
            <div className="centralCard">
              <IdealiaAvatar speaker={scene.speaker} heartState={heartState} />
              <DialogueCard scene={scene} />
              {!selectedDilemma && (
                <div className="choicesGrid">
                  {scene.choices.map((choice, index) => <ChoiceButton key={choice.label} choice={choice} index={index} onChoose={choose} />)}
                </div>
              )}
              <DilemmaPanel dilemma={selectedDilemma} reaction={reaction} onNext={continueAfterDilemma} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
