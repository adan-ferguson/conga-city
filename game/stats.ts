import type { UnitInstance, UnitStats } from './units/unit'

const DEFS = {
  atk: { type: 'integer', min: 0 },
  hp: { type: 'integer', min: 1 },
  range: { type: 'integer', min: 1 },
  price: { type: 'integer', min: 0 },
}

export type StatName = keyof typeof DEFS

export type Stats = {
  [key in StatName] ?: number
}

const unitDefaults: Stats = {
  range: 1
}

export function getStat(unit: UnitInstance, statName: StatName): number{
  const unitStats: UnitStats = {
    ...unitDefaults,
    ...unit.def.stats,
  }
  // TODO: def constraints
  // const def = DEFS[statName]
  return unitStats[statName] ?? 0
}