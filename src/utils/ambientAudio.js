import { createContext, useContext } from 'react'

export const defaultAudioMotion = {
  level: 0,
  low: 0,
  mid: 0,
  high: 0,
  flux: 0,
  drift: 0,
  ready: false
}

export const AmbientAudioContext = createContext(defaultAudioMotion)

export function useAmbientAudioMotion() {
  return useContext(AmbientAudioContext)
}
