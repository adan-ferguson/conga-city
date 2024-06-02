import type { StatName } from './stats'
import type { GameInstance, Team } from './game'
import { gameStats } from './stats'
import type { UnitDef, UnitState } from './unit'

export interface SerializedUnitInstance {
  id: string,
  def: UnitDef,
  state: UnitState,
}

export interface UnitInstance extends SerializedUnitInstance {
  game: GameInstance,
  team: Team,
}

function getSlot(ui: UnitInstance){
  const slotIndex = ui.game.state.armies[ui.team].findIndex((uid: SerializedUnitInstance) => uid.id === ui.id)
  if(slotIndex === -1){
    throw 'Huh?'
  }
  return slotIndex
}

function getStatValue(unit: UnitInstance, statName: StatName): number{
  return gameStats.getValue(unit.def.stats ?? {}, statName)
}

function getHp(ui: UnitInstance){
  return getStatValue(ui, 'hp') - ui.state.damage
}

export const UnitInstanceFns = {
  getHp,
  getStatValue,
  getSlot,
}