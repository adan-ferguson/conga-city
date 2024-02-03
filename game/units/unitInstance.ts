import type { GameInstance } from '../game'
import type { UnitInstance } from './unit'
import { getStat } from '../stats'

export function wallMaxHealth(_: GameInstance){
  return 50
}

export function wallDamage(game: GameInstance){
  return Math.max(0, game.state.wallDamage)
}

export function wallHealth(game: GameInstance){
  return Math.max(wallMaxHealth(game) - wallDamage(game), 0)
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