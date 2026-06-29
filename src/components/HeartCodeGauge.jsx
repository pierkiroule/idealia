export default function HeartCodeGauge({ state, fragmentsCount }) {
  return (
    <section className={`heartGauge ${state.className}`} aria-label={`État du cœur-code : ${state.label}`}>
      <div>
        <span>État du cœur-code</span>
        <strong>{state.label}</strong>
      </div>
      <div className="heartTrack"><i style={{ width: `${state.intensity}%` }} /></div>
      <small>{fragmentsCount} fragment{fragmentsCount > 1 ? 's' : ''} de mémoire retrouvé{fragmentsCount > 1 ? 's' : ''}</small>
    </section>
  )
}
