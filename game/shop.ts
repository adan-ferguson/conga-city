import type { UnitDef } from './units/unit'
import type { GameInstance, SlotNumber } from './game'
import { getStatValue, type StatName } from './stats'
import { deepClone, toDisplayName } from './utils'
import { instantiateUnitDef } from './game'

const entries: Record<string, UnitDef> = {
  swordsman: {
    stats: {
      atk: 2,
      hp: 2,
      price: 1,
    }
  },
  knight: {
    stats: {
      atk: 3,
      hp: 23,
      price: 2,
    }
  },
  archer: {
    stats: {
      atk: 1,
      hp: 1,
      range: 5,
      price: 2,
    }
  }
}

export interface UnitShopEntry {
  game: GameInstance,
  def: UnitDef,
  key: keyof typeof entries
}

export function getUnitShopEntries(game: GameInstance): Record<keyof typeof entries, UnitShopEntry>{
  const obj: Record<keyof typeof entries, UnitShopEntry> = {}
  for(const key in entries){
    obj[key] = {
      key,
      def: {
        ...entries[key],
        name: entries[key].name ?? toDisplayName(key),
      },
      game,
    }
  }
  return obj
}

export function getUnitShopEntryStatValue(use: UnitShopEntry, statName: StatName): number{
  return getStatValue(use.def.stats ?? {}, statName)
}

export function buyUnit(game: GameInstance, use: UnitShopEntry, slot: SlotNumber): GameInstance{
  const after = deepClone(game)
  after.state.armies.player.splice(slot, 0, instantiateUnitDef(use.def))
  return after
}