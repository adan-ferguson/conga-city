import { UnitDef } from './unit'
import { testScenario } from './scenarios/testScenario'

export type ScenarioType = 'testScenario'

export interface Scenario {
  weeks: ScenarioWeek[],
}

export interface ScenarioWeek {
  army: UnitDef[]
}

export function getScenarioInfo(type: ScenarioType): Scenario{
  return testScenario
}