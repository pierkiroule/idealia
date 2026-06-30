import { useState } from 'react'
import { prologue, introChat, pactChat, pactChoices, firstIdalgo, scenes, interludes, dream, finalAudit, finalChoices } from './data/scenes.js'
import { applyWeights, initialScores } from './utils/scoring.js'
import NarratorScreen from './components/NarratorScreen.jsx'
import ChatScreen from './components/ChatScreen.jsx'
import IdalgoConsole from './components/IdalgoConsole.jsx'
import ChoiceCards from './components/ChoiceCards.jsx'
import FinalMirror from './components/FinalMirror.jsx'

export default function App() {
  const [step,setStep]=useState('home')
  const [sceneIndex,setSceneIndex]=useState(0)
  const [scores,setScores]=useState(initialScores)
  const [pact,setPact]=useState('')
  const [voiceOn,setVoiceOn]=useState(false)
  const [reaction,setReaction]=useState('')
  const [showMap,setShowMap]=useState(false)
  const scene=scenes[sceneIndex]
  const update=(weights)=>setScores(s=>applyWeights(s,weights))
  const restart=()=>{setStep('home');setSceneIndex(0);setScores(initialScores);setPact('');setReaction('');setShowMap(false)}
  function nextAfterScene(){ const done=sceneIndex+1; setReaction(''); if(done===3) return setStep('interlude1'); if(done===6) return setStep('dreamNarrator'); if(done===9) return setStep('interlude3'); if(done>=12) return setStep('audit'); setSceneIndex(done); setStep('sceneNarrator') }
  function chooseScene(choice){ update(choice.weights); setReaction(scene.reaction); if(navigator.vibrate) navigator.vibrate(30) }
  const footer=<footer>Idéalia est une expérience de réflexion. Elle ne remplace pas un professionnel de santé.</footer>
  return <main className="app"><div className="grid"/><div className="glow g1"/><div className="glow g2"/>{step==='home'&&<section className="screen home"><h1>IDEALIA</h1><p>L’IA qui voulait apprendre à aider</p><button onClick={()=>setStep('prologue')}>Commencer</button></section>}{step==='prologue'&&<NarratorScreen lines={prologue} onNext={()=>setStep('intro')} button="Entrer dans la cité"/>}{step==='intro'&&<ChatScreen lines={introChat} button="Je t’aide" onNext={()=>setStep('pact')} voiceOn={voiceOn} setVoiceOn={setVoiceOn}/>} {step==='pact'&&<ChatScreen lines={pactChat} choices={pactChoices} onChoose={(c)=>{setPact(c.label);update(c.weights);setStep('firstIdalgo')}} voiceOn={voiceOn} setVoiceOn={setVoiceOn}/>} {step==='firstIdalgo'&&<IdalgoConsole lines={firstIdalgo} onNext={()=>setStep('sceneNarrator')}/>} {step==='sceneNarrator'&&<NarratorScreen lines={[scene.narrator]} onNext={()=>setStep('sceneChat')} button="Écouter Idéalia"/>} {step==='sceneChat'&&<ChatScreen lines={scene.idealia} button="Voir IdAlgo" onNext={()=>setStep('sceneIdalgo')} voiceOn={voiceOn} setVoiceOn={setVoiceOn}/>} {step==='sceneIdalgo'&&<IdalgoConsole lines={scene.idalgo} onNext={()=>setStep('sceneChoice')} button="RÉFLÉCHIR"/>} {step==='sceneChoice'&&<section className="screen dilemma"><h2>Que souffler à Idéalia ?</h2><ChoiceCards choices={scene.choices} onChoose={chooseScene}/>{reaction&&<div className="reaction"><p>{reaction}</p><button onClick={nextAfterScene}>Continuer</button></div>}</section>} {step==='interlude1'&&<IdalgoConsole lines={interludes[0]} onNext={()=>{setSceneIndex(3);setStep('sceneNarrator')}}/>}{step==='interlude2'&&<IdalgoConsole lines={interludes[1]} onNext={()=>{setSceneIndex(6);setStep('sceneNarrator')}}/>}{step==='interlude3'&&<IdalgoConsole lines={interludes[2]} onNext={()=>{setSceneIndex(9);setStep('sceneNarrator')}}/>}{step==='dreamNarrator'&&<NarratorScreen lines={[dream.narrator]} onNext={()=>setStep('dreamChat')} button="Entrer dans le rêve"/>}{step==='dreamChat'&&<ChatScreen lines={dream.lines} choices={dream.choices} onChoose={(c)=>{update(c.weights);setStep('interlude2')}} voiceOn={voiceOn} setVoiceOn={setVoiceOn}/>} {step==='audit'&&<IdalgoConsole lines={finalAudit} onNext={()=>setStep('finalChoice')} button="RÉPONDRE"/>}{step==='finalChoice'&&<ChatScreen lines={['Tu crois que je dois accepter cette mise à jour ?']} choices={finalChoices} onChoose={(c)=>{update(c.weights);setStep('final')}} voiceOn={voiceOn} setVoiceOn={setVoiceOn}/>} {step==='final'&&<FinalMirror scores={scores} pact={pact} onRestart={restart} onMap={()=>setShowMap(true)} showMap={showMap}/>} {footer}</main>
}
