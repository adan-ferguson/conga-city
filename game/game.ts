import { getScenarioInfo, type Scenario, type ScenarioType } from './scenario'
import { resolveCombat } from './combat'
import { deepClone, uniqueID } from './utils'
import type { Team } from './team'
import type { UnitInstance } from './units/unitInstance'
import type { UnitInstanceDef } from './units/unit'
import type { UnitDef } from './units/unit'

export type GameDef = {
  scenario: ScenarioType
}

export type SlotNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type GameState = {
  day: number,
  week: number,
  wallDamage: number,
  armies: {
    [key in Team]: UnitInstanceDef[]
  }
}

export type GameInstance = {
  def: GameDef,
  state: GameState,
}

export function createNewGameInstance(def: GameDef): GameInstance{
  return {
    def,
    state: {
      day: 1,
      week: 1,
      wallDamage: 0,
      armies: {
        player: [],
        invader: loadInvaderArmy(def.scenario, 1),
      }
    }
  }
}

export function endDay(g: GameInstance): false | GameInstance{
  if(gameOver(g)){
    return false
  }
  const game = deepClone(resolveCombat(g))
  // TODO: other stuff
  if(game.state.day === 7){
    game.state.week += 1
  }
  game.state.day = 1 + (game.state.day % 7)
  return game
}

export function wallMaxHealth(_: GameInstance){
  return 50
}

export function wallDamage(game: GameInstance){
  return Math.max(0, game.state.wallDamage)
}

export function wallHealth(game: GameInstance){
  return Math.max(wallMaxHealth(game) - wallDamage(game), 0)
}

export function gameOver(game: GameInstance): boolean{
  if(wallHealth(game) <= 0){
    return true
  }
  return false
}

export function getUnitInstance(game: GameInstance, team: Team, slot: SlotNumber): UnitInstance | undefined{
  const val = game.state.armies[team][slot]
  if(!val){
    return val
  }
  return toUnitInstance(val, game, team)
}

export function gameUnitInstances(game: GameInstance, team: Team): UnitInstance[]{
  return game.state.armies[team].map(uid => toUnitInstance(uid, game, team))
}

export function toUnitInstance(uid: UnitInstanceDef, game: GameInstance, team: Team): UnitInstance{
  return {
    ...uid,
    game,
    team,
  }
}

function loadInvaderArmy(scenario: ScenarioType, week: number): UnitInstanceDef[]{
  const def: Scenario = getScenarioInfo(scenario)
  const army = def.weeks[week - 1]?.army
  if(!army){
    throw 'No army!'
  }
  return army.map(instantiateUnitDef)
}

export function instantiateUnitDef(unitDef: UnitDef): UnitInstanceDef{
  return { id: uniqueID(), def: unitDef, state: { damage: 0 } }
}