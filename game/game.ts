import type { UnitInstance } from './units/unit'
import { getScenarioInfo, type Scenario, type ScenarioType } from './scenario'
import { resolveCombat } from './combat'
import type { UnitInstanceDef } from './units/unit'
import { deepClone, uniqueID } from './utils'
import { wallHealth } from './units/unitInstance'

export type GameDef = {
  scenario: ScenarioType
}

export type SlotNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export enum Team {
  Player,
  Invader,
}

export function otherTeam(team: Team): Team{
  return (team + 1) % 2
}

export type GameState = {
  day: number,
  week: number,
  wallDamage: number,
  armies: {
    [Team.Player]: UnitInstanceDef[],
    [Team.Invader]: UnitInstanceDef[],
  }
}

export type GameInstance = {
  def: GameDef,
  state: GameState,
}

export function createNewGameInstance(): GameInstance{
  const scenario = 'testScenario'
  return {
    def: { scenario },
    state: {
      day: 1,
      week: 1,
      wallDamage: 0,
      armies: [
        [],
        loadInvaderArmy(scenario, 1),
      ]
    }
  }
}

export function endDay(g: GameInstance){
  if(gameOver(g)){
    return
  }
  const game = deepClone(resolveCombat(g))
  // TODO: other stuff
  if(game.state.day === 7){
    game.state.week += 1
  }
  game.state.day = 1 + (game.state.day % 7)
  return game
}

export function gameOver(game: GameInstance): boolean{
  if(wallHealth(game) <= 0){
    return true
  }
  return false
}

export function getArmy(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map<UnitInstance>(uid => {
    return {
      ...uid,
      game,
      team,
    }
  })
}

function loadInvaderArmy(scenario: ScenarioType, week: number): UnitInstanceDef[]{
  const def: Scenario = getScenarioInfo(scenario)
  const army = def.weeks[week - 1]?.army
  if(!army){
    throw 'No army!'
  }
  return army.map(unitDef => {
    return { id: uniqueID(), def: unitDef, state: { damage: 0 } }
  })
}