import type { Stats } from './stats'
import { uniqueID } from './utils'
import type { UnitInstance, SerializedUnitInstance } from './unitInstance'
import type { GameInstance, Slot, Team } from './game'
import type { PassiveAbilities } from './abilities'

export type UnitDef = {
  name: string,
  stats?: Stats,
  passives?: PassiveAbilities
}

export interface UnitState {
  damage: number,
  slot: Slot,
  destroyed?: boolean,
}

function toSerializedUnitInstance(def: UnitDef, slot: Slot): SerializedUnitInstance{
  return { id: uniqueID(), def, state: { damage: 0, slot, } }
}

function toInstance(uid: SerializedUnitInstance, game: GameInstance, team: Team): UnitInstance{
  return {
    ...uid,
    game,
    team,
  }
}

export const UnitFns = {
  toSerializedUnitInstance,
  toInstance,
}