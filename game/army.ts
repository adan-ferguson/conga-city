import { UnitInstanceFns, type UnitInstance, type SerializedUnitInstance } from './unitInstance'
import type { GameInstance, Slot, Team } from './game'
import { UnitFns } from './unit'

export type Target = Slot | 'wall'

function getArmy(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(sui => UnitFns.toInstance(sui, game, team))
}

function nextTarget(game: GameInstance, team: Team, currentTarget: Target): Target | false{
  if(currentTarget === 'wall'){
    return false
  }
  const nextTarget = { row: currentTarget.row, col: currentTarget.col + 1 }
  if(!getFromSlot(getArmy(game, team), nextTarget)){
    return team === 'player' ? 'wall' : false
  }
  return nextTarget
}

function getFromSlot<T extends SerializedUnitInstance>(army: T[], slot: Slot): T | false{
  return army.find(sui => {
    return sui.state.slot.col === slot.col &&
      sui.state.slot.row === slot.row
  }) ?? false
}

export const ArmyFns = {
  getArmy,
  nextTarget,
  getFromSlot,
  lowestHp(enemyInstances: UnitInstance[]): UnitInstance | false{
    if(!enemyInstances.length){
      return false
    }
    let min = 0
    for(let i = 1; i < enemyInstances.length; i++){
      if(getHp(i) < getHp(min)){
        min = i
      }
    }
    return enemyInstances[min]
    function getHp(slot: number){
      return UnitInstanceFns.getHp(enemyInstances[slot])
    }
  }
}