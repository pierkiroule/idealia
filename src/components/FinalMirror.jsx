import IdealiaAvatar from './IdealiaAvatar.jsx'

export default function FinalMirror({ profile, onRestart }) {
  const exportText = `Ton reflet d’usage — ${profile.name}\n\n${profile.mirror}\n\nBesoin possible : ${profile.need}\n\nVigilance : ${profile.vigilance}\n\nInvitation : ${profile.invitation}\n\nIdealia : ${profile.final}`
  async function copyMirror() {
    await navigator.clipboard?.writeText(exportText)
  }
  return (
    <section className="finalMirror">
      <IdealiaAvatar final />
      <span className="mirrorLabel">Ton reflet d’usage</span>
      <h1>{profile.name}</h1>
      <div className="mirrorText">
        <p>{profile.mirror}</p>
        <p><strong>Besoin possible.</strong> {profile.need}</p>
        <p><strong>Vigilance.</strong> {profile.vigilance}</p>
        <p><strong>Invitation concrète.</strong> {profile.invitation}</p>
        <p className="idealiaFinal">“{profile.final}”</p>
      </div>
      <div className="finalActions">
        <button type="button" className="primaryAction" onClick={copyMirror}>Exporter mon reflet</button>
        <button type="button" className="ghostAction" onClick={onRestart}>Recommencer</button>
      </div>
    </section>
  )
}
