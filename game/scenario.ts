import type { UnitDef } from './units/unit'
import { blank } from './scenarios/blank'
import { test } from './scenarios/test'

export const Scenarios: Record<string,Scenario> = {
  blank,
  test,
}

export type ScenarioType = keyof typeof Scenarios

export interface Scenario {
  weeks: ScenarioWeek[],
}

export interface ScenarioWeek {
  army: UnitDef[]
}

export function getScenarioInfo(st: ScenarioType): Scenario{
  return Scenarios[st]
}