import { UnitInstanceFns, type UnitInstance } from './unitInstance'
import type { GameInstance, Team } from './game'
import { gameUnit } from './unit'

export type Target = number | 'wall'

function getInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(sui => gameUnit.toInstance(sui, game, team))
}

function nextTarget(game: GameInstance, team: Team, currentTarget: Target): Target | false{
  if(currentTarget === 'wall'){
    return false
  }
  const nextTarget = currentTarget + 1
  if(!nextTarget || nextTarget >= game.state.armies[team].length){
    return 'wall'
  }
  return nextTarget
}

export const ArmyFns = {
  getInstances,
  nextTarget,
  lowestHp(enemyInstances: UnitInstance[]): number | false{
    if(!enemyInstances.length){
      return false
    }
    let min = 0
    for(let i = 1; i < enemyInstances.length; i++){
      if(getHp(i) < getHp(min)){
        min = i
      }
    }
    return min
    function getHp(slot: number){
      return UnitInstanceFns.getHp(enemyInstances[slot])
    }
  }
}