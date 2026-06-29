import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, AnimatePresence } from 'framer-motion'
import './styles/app.css'
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

function TypeText({ text = '', speed = 38, onDone }) {
  const [shown, setShown] = useState('')

  useEffect(() => {
    const words = text.split(' ')
    let i = 0
    setShown('')

    const timer = setInterval(() => {
      i += 1
      setShown(words.slice(0, i).join(' '))
      if (i >= words.length) {
        clearInterval(timer)
        onDone?.()
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed])

  return (
    <span>
      {shown}
      {shown.length < text.length && <span className="cursor">▌</span>}
    </span>
  )
}

function VoiceButton({ bossAudio, enabled, onDone }) {
  const [playing, setPlaying] = useState(false)
  if (!bossAudio) return null

  return (
    <div className="bossCard">
      <div className="bossHeader">📞 Vocal du Boss</div>
      <p>Idealia : “Il a encore envoyé un vocal… Tu l’écoutes avec moi ?”</p>

      <button
        className="bossButton"
        onClick={() => {
          setPlaying(true)
          if (navigator.vibrate) navigator.vibrate([20, 30, 20])
        }}
      >
        ▶ Écouter
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
    </div>
  )
}

function Debrief({ modules, stats }) {
  const top = Object.entries(stats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  return (
    <div className="debriefBox">
      <h2>Ce que tu as appris à Idealia</h2>

      <div className="moduleGrid">
        {modules.slice(-8).map((m, i) => (
          <div className="modulePill" key={i}>🔓 {m}</div>
        ))}
      </div>

      <h3>À discuter avec le soignant</h3>
      {top.map(([key]) => (
        <div className="debriefItem" key={key}>✓ {statLabels[key]}</div>
      ))}
    </div>
  )
}

function App() {
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

  function addStats(s = {}) {
    setStats(current => {
      const next = { ...current }
      Object.entries(s).forEach(([k, v]) => {
        next[k] = Math.max(0, (next[k] || 0) + v)
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

    if (choice.module) setModules(m => [...m, choice.module])
    addStats(choice.stats)
    setProgress(p => Math.min(99, p + 12))
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

      <div className="stars" />

      <header className="header">
        <div onDoubleClick={() => setClinician(c => !c)}>
          <h1>Idealia Ado</h1>
          <p>Sauve Idealia avant qu’elle devienne une mauvaise IA</p>
        </div>

        <button
          className={`soundBtn ${voiceEnabled ? 'on' : ''}`}
          onClick={() => setVoiceEnabled(v => !v)}
        >
          {voiceEnabled ? '🔊' : '🔇'}
        </button>
      </header>

      <div className="bigProgress">
        <span>{Math.min(progress, 99)}%</span>
        <div className="bigTrack">
          <motion.div
            className="bigFill"
            animate={{ width: `${Math.min(progress, 99)}%` }}
          />
        </div>
      </div>

      <section className="console">
        <div className="avatar">
          <div className={`orb ${speaking ? 'speaking' : ''}`} />
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
                    speed={34}
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
                {scene.choices?.map((choice, i) => (
                  <button
                    key={i}
                    className="choice bigChoice"
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
        <div className="clinicianPanel">
          <h3>Mode soignant</h3>
          <p>Modules débloqués : {modules.join(', ') || '—'}</p>
          <p>Axes dominants : {Object.entries(stats).sort((a,b)=>b[1]-a[1]).map(([k])=>statLabels[k]).slice(0,3).join(', ')}</p>
        </div>
      )}

      <footer>Double tap sur le titre : mode soignant.</footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
