import type { Stats } from '../stats'

export type UnitBaseType = 'soldier'

export type UnitDef = {
  name: string,
  stats?: Stats,
}

export interface UnitState {
  damage: number
}

export interface UnitInstanceDef {
  id: string,
  def: UnitDef,
  state: UnitState,
}