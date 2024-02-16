import type { UnitDef } from './unit'
import type { GameInstance, GameState } from './game'
import { deepClone } from './utils'
import type { StatName } from './stats'
import { gameStats } from './stats'
import { gameUnit } from './unit'
import type { SpawnSlot } from './choices'

const defs: Record<string, UnitDef> = {
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

export type UnitShopKey = keyof typeof defs

export interface UnitShopEntry {
  game: GameInstance,
  def: UnitDef,
  key: UnitShopKey,
}

function getEntries(game: GameInstance): Record<keyof typeof defs, UnitShopEntry>{
  const obj: Record<keyof typeof defs, UnitShopEntry> = {}
  for(const key in defs){
    obj[key] = {
      key,
      def: defs[key],
      game,
    }
  }
  return obj
}

function getStatValue(use: UnitShopEntry, statName: StatName): number{
  return gameStats.getValue(use.def.stats ?? {}, statName)
}

function buyUnit(game: GameInstance, use: UnitShopEntry, slot: SpawnSlot): GameState{
  const after = deepClone(game)
  const s = slot === 'auto' ? after.state.armies.player.length : slot
  after.state.armies.player.splice(s, 0, gameUnit.toSerializedUnitInstance(use.def))
  return after.state
}

function getEntry(game: GameInstance, key: UnitShopKey): UnitShopEntry{
  return {
    key,
    game,
    def: defs[key],
  }
}

export const gameShop = {
  buyUnit,
  getEntry,
  getEntries,
  getStatValue,
}