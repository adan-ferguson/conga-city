import type { Scenario, ScenarioName } from './scenario'
import { gameCombat, type Result } from './combat'
import { deepClone } from './utils'
import { gameWall } from './wall'
import { gameScenario } from './scenario'
import { gameUnit } from './unit'
import type { UnitInstance, SerializedUnitInstance } from './unitInstance'

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
        invader: loadInvaderArmy(def.scenario, 1),
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

function unitInstance(game: GameInstance, team: Team, slot: SlotNumber): UnitInstance | undefined{
  const val = game.state.armies[team][slot]
  if(!val){
    return val
  }
  return gameUnit.toInstance(val, game, team)
}

function unitInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(uid => gameUnit.toInstance(uid, game, team))
}

function loadInvaderArmy(scenario: ScenarioName, week: number): SerializedUnitInstance[]{
  const def: Scenario = gameScenario.getInfo(scenario)
  const army = def.weeks[week - 1]?.army
  if(!army){
    throw 'No army!'
  }
  return army.map(gameUnit.toSerializedUnitInstance)
}

function getUnitInstance(game: GameInstance, team: Team, slot: SlotNumber): UnitInstance | undefined{
  if(!game.state.armies[team][slot]){
    return undefined
  }
  return {
    ...game.state.armies[team][slot],
    game,
    team,
  }
}

export const gameGame = {
  endDay,
  unitInstance,
  unitInstances,
  createNewInstance,
  getUnitInstance,
  isArmyFull(army: SerializedUnitInstance[]){
    return army.length === 8
  }
}