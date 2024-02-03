import type { UnitDef } from './units/unit'
import { GameInstance } from './game'

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

export function getUnitShopEntries(_: GameInstance): UnitDef[]{
  return [
    swordsman,
    knight,
    archer,
  ]
}