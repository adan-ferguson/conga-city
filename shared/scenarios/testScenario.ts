import type { Scenario } from '../scenario'
import { fillArray } from '../utils'
import type { UnitDef } from '../units/unit'

function soldier(){
  return {
    name: 'Soldier',
    stats: {
      atk: 2,
      hp: 2,
    }
  }
}

const testScenario : Scenario = {
  weeks: [{
    army: fillArray<UnitDef>(8, () => soldier())
  }]
}

export { testScenario }