import type { Stats } from './stats'
import { uniqueID } from './utils'
import type { UnitInstance, SerializedUnitInstance } from './unitInstance'
import type { GameInstance, Team } from './game'
import type { PassiveAbilities } from './abilities'

export type UnitDef = {
  name: string,
  stats?: Stats,
  passives?: PassiveAbilities
}

export interface UnitState {
  damage: number,
  destroyed?: boolean,
}

function toSerializedUnitInstance(unitDef: UnitDef): SerializedUnitInstance{
  return { id: uniqueID(), def: unitDef, state: { damage: 0 } }
}

function toInstance(uid: SerializedUnitInstance, game: GameInstance, team: Team): UnitInstance{
  return {
    ...uid,
    game,
    team,
  }
}

export const gameUnit = {
  toSerializedUnitInstance,
  toInstance,
}