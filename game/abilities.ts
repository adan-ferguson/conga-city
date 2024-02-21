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

function hasPassive(unit: UnitInstance, abilityName: keyof PassiveAbilities): boolean{
  return combinedPassives(unit)[abilityName] === true
}

function targeting(unit: UnitInstance): TargetType{
  return combinedPassives(unit).target ?? 'normal'
}

export const AbilityFns = {
  targeting,
  hasPassive,
}