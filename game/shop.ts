import type { UnitDef } from './units/unit'
import type { GameInstance } from './game'
import { getStatValue, type StatName } from './stats'

export interface UnitShopEntry {
  game: GameInstance
  def: UnitDef
}

const swordsman = {
  name: 'Swordsman',
  stats: {
    atk: 2,
    hp: 2,
    price: 1,
  }
}

const knight = {
  name: 'Knight',
  stats: {
    atk: 3,
    hp: 3,
    price: 2,
  }
}

const archer = {
  name: 'Archer',
  stats: {
    atk: 1,
    hp: 1,
    range: 5,
    price: 2,
  }
}

export function getUnitShopEntries(game: GameInstance): UnitShopEntry[]{
  return [
    swordsman,
    knight,
    archer,
  ].map(def => {
    return { def, game }
  })
}

export function getUnitShopEntryStatValue(use: UnitShopEntry, statName: StatName): number{
  return getStatValue(use.def.stats ?? {}, statName)
}