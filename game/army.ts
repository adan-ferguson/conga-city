import { UnitInstanceFns, type UnitInstance } from './unitInstance'
import type { GameInstance, SlotNumber, Team } from './game'
import { gameUnit } from './unit'
import { asSlotNumber } from './utils'

export type Target = SlotNumber | 'wall'

function getInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(sui => gameUnit.toInstance(sui, game, team))
}

function nextTarget(game: GameInstance, team: Team, currentTarget: Target): Target | false{
  if(currentTarget === 'wall'){
    return false
  }
  const nextTarget = asSlotNumber(currentTarget + 1)
  if(!nextTarget || nextTarget >= game.state.armies[team].length){
    return 'wall'
  }
  return nextTarget
}

export const ArmyFns = {
  getInstances,
  nextTarget,
  lowestHp(enemyInstances: UnitInstance[]): SlotNumber | false{
    if(!enemyInstances.length){
      return false
    }
    let min = 0
    for(let i = 1; i < enemyInstances.length; i++){
      if(getHp(i) < getHp(min)){
        min = i
      }
    }
    return asSlotNumber(min)
    function getHp(slot: number){
      return UnitInstanceFns.getHp(enemyInstances[slot])
    }
  }
}