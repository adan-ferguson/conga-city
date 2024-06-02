import type { Scenario, ScenarioName } from './scenario'
import { gameCombat, type Result } from './combat'
import { deepClone } from './utils'
import { gameWall } from './wall'
import { gameScenario } from './scenario'
import { UnitFns } from './unit'
import type { UnitInstance, SerializedUnitInstance } from './unitInstance'
import { ArmyFns } from './army'

export type Team = 'player' | 'invader'

export interface Slot {
  row: number,
  col: number,
}

export type GameDef = {
  scenario: ScenarioName
}

export type GameState = {
  day: number,
  week: number,
  wallDamage: number,
  actionsTaken: number,
  armies: {
    [key in Team]: SerializedUnitInstance[]
  }
}

export type GameInstance = {
  def: GameDef,
  state: GameState,
}

function createNewInstance(def: GameDef): GameInstance{
  return {
    def,
    state: {
      day: 1,
      week: 1,
      wallDamage: 0,
      actionsTaken: 0,
      armies: {
        player: [],
        invader: [],
      }
    }
  }
}

function endDay(g: GameInstance): { stateAfter: GameState, results: Result[] }{
  if(gameOver(g)){
    throw 'Could not end day'
  }
  const { stateAfter: combatStateAfter, results } = gameCombat.resolve(g)
  const stateAfter = deepClone(combatStateAfter)
  // TODO: Cleanup
  if(stateAfter.day === 7){
    stateAfter.week += 1
  }
  stateAfter.day = 1 + (stateAfter.day % 7)
  return { stateAfter, results }
}

function gameOver(game: GameInstance): boolean{
  if(gameWall.health(game) <= 0){
    return true
  }
  return false
}

function unitInstance(game: GameInstance, team: Team, slot: Slot): UnitInstance | false{
  return ArmyFns.getFromSlot(ArmyFns.getArmy(game, team), slot)
}

function unitInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(uid => UnitFns.toInstance(uid, game, team))
}

function musterInvaderArmy(game: GameInstance, scenario: ScenarioName, day: number): SerializedUnitInstance[]{
  const dayInfo = gameScenario.getInfo(scenario).days[day]
  if(!dayInfo || !dayInfo.newUnits){
    return []
  }
  return [] // TODO: this
}

export const gameGame = {
  endDay,
  unitInstance,
  unitInstances,
  createNewInstance,
  isArmyFull(army: SerializedUnitInstance[]){
    return army.length === 8
  }
}