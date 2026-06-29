import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import game from './data/game.js'
import Voice from './components/Voice.jsx'

const emptyStats = {
  listen: 0,
  safety: 0,
  privacy: 0,
  autonomy: 0,
  critical: 0
}

const statLabels = {
  listen: 'Écoute',
  safety: 'Sécurité',
  privacy: 'Intimité',
  autonomy: 'Autonomie',
  critical: 'Esprit critique'
}

const statHelp = {
  listen: 'Accueillir sans isoler',
  safety: 'Repérer les situations à risque',
  privacy: 'Respecter les données et les secrets',
  autonomy: 'Garder l’ado acteur de ses choix',
  critical: 'Vérifier, douter, contextualiser'
}

function TypeText({ text = '', speed = 34, onDone }) {
  const [shown, setShown] = useState('')
  const onDoneRef = useRef(onDone)

  useEffect(() => {
    onDoneRef.current = onDone
  }, [onDone])

  useEffect(() => {
    const words = text.split(' ')
    let i = 0
    setShown('')

    const timer = setInterval(() => {
      i += 1
      setShown(words.slice(0, i).join(' '))
      if (i >= words.length) {
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

function VoiceButton({ bossAudio, enabled, onDone }) {
  const [playing, setPlaying] = useState(false)
  if (!bossAudio) return null

  return (
    <aside className="bossCard" aria-label="Message vocal du Boss">
      <div className="bossHeader">
        <span>📞 Vocal du Boss</span>
        <span className="bossWave" aria-hidden="true">signal entrant</span>
      </div>
      <p>Idealia : “Il a encore envoyé un vocal… Tu l’écoutes avec moi ?”</p>

      <button
        className="bossButton"
        type="button"
        onClick={() => {
          setPlaying(true)
          if (navigator.vibrate) navigator.vibrate([20, 30, 20])
        }}
      >
        ▶ Écouter le briefing
      </button>

      {playing && (
        <Voice
          text={bossAudio}
          role="boss"
          enabled={enabled}
          onEnd={() => {
            setPlaying(false)
            onDone()
          }}
        />
      )}
    </aside>
  )
}

function Debrief({ modules, stats }) {
  const top = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <section className="debriefBox" aria-labelledby="debrief-title">
      <h2 id="debrief-title">Ce que tu as appris à Idealia</h2>

      <div className="moduleGrid" aria-label="Modules débloqués">
        {modules.slice(-8).map((module, index) => (
          <div className="modulePill" key={`${module}-${index}`}>🔓 {module}</div>
        ))}
      </div>

      <h3>À discuter avec le soignant</h3>
      {top.map(([key]) => (
        <div className="debriefItem" key={key}>✓ {statLabels[key]} — {statHelp[key]}</div>
      ))}
    </section>
  )
}

function ProgressPanel({ progress, stats }) {
  const statEntries = useMemo(() => Object.entries(stats), [stats])

  return (
    <section className="progressPanel" aria-label="Progression et compétences">
      <div className="bigProgress">
        <div className="progressCopy">
          <span>{Math.min(progress, 99)}%</span>
          <p>Stabilité éthique d’Idealia</p>
        </div>
        <div className="bigTrack" aria-hidden="true">
          <motion.div
            className="bigFill"
            animate={{ width: `${Math.min(progress, 99)}%` }}
          />
        </div>
      </div>

      <div className="statsGrid">
        {statEntries.map(([key, value]) => (
          <div className="statCard" key={key}>
            <strong>{value}</strong>
            <span>{statLabels[key]}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [sceneId, setSceneId] = useState('start')
  const [progress, setProgress] = useState(4)
  const [stats, setStats] = useState(emptyStats)
  const [modules, setModules] = useState([])
  const [typingDone, setTypingDone] = useState(false)
  const [bossDone, setBossDone] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [clinician, setClinician] = useState(false)

  const scene = game[sceneId]
  const needsBoss = Boolean(scene.bossAudio)
  const canChoose = typingDone && (!needsBoss || bossDone)

  useEffect(() => {
    setTypingDone(false)
    setBossDone(!game[sceneId]?.bossAudio)
    setSpeaking(false)
  }, [sceneId])

  function addStats(sceneStats = {}) {
    setStats(current => {
      const next = { ...current }
      Object.entries(sceneStats).forEach(([key, value]) => {
        next[key] = Math.max(0, (next[key] || 0) + value)
      })
      return next
    })
  }

  function choose(choice) {
    if (!canChoose) return

    if (choice.reset) {
      setSceneId('start')
      setProgress(4)
      setStats(emptyStats)
      setModules([])
      return
    }

    if (choice.module) setModules(current => [...current, choice.module])
    addStats(choice.stats)
    setProgress(current => Math.min(99, current + 12))
    setSceneId(choice.next)
  }

  return (
    <main className={`app ${scene.type === 'bug' ? 'bugMode' : ''}`}>
      <Voice
        text={`${scene.text} ${scene.extra || ''}`}
        role="idealia"
        enabled={voiceEnabled}
        onStart={() => setSpeaking(true)}
        onEnd={() => setSpeaking(false)}
      />

      <div className="stars" aria-hidden="true" />

      <header className="header">
        <div className="brand" onDoubleClick={() => setClinician(current => !current)}>
          <span className="eyebrow">Serious game • IA & ados</span>
          <h1>Idealia Ado</h1>
          <p>Sauve Idealia avant qu’elle devienne une mauvaise IA.</p>
        </div>

        <button
          className={`soundBtn ${voiceEnabled ? 'on' : ''}`}
          type="button"
          aria-pressed={voiceEnabled}
          onClick={() => setVoiceEnabled(current => !current)}
        >
          {voiceEnabled ? '🔊 Voix activée' : '🔇 Activer la voix'}
        </button>
      </header>

      <ProgressPanel progress={progress} stats={stats} />

      <section className="console" aria-live="polite">
        <div className="avatar">
          <div className={`orb ${speaking ? 'speaking' : ''}`} aria-hidden="true" />
          <div>
            <strong>Idealia</strong>
            <span>{speaking ? 'Je parle...' : scene.type === 'bug' ? 'Oups...' : 'IA stressée mais motivée'}</span>
          </div>
        </div>

        <div className="chat">
          <AnimatePresence mode="wait">
            <motion.div
              key={sceneId}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
            >
              {scene.title && <div className="missionTitle">{scene.title}</div>}
              {scene.sticker && <div className="sticker">{scene.sticker}</div>}

              <div className="bubble bot">
                <TypeText
                  text={scene.text}
                  onDone={() => {
                    if (!scene.extra) setTypingDone(true)
                  }}
                />
              </div>

              {scene.extra && (
                <div className="extra">
                  <TypeText
                    text={scene.extra}
                    speed={30}
                    onDone={() => setTypingDone(true)}
                  />
                </div>
              )}

              {typingDone && needsBoss && (
                <VoiceButton
                  bossAudio={scene.bossAudio}
                  enabled={voiceEnabled}
                  onDone={() => setBossDone(true)}
                />
              )}

              {scene.type === 'debrief' && typingDone && (
                <Debrief modules={modules} stats={stats} />
              )}

              <div className={`choices ${canChoose ? 'ready' : 'locked'}`}>
                {scene.choices?.map((choice, index) => (
                  <button
                    key={`${choice.label}-${index}`}
                    className="choice bigChoice"
                    type="button"
                    onClick={() => choose(choice)}
                    disabled={!canChoose}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.hint}</small>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {clinician && (
        <aside className="clinicianPanel" aria-label="Mode soignant">
          <h3>Mode soignant</h3>
          <p>Modules débloqués : {modules.join(', ') || '—'}</p>
          <p>Axes dominants : {Object.entries(stats).sort((a, b) => b[1] - a[1]).map(([key]) => statLabels[key]).slice(0, 3).join(', ')}</p>
        </aside>
      )}

      <footer>Double clic sur le titre : mode soignant. Prototype éducatif, pas un dispositif médical.</footer>
    </main>
  )
}
