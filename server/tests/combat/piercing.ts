import type { UnitDef } from '../../../game/unit'
import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

function striker(hp: number = 1): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk: 1,
      hp,
    },
    passives: {
      firstStrike: true,
    }
  }
}

const tests = {
  equalPiercing: () => {
  },
  underkillPiercing: () => {
  },
  overkillPiercing: () => {
  },
  tramplePiercing: () => {
  },
}

export default tests