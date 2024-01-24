export type ScenarioType = 'test'

export interface Scenario {
  type: ScenarioType,
  weeks: ScenarioWeek[],
}

export interface ScenarioWeek {
  army: UnitDef[]
}