import type { UnitInstance } from './unitInstance'

export type TargetType = 'back'|'lowHp'|'normal'|'wall'

export interface PassiveAbilities {
  ranged?: true,
  firstStrike?: true,
  target?: TargetType,
}

function combinedPassives(unit: UnitInstance){
  return unit.def.passives ?? {}
}

function isRanged(unit: UnitInstance): boolean{
  return combinedPassives(unit).ranged === true
}

function targeting(unit: UnitInstance): TargetType{
  return combinedPassives(unit).target ?? 'normal'
}

export const gameAbilities = {
  isRanged,
  targeting,
}