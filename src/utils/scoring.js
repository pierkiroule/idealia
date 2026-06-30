export const initialScores = { securite:0, autonomie:0, resonance:0, performance:0, confrontation:0, questionnement:0, controle:0, incertitude:0, presence:0, solution:0 }
export function applyWeights(scores, weights = {}) { return Object.fromEntries(Object.entries(initialScores).map(([k]) => [k, (scores[k] || 0) + (weights[k] || 0)])) }
export function dominant(scores, limit = 4) { return Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,limit).map(([key])=>key) }
const phrases = {
 presence:'Tu as souvent choisi la présence plutôt que la solution immédiate.',
 autonomie:'Tu sembles croire qu’aider, ce n’est pas prendre la place de l’autre, mais l’aider à retrouver sa propre boussole.',
 securite:'Tu as souvent privilégié la sécurité, le réconfort et le besoin de ne pas se sentir seul.',
 questionnement:'Tu sembles penser qu’une bonne aide ne donne pas seulement des réponses : elle ouvre des questions.',
 incertitude:'Tu as accepté qu’une part de mystère reste vivante dans toute relation d’aide.',
 performance:'Tu as parfois choisi l’efficacité, la clarté et l’action rapide, surtout quand la situation semblait urgente.',
 resonance:'Tu as souvent orienté Idéalia vers une écoute sensible, attentive à ce qui tremble derrière les mots.',
 confrontation:'Tu as parfois choisi de nommer ce qui résiste, sans confondre franchise et violence.',
 controle:'Tu as cherché des repères quand la situation semblait fragile ou confuse.',
 solution:'Tu as parfois aidé Idéalia à transformer l’émotion en prochain pas possible.'
}
export function mirrorPhrases(scores) { return dominant(scores, 4).map(k => phrases[k]) }
export function axes(scores) { return [
 {label:'Réconfort ↔ Autonomie', left:'Réconfort', right:'Autonomie', value: balance(scores.securite + scores.resonance, scores.autonomie)},
 {label:'Réponse ↔ Question', left:'Réponse', right:'Question', value: balance(scores.solution, scores.questionnement)},
 {label:'Performance ↔ Présence', left:'Performance', right:'Présence', value: balance(scores.performance, scores.presence)},
 {label:'Contrôle ↔ Confiance', left:'Contrôle', right:'Confiance', value: balance(scores.controle, scores.resonance + scores.autonomie)},
 {label:'Certitude ↔ Incertitude', left:'Certitude', right:'Incertitude', value: balance(scores.solution + scores.controle, scores.incertitude)}
]}
function balance(left=0,right=0){ const total=Math.max(1,Math.abs(left)+Math.abs(right)); return Math.round(50 + ((right-left)/total)*45) }
