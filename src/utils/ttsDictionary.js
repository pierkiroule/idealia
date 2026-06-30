export const TTS_DICTIONARY = {
  PsyBot: 'Psy Botte',
  psybot: 'Psy Botte',
  Psybot: 'Psy Botte'
}

export function prepareTextForTTS(text) {
  let prepared = text

  for (const [written, spoken] of Object.entries(TTS_DICTIONARY)) {
    prepared = prepared.replaceAll(written, spoken)
  }

  return prepared
}
