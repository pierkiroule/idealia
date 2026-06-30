export default function ProgressStory({ current, total }) {
  return <div className="progressStory" aria-label={`Scène ${current + 1} sur ${total}`}><span style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
}
