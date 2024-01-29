import { GameInstance } from './game'
import { toUnitBaseDef, UnitBaseDef, UnitInstance } from './unit'

export interface Stats {
  atk: number,
  hp: number,
}

export type StatName = keyof Stats

export function getStat(_: GameInstance, unit: UnitInstance, statName: StatName): number{
  const baseDef: UnitBaseDef = toUnitBaseDef(unit.def)
  return baseDef.stats[statName] ?? 0
}