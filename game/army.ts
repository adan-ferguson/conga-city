import { UnitInstanceFns, type UnitInstance, SerializedUnitInstance } from './unitInstance'
import type { GameInstance, Slot, Team } from './game'
import { gameUnit } from './unit'

export type Target = Slot | 'wall'

function getInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(sui => gameUnit.toInstance(sui, game, team))
}

function nextTarget(game: GameInstance, team: Team, currentTarget: Target): Target | false{
  if(currentTarget === 'wall'){
    return false
  }
  const nextTarget = { row: currentTarget.row, col: currentTarget.col + 1 }
  if(!getFromSlot(game.state.armies[team], nextTarget)){
    return team === 'player' ? 'wall' : false
  }
  return nextTarget
}

function getFromSlot(army: SerializedUnitInstance[], nextTarget: Slot): SerializedUnitInstance{
  
}

export const ArmyFns = {
  getInstances,
  nextTarget,
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