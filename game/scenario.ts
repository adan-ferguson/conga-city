import type { UnitDef } from './units/unit'
import { testScenario } from './scenarios/testScenario'

export type ScenarioType = 'testScenario' | null

export interface Scenario {
  weeks: ScenarioWeek[],
}

export interface ScenarioWeek {
  army: UnitDef[]
}

export function getScenarioInfo(_: ScenarioType): Scenario{
  return testScenario
}