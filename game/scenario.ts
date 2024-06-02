import { blank } from './scenarios/blank'
import { test } from './scenarios/test'
import type { UnitDef } from './unit'

export interface Scenario {
  days: ScenarioDay[],
}

export interface ScenarioDay {
  newUnits: UnitDef[]
}

const Scenarios: Record<string,Scenario> = {
  blank,
  test,
}

export type ScenarioName = keyof typeof Scenarios

function getInfo(st: ScenarioName): Scenario{
  return Scenarios[st]
}

export const gameScenario = {
  getInfo,
}