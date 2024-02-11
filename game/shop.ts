import type { UnitDef } from './units/unit'
import type { GameInstance, GameState, SlotNumber } from './game'
import { getStatValue, type StatName } from './stats'
import { deepClone, toDisplayName } from './utils'
import { instantiateUnitDef } from './game'

const entries: Record<string, UnitDef> = {
  swordsman: {
    name: 'Swordsman',
    stats: {
      atk: 2,
      hp: 2,
      price: 1,
    }
  },
  knight: {
    name: 'Knight',
    stats: {
      atk: 3,
      hp: 23,
      price: 2,
    }
  },
  archer: {
    name: 'Archer',
    stats: {
      atk: 1,
      hp: 1,
      //range: 5,
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

export function buyUnit(game: GameInstance, use: UnitShopEntry, slot: SlotNumber | 'auto'): GameState{
  const after = deepClone(game)
  const s = slot === 'auto' ? after.state.armies.player.length : slot
  after.state.armies.player.splice(s, 0, instantiateUnitDef(use.def))
  return after.state
}