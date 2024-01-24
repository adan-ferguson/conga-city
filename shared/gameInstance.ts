import { GameDef, GameState } from './game'

export function createNewGameInstance(): GameInstance{
  return new GameInstance({
    scenario: 'test'
  },{
    day: 1,
    week: 1,
    player: {
      army: []
    },
    invader: {
      army: []
    }
  })
}

export class GameInstance{
  private _def: GameDef
  private _state: GameState
  constructor(def: GameDef, state: GameState){
    this._def = def
    this._state = state
  }
}