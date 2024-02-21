export interface StatDef {
  integer ?: true,
  min ?: number,
  default ?: number,
  max ?: number,
}

const DEFS: Record<string, StatDef> = {
  atk: { integer: true, min: 0 },
  hp: { integer: true, min: 1, default: 1 },
  price: { integer: true, min: 0 },
  armor: { integer: true, min: 0 },
  size: { integer: true, min: 1, max: 3 },
  attacks: { integer: true, min: 1 },
  attackArea: { integer: true, min: 0, },
}

export type StatName = keyof typeof DEFS
export type Stats = Record<StatName, number>

function getValue(stats: Stats, statName: StatName): number{
  const def = DEFS[statName]
  let val = stats[statName] ?? def.min ?? 0
  if (def.min !== undefined){
    val = Math.max(def.min, val)
  }
  if(def.max !== undefined){
    val = Math.min(def.max, val)
  }
  if (def.integer){
    val = Math.round(val)
  }
  return val
}

export const gameStats = {
  getValue,
}