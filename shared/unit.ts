export type UnitType = 'soldier'

export interface UnitDef {
  type: UnitType,
  atk: number,
  hp: number,
}

export interface UnitState {
  hp ?: number
}

export interface SerializedUnitInstance {
  type: UnitType,
  state: UnitState
}