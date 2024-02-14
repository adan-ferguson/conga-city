import type { Stats } from './stats'
import { uniqueID } from './utils'
import type { UnitInstance, UnitInstanceDef } from './unitInstance'
import type { GameInstance, Team } from './game'

export type UnitDef = {
  name: string,
  stats?: Stats,
}

export interface UnitState {
  damage: number
}

function toInstanceDef(unitDef: UnitDef): UnitInstanceDef{
  return { id: uniqueID(), def: unitDef, state: { damage: 0 } }
}

function toInstance(uid: UnitInstanceDef, game: GameInstance, team: Team): UnitInstance{
  return {
    ...uid,
    game,
    team,
  }
}

export const gameUnit = {
  toInstanceDef,
  toInstance,
}