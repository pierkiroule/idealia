import { axes } from '../utils/scoring.js'

const prompts = [
  'Quand tu as aidé Idéalia, qu’est-ce que tu voulais lui éviter ?',
  'Est-ce que c’est comme ça que tu aimerais être aidé toi aussi ?',
  'À quel moment une aide devient-elle trop présente ?',
  'Qu’est-ce qui aide vraiment à se sentir plus libre ?'
]

export default function ProMap({ scores, onRestart }) {
  return (
    <section className="screen final proMap">
      <h1>Carte de l’aide projetée</h1>
      <p>Ces tendances ne sont pas un diagnostic. Elles servent seulement de support de discussion.</p>
      <div className="map">
        {axes(scores).map(axis => (
          <div className="axis" key={axis.label}>
            <div><span>{axis.left}</span><span>{axis.right}</span></div>
            <b><i style={{ left: `${axis.value}%` }} /></b>
          </div>
        ))}
      </div>
      <div className="clinicalPrompts">
        <strong>Relances cliniques</strong>
        <ol>
          {prompts.map(prompt => <li key={prompt}>{prompt}</li>)}
        </ol>
      </div>
      <button onClick={onRestart}>Recommencer</button>
    </section>
  )
}
