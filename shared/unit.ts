import { soldier } from './units/solider'
import { Stats } from './stats'

export type UnitBaseType = 'soldier'

export interface UnitBaseDef {
  name: string,
  stats: Stats,
}

export type UnitDef = {
  baseType: UnitBaseType,
  // other
} | UnitBaseType

export interface UnitState {
  damage: number
}

export interface UnitInstance {
  def: UnitDef,
  state: UnitState,
}

export function toUnitBaseDef(def: UnitDef): UnitBaseDef{
  const baseTypeName: UnitBaseType = typeof def === 'string' ? def : def.baseType
  // TODO: name -> def
  return soldier
}