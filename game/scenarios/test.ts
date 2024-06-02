import type { Scenario } from '../scenario'
import { fillArray } from '../utils'
import type { UnitDef } from '../unit'

function soldier(){
  return {
    name: 'Soldier',
    stats: {
      atk: 2,
      hp: 2,
    }
  }
}

const test : Scenario = {
  days: [{
    newUnits: fillArray<UnitDef>(8, () => soldier())
  }]
}

export { test }