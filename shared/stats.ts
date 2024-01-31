import { type UnitInstance } from './units/unit'

export interface Stats {
  atk: number,
  hp: number,
}

export type StatName = keyof Stats

export function getStat(unit: UnitInstance, statName: StatName): number{
  return unit.def.stats[statName] ?? 0
}