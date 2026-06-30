import { useEffect, useState } from 'react'

function Typewriter({ text }) {
  const fullText = Array.isArray(text) ? text.join('\n\n') : text
  const [shown, setShown] = useState('')
  useEffect(() => {
    setShown('')
    let index = 0
    const timer = setInterval(() => {
      index += 1
      setShown(fullText.slice(0, index))
      if (index >= fullText.length) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [fullText])
  return <p className="typewriter">{shown}<span className="cursor">▌</span></p>
}

export default function DialogueCard({ scene }) {
  return (
    <section className={`dialogueCard ${scene.speaker === 'idalgo' ? 'idAlgoCard' : ''}`}>
      <span className="speaker">{scene.speaker === 'idalgo' ? 'IdAlgo // executive mode' : 'Idealia // signal sensible'}</span>
      <h1>{scene.title}</h1>
      <Typewriter text={scene.text} />
      <h2>{scene.question}</h2>
    </section>
  )
}
