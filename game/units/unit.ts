import type { Stats } from '../stats'
export type UnitBaseType = 'soldier'

export interface UnitStats extends Stats {
  atk: number,
  hp: number,
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