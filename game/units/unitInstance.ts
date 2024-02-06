import { getStat } from '../stats'
import type { GameInstance } from '../game'
import type { Team } from '../team'
import type { UnitInstanceDef } from './unit'

export interface UnitInstance extends UnitInstanceDef {
  game: GameInstance,
  team: Team,
}

export function getSlot(ui: UnitInstance){
  const slotIndex = ui.game.state.armies[ui.team].findIndex(uid => uid.id === ui.id)
  if(slotIndex === -1){
    throw 'Unit instance is not a slot in its own game...huh?'
  }
  return slotIndex
}

export function getHp(ui: UnitInstance){
  return getStat(ui, 'hp') - ui.state.damage
}