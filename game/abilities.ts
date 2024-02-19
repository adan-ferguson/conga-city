import type { UnitInstance } from './unitInstance'

export type TargetType = 'back'|'lowHp'|'normal'|'wall'

export interface PassiveAbilities {
  ranged?: true,
  firstStrike?: true,
  target?: TargetType,
  trample?: true,
  piercing?: true,
}

function combinedPassives(unit: UnitInstance){
  return unit.def.passives ?? {}
}

function isRanged(unit: UnitInstance): boolean{
  return combinedPassives(unit).ranged === true
}

function hasFirstStrike(unit: UnitInstance): boolean{
  return combinedPassives(unit).firstStrike === true
}

function targeting(unit: UnitInstance): TargetType{
  return combinedPassives(unit).target ?? 'normal'
}

export const AbilityFns = {
  isRanged,
  targeting,
  hasFirstStrike,
}