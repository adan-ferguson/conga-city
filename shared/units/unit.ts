import type { Stats } from '../stats'
import type { GameInstance, Team } from '../game'

export type UnitBaseType = 'soldier'

export type UnitDef = {
  name: string,
  stats: Stats,
}

export interface UnitState {
  damage: number
}

export interface UnitInstanceDef {
  def: UnitDef,
  state: UnitState,
}

export interface UnitInstance {
  def: UnitDef,
  state: UnitState,
  game: GameInstance,
  team: Team,
}