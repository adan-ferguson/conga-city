import { GameInstance } from './gameInstance'
import { UnitState, UnitType } from './unit'

export class UnitInstance{
  private _type: UnitType
  private _state: UnitState
  private _game: GameInstance
  constructor(type: UnitType, state: UnitState, game: GameInstance){
    this._type = type
    this._state = state
    this._game = game
  }
}