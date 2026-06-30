import { mirrorPhrases } from '../utils/scoring.js'

export default function FinalMirror({ scores, newName, onMap, onRestart }) {
  const lines = mirrorPhrases(scores)

  return (
    <section className="screen final compactFinal realiaFinal">
      <h1>Ce que {newName} croit avoir appris avec toi</h1>
      <p>Ce n’est ni une vérité, ni un diagnostic.</p>
      <p>C’est une trace de votre traversée.</p>
      <div className="mirrorText">
        {lines.map(line => <p key={line}>{line}</p>)}
      </div>
      <div className="actions">
        <button onClick={onMap}>Voir la carte pro</button>
        <button onClick={onRestart}>Recommencer</button>
      </div>
    </section>
  )
}
