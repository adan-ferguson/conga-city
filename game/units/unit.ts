import type { Stats } from '../stats'
import type { GameInstance, Team } from '../game'

export type UnitBaseType = 'soldier'

export interface UnitStats extends Stats {
  atk: number,
  hp: number,
  price: number,
}

export type UnitDef = {
  name: string,
  stats: UnitStats,
}

export interface UnitState {
  damage: number
}

export interface UnitInstanceDef {
  id: string,
  def: UnitDef,
  state: UnitState,
}

export interface UnitInstance {
  id: string,
  def: UnitDef,
  state: UnitState,
  game: GameInstance,
  team: Team,
}