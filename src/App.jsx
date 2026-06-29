import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import game from './data/game.js'
import Voice from './components/Voice.jsx'

const emptySignals = {
  boundaries: 0,
  privacy: 0,
  critical: 0,
  autonomy: 0,
  humanHelp: 0,
  sobriety: 0
}

const signalByTheme = {
  limites: 'boundaries',
  cadre: 'boundaries',
  'vie privée': 'privacy',
  'données personnelles': 'privacy',
  consentement: 'privacy',
  'esprit critique': 'critical',
  hallucinations: 'critical',
  'fake news': 'critical',
  autonomie: 'autonomy',
  dépendance: 'autonomy',
  'aide humaine': 'humanHelp',
  sécurité: 'humanHelp',
  'écologie numérique': 'sobriety',
  sobriété: 'sobriety'
}

const clinicianLabels = {
  boundaries: 'Limites et cadre',
  privacy: 'Intimité et données',
  critical: 'Esprit critique',
  autonomy: 'Autonomie',
  humanHelp: 'Aide humaine',
  sobriety: 'Sobriété numérique'
}

const stageCopy = {
  story: 'Situation',
  boss: 'Vocal d’IdAlgo',
  bug: 'Le bug',
  choice: 'Décision coach',
  learn: 'Module débloqué'
}

function useHapticsAndSound(enabled) {
  const audioRef = useRef(null)

  function ensureAudio() {
    if (!enabled) return null
    if (!audioRef.current) {
      const AudioEngine = window.AudioContext || window.webkitAudioContext
      if (!AudioEngine) return null
      audioRef.current = new AudioEngine()
    }
    return audioRef.current
  }

  function blip(type = 'tap') {
    if (navigator.vibrate) {
      const pattern = type === 'success' ? [18, 25, 35] : type === 'bug' ? [35, 20, 35] : 12
      navigator.vibrate(pattern)
    }

    const audio = ensureAudio()
    if (!audio) return

    const oscillator = audio.createOscillator()
    const gain = audio.createGain()
    const now = audio.currentTime
    const frequency = type === 'success' ? 660 : type === 'bug' ? 130 : 360

    oscillator.type = type === 'bug' ? 'sawtooth' : 'sine'
    oscillator.frequency.setValueAtTime(frequency, now)
    oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.18, now + 0.09)
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14)
    oscillator.connect(gain).connect(audio.destination)
    oscillator.start(now)
    oscillator.stop(now + 0.16)
  }

  return blip
}

function TypeText({ lines = [], speed = 28, onDone }) {
  const text = Array.isArray(lines) ? lines.join(' ') : lines
  const [shown, setShown] = useState('')
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const words = text.split(' ')
    let index = 0
    setShown('')

    const timer = setInterval(() => {
      index += 1
      setShown(words.slice(0, index).join(' '))
      if (index >= words.length) {
        clearInterval(timer)
        onDoneRef.current?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span>
      {shown}
      {shown.length < text.length && <span className="cursor" aria-hidden="true">▌</span>}
    </span>
  )
}

function MissionBubbles({ lines, extra, poem, onDone, ready, waitingForVoice, onContinue, continueLabel }) {
  return (
    <div className="bubbleStack">
      <div className="bubble idealiaBubble">
        <TypeText lines={lines} onDone={onDone} />
      </div>

      {extra?.length > 0 && (
        <div className="bubble extraBubble">
          {extra.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
        </div>
      )}

      {poem?.length > 0 && (
        <motion.div
          className="poemCard"
          initial={{ opacity: 0, rotate: -2, y: 16 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 16 }}
        >
          <span>📜 Poème clandestin débloqué</span>
          {poem.map((line, index) => <p key={`${line}-${index}`}>{line}</p>)}
        </motion.div>
      )}

      {ready && (
        <motion.button
          type="button"
          className="storyContinue"
          onClick={onContinue}
          disabled={waitingForVoice}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {waitingForVoice ? 'Idealia termine sa phrase…' : continueLabel}
        </motion.button>
      )}
    </div>
  )
}

function IdAlgoVoice({ text, voiceEnabled, onDone, onPulse }) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing || voiceEnabled) return undefined

    const timer = setTimeout(() => {
      setPlaying(false)
      onDone()
    }, 1200)

    return () => clearTimeout(timer)
  }, [playing, voiceEnabled, onDone])

  function play() {
    setPlaying(true)
    onPulse('bug')
  }

  return (
    <section className="bossCard" aria-label="Vocal court d’IdAlgo de la Cadence">
      <div className="bossHeader">
        <span>📞 IdAlgo de la Cadence</span>
        <span className="waveDots" aria-hidden="true"><i /><i /><i /></span>
      </div>
      <p>“{text}”</p>
      <button type="button" className="bossButton" onClick={play} disabled={playing}>
        {playing ? 'Lecture...' : 'Écouter le vocal'}
      </button>
      {playing && (
        <Voice
          text={text}
          role="boss"
          enabled={voiceEnabled}
          onEnd={() => {
            setPlaying(false)
            onDone()
          }}
        />
      )}
    </section>
  )
}

function BugCard({ bug, onDone, onPulse }) {
  useEffect(() => {
    onPulse('bug')
  }, [onPulse])

  return (
    <motion.section
      className="bugCard"
      initial={{ rotate: -1.5, scale: 0.96, opacity: 0 }}
      animate={{ rotate: 0, scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <span className="glitchLabel">⚡ bug éthique</span>
      <h2>{bug.title}</h2>
      <p>{bug.text}</p>
      <button type="button" className="primaryButton" onClick={onDone}>J’ai repéré le bug</button>
    </motion.section>
  )
}

function ChoicePanel({ mission, onChoose }) {
  return (
    <section className="choicePanel" aria-label="Choisir une aide pour Idealia">
      <p className="reaction">{mission.reaction}</p>
      <div className="choices">
        {mission.choices.map((choice, index) => (
          <motion.button
            key={`${mission.id}-${choice.label}`}
            type="button"
            className="choice"
            onClick={() => onChoose(choice)}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
          >
            <span>{choice.label}</span>
            <small>{choice.hint}</small>
          </motion.button>
        ))}
      </div>
    </section>
  )
}

function LearnCard({ choice, onNext, isFinal, voiceEnabled }) {
  return (
    <motion.section
      className="learnCard"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 280, damping: 16 }}
    >
      <div className={`confetti ${choice.laugh ? 'laughBurst' : ''}`} aria-hidden="true">
        <span>✦</span><span>●</span><span>◆</span><span>✧</span>
      </div>
      {choice.laugh && <Voice text={choice.laugh} role="idealia" enabled={voiceEnabled} />}
      <span className="unlockLabel">Module débloqué</span>
      <h2>{choice.module}</h2>
      <p>{choice.learn}</p>
      <button type="button" className="primaryButton" onClick={onNext}>
        {isFinal ? 'Voir la synthèse' : 'Mission suivante'}
      </button>
    </motion.section>
  )
}

function ModuleRail({ modules, total }) {
  return (
    <section className="moduleRail" aria-label="Modules débloqués">
      <div>
        <span className="railCount">{modules.length}/{total}</span>
        <p>modules débloqués</p>
      </div>
      <div className="moduleChips">
        {modules.slice(-4).map((module, index) => (
          <span key={`${module}-${index}`}>✨ {module}</span>
        ))}
        {modules.length === 0 && <span>Coach en attente</span>}
      </div>
    </section>
  )
}

function ClinicianPanel({ modules, choices, signals }) {
  const themes = [...new Set(choices.flatMap(choice => choice.themes || []))]
  const topSignals = Object.entries(signals)
    .sort((a, b) => b[1] - a[1])
    .filter(([, value]) => value > 0)
    .slice(0, 3)

  return (
    <aside className="clinicianPanel" aria-label="Synthèse clinicien discrète">
      <div className="panelHeader">
        <span>Mode clinicien</span>
        <strong>Sans score • sans diagnostic</strong>
      </div>
      <h2>Synthèse de séance</h2>
      <p>Thèmes travaillés : {themes.join(', ') || '—'}</p>
      <p>Modules débloqués : {modules.join(', ') || '—'}</p>
      <div className="signalList">
        {topSignals.map(([key]) => <span key={key}>{clinicianLabels[key]}</span>)}
        {topSignals.length === 0 && <span>Aucun axe dominant pour le moment</span>}
      </div>
      <ul>
        {choices.slice(-4).map((choice, index) => (
          <li key={`${choice.label}-${index}`}>{choice.clinical}</li>
        ))}
      </ul>
    </aside>
  )
}

function EndingDebrief({ modules, choices }) {
  return (
    <section className="endingDebrief">
      <h2>Ce qu’Idealia garde en mémoire courte</h2>
      <div className="moduleGrid">
        {modules.map((module, index) => (
          <span key={`${module}-${index}`}>🔓 {module}</span>
        ))}
      </div>
      <p>
        Le parcours a traversé {new Set(choices.flatMap(choice => choice.themes || [])).size} thèmes sans transformer le joueur en questionnaire.
      </p>
    </section>
  )
}

export default function App() {
  const [missionId, setMissionId] = useState('intro')
  const [stage, setStage] = useState('story')
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [storyTyped, setStoryTyped] = useState(false)
  const [voiceDone, setVoiceDone] = useState(true)
  const [modules, setModules] = useState([])
  const [choices, setChoices] = useState([])
  const [signals, setSignals] = useState(emptySignals)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [clinicianOpen, setClinicianOpen] = useState(false)
  const [speaking, setSpeaking] = useState(false)

  const mission = game[missionId]
  const missionIds = useMemo(() => Object.keys(game).filter(id => id !== 'ending'), [])
  const totalModules = missionIds.length
  const completion = Math.min(99, Math.round((modules.length / totalModules) * 99))
  const blip = useHapticsAndSound(voiceEnabled)

  useEffect(() => {
    setStage('story')
    setSelectedChoice(null)
    setStoryTyped(false)
    setVoiceDone(!voiceEnabled)
    setSpeaking(false)
  }, [missionId])

  const canContinueStory = storyTyped && (!voiceEnabled || voiceDone)

  function getNextStageAfterStory(currentMission) {
    if (currentMission.boss) return 'boss'
    if (currentMission.bug) return 'bug'
    return 'choice'
  }

  function getNextStageAfterIdAlgo(currentMission) {
    return currentMission.bug ? 'bug' : 'choice'
  }

  function recordChoice(choice) {
    setSelectedChoice(choice)
    setModules(current => choice.module && !choice.reset ? [...current, choice.module] : current)
    setChoices(current => [...current, choice])
    setSignals(current => {
      const next = { ...current }
      ;(choice.themes || []).forEach(theme => {
        const key = signalByTheme[theme]
        if (key) next[key] += 1
      })
      return next
    })
    blip('success')
    setStage('learn')
  }

  function goNext() {
    if (selectedChoice?.reset) {
      setModules([])
      setChoices([])
      setSignals(emptySignals)
    }
    setMissionId(selectedChoice.next)
  }

  return (
    <main className={`app stage-${stage} scene-${mission.type || 'mission'}`}>
      <div className="sky" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <header className="topBar">
        <button
          type="button"
          className="brandButton"
          onDoubleClick={() => setClinicianOpen(current => !current)}
          aria-label="Idealia Ado, double clic pour le mode clinicien"
        >
          <span>Idealia Ado</span>
          <small>coach officiel d’une IA pas encore parfaite</small>
        </button>

        <button
          type="button"
          className={`soundButton ${voiceEnabled ? 'on' : ''}`}
          aria-pressed={voiceEnabled}
          onClick={() => {
            setVoiceEnabled(current => {
              const next = !current
              if (!next) {
                setVoiceDone(true)
                setSpeaking(false)
              }
              return next
            })
            blip('tap')
          }}
        >
          {voiceEnabled ? '🔊' : '🔇'}
        </button>
      </header>

      <ModuleRail modules={modules} total={totalModules} />

      <section className="gameCard" aria-live="polite">
        <div className="missionMeta">
          <span>{stageCopy[stage]}</span>
          <strong>{mission.title}</strong>
        </div>

        <div className="idealiaAvatar" aria-hidden="true">
          <motion.div
            className={`botFace ${speaking ? 'speaking' : ''}`}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <i /><i /><b />
          </motion.div>
          <span>{mission.sticker}</span>
        </div>

        <Voice
          text={[...mission.setup, ...(mission.extra || []), mission.laugh || ''].join(' ')}
          role="idealia"
          enabled={voiceEnabled && stage === 'story'}
          onStart={() => {
            setVoiceDone(false)
            setSpeaking(true)
          }}
          onEnd={() => {
            setVoiceDone(true)
            setSpeaking(false)
          }}
        />

        <AnimatePresence mode="wait">
          {stage === 'story' && (
            <motion.div key="story" className="stageWrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <MissionBubbles
                lines={mission.setup}
                extra={mission.extra}
                poem={mission.poem}
                ready={canContinueStory}
                waitingForVoice={storyTyped && voiceEnabled && !voiceDone}
                onDone={() => setStoryTyped(true)}
                continueLabel={mission.boss ? 'Écouter IdAlgo' : mission.type === 'poem' ? 'Cacher le poème' : 'Continuer'}
                onContinue={() => {
                  blip('tap')
                  setStage(getNextStageAfterStory(mission))
                }}
              />
            </motion.div>
          )}

          {stage === 'boss' && (
            <motion.div key="boss" className="stageWrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <IdAlgoVoice
                text={mission.boss}
                voiceEnabled={voiceEnabled}
                onPulse={blip}
                onDone={() => setStage(getNextStageAfterIdAlgo(mission))}
              />
            </motion.div>
          )}

          {stage === 'bug' && (
            <motion.div key="bug" className="stageWrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <BugCard bug={mission.bug} onPulse={blip} onDone={() => setStage('choice')} />
            </motion.div>
          )}

          {stage === 'choice' && (
            <motion.div key="choice" className="stageWrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <ChoicePanel mission={mission} onChoose={recordChoice} />
              {mission.id === 'ending' && <EndingDebrief modules={modules} choices={choices} />}
            </motion.div>
          )}

          {stage === 'learn' && selectedChoice && (
            <motion.div key="learn" className="stageWrap" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <LearnCard choice={selectedChoice} onNext={goNext} isFinal={selectedChoice.next === 'ending'} voiceEnabled={voiceEnabled} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="percentCard" aria-label="Progression finale d’Idealia">
        <span>{completion}%</span>
        <div className="percentTrack"><motion.i animate={{ width: `${completion}%` }} /></div>
        <p>Idealia n’ira jamais à 100 %. Le dernier 1 % reste humain.</p>
      </section>

      {clinicianOpen && <ClinicianPanel modules={modules} choices={choices} signals={signals} />}
    </main>
  )
}
