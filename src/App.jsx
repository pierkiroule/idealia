import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scenes } from './data/scenes.js'
import { getFinalProfile, initialScores, updateScores } from './lib/scoring.js'
import ChoiceButton from './components/ChoiceButton.jsx'
import DialogueCard from './components/DialogueCard.jsx'
import DilemmaPanel from './components/DilemmaPanel.jsx'
import FinalMirror from './components/FinalMirror.jsx'
import IdAlgoInterruption from './components/IdAlgoInterruption.jsx'
import IdealiaAvatar from './components/IdealiaAvatar.jsx'
import ProgressStory from './components/ProgressStory.jsx'

export default function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [scores, setScores] = useState(initialScores)
  const [selectedDilemma, setSelectedDilemma] = useState(null)
  const [isFinal, setIsFinal] = useState(false)

  const scene = scenes[sceneIndex]
  const profile = useMemo(() => getFinalProfile(scores), [scores])

  function choose(index) {
    setScores(current => updateScores(current, scene.choices[index].effects))
    setSelectedDilemma(scene.dilemmaByChoice[index])
  }

  function nextScene() {
    setSelectedDilemma(null)
    if (sceneIndex >= scenes.length - 1) {
      setIsFinal(true)
      return
    }
    setSceneIndex(current => current + 1)
  }

  function restart() {
    setSceneIndex(0)
    setScores(initialScores)
    setSelectedDilemma(null)
    setIsFinal(false)
  }

  return (
    <main className="appExperience">
      <div className="dreamGrid" aria-hidden="true" />
      <div className="orb orbCyan" aria-hidden="true" />
      <div className="orb orbViolet" aria-hidden="true" />
      <IdAlgoInterruption active={!isFinal && scene?.speaker === 'idalgo'} />

      <header className="appHeader">
        <div>
          <span>IDEALIA</span>
          <p>L’IA de tes rêves</p>
        </div>
        {!isFinal && <ProgressStory current={sceneIndex} total={scenes.length} />}
      </header>

      <AnimatePresence mode="wait">
        {isFinal ? (
          <motion.div key="final" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <FinalMirror profile={profile} onRestart={restart} />
          </motion.div>
        ) : (
          <motion.section key={scene.id} className={`sceneLayout ${scene.speaker === 'idalgo' ? 'idAlgoScene' : ''}`} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}>
            <div className="centralCard">
              <IdealiaAvatar speaker={scene.speaker} />
              <DialogueCard scene={scene} />
              {!selectedDilemma && (
                <div className="choicesGrid">
                  {scene.choices.map((choice, index) => <ChoiceButton key={choice.label} choice={choice} index={index} onChoose={choose} />)}
                </div>
              )}
              <DilemmaPanel dilemma={selectedDilemma} onNext={nextScene} isLast={sceneIndex === scenes.length - 1} />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  )
}
