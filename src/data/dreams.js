export const dreams = {
  reveLampe: {
    id: 'reveLampe',
    title: 'Rêve d’Idealia — La pièce sans plafond',
    text: 'Le décor se dissout. Idealia rêve en pixels lents. Devant toi flottent trois objets. Aucun ne répare tout. Chacun éclaire autrement.',
    choices: [
      { object: 'lampe', label: 'La lampe', description: 'Éclairer sans forcer.', effects: { clarte: 1, doute: 1 } },
      { object: 'nid', label: 'Le nid', description: 'Offrir un endroit où reprendre souffle.', effects: { presence: 1, protection: 1 } },
      { object: 'boussole', label: 'La boussole', description: 'Trouver une direction sans carte parfaite.', effects: { liberte: 1, relaisHumain: 1 } }
    ]
  },
  reveGraine: {
    id: 'reveGraine',
    title: 'Rêve d’Idealia — Le jardin des bugs',
    text: 'Dans son sommeil numérique, les bugs deviennent des graines. IdAlgo appellerait ça une anomalie. Idealia appelle ça une chance.',
    choices: [
      { object: 'graine', label: 'La graine', description: 'Laisser une question pousser.', effects: { creativite: 2, doute: 1 } },
      { object: 'clé', label: 'La clé', description: 'Ouvrir une porte, pas forcer une sortie.', effects: { liberte: 1, controle: 1 } },
      { object: 'plume', label: 'La plume', description: 'Dire doucement ce qui tremble.', effects: { reconnaissance: 1, presence: 1 } }
    ]
  },
  reveMiroir: {
    id: 'reveMiroir',
    title: 'Rêve d’Idealia — Le miroir non terminé',
    text: 'Un miroir flotte dans le noir. Il ne montre pas ton visage. Il montre la place que tu laisses aux questions.',
    choices: [
      { object: 'miroir', label: 'Le miroir', description: 'Regarder sans conclure trop vite.', effects: { reconnaissance: 1, doute: 2 } },
      { object: 'boussole', label: 'La boussole', description: 'Chercher un prochain pas humain.', effects: { relaisHumain: 2, protection: 1 } },
      { object: 'plume', label: 'La plume', description: 'Transformer le flou en forme.', effects: { creativite: 2, liberte: 1 } }
    ]
  }
}
