import type { UnitDef } from '../../../game/unit'
import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

function trampler(hp: number = 1): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk: 1,
      hp,
    },
    passives: {
      trample: true,
    }
  }
}

const tests = {

}

export default tests