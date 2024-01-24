import { SerializedUnitInstance } from './unit'

export type GameDef = {
  scenario: 'test'
}

export type GameState = {
  day: number,
  week: number,
  player: {
    army: SerializedUnitInstance[],
  }
  invader: {
    army: SerializedUnitInstance[]
  }
}