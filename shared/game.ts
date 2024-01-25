import type { UnitInstance } from './unit'
import { getScenarioInfo, Scenario, ScenarioType } from './scenario'
import { resolveCombat } from './combat'

export type GameDef = {
  scenario: ScenarioType
}

export type SlotNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export type GameState = {
  day: number,
  week: number,
  playerArmy: UnitInstance[],
  invaderArmy: UnitInstance[],
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
      playerArmy: [],
      invaderArmy: loadInvaderArmy(scenario, 1)
    }
  }
}

function loadInvaderArmy(scenario: ScenarioType, week: number): UnitInstance[]{
  const def: Scenario = getScenarioInfo(scenario)
  return def.weeks[week].army.map(unitDef => {
    return { def: unitDef }
  })
}

function endDay(game: GameInstance){
  resolveCombat(game)
  // TODO: other stuff
  if(game.state.day === 7){
    game.state.week += 1
  }
  game.state.day = (game.state.day + 1) % 7
}