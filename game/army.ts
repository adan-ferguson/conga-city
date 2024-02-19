import { UnitInstanceFns, type UnitInstance } from './unitInstance'
import type { GameInstance, Team } from './game'
import { gameUnit } from './unit'

function getInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(sui => gameUnit.toInstance(sui, game, team))
}

export const ArmyFns = {
  getInstances,
  lowestHp(enemyInstances: UnitInstance[]): UnitInstance{
    return enemyInstances.reduce((prev, val) => {
      return UnitInstanceFns.getHp(val) < UnitInstanceFns.getHp(prev) ? val : prev
    }, enemyInstances[0])
  }
}