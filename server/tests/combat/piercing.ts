import type { UnitDef } from '../../../game/unit'
import { simCombat, vanilla } from '../utils'
import { tizzest } from '../tizzest'

function piercer(atk: number = 1, passives = {}): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk,
    },
    passives: {
      piercing: true,
      ...passives,
    }
  }
}

const tests = {
  vsNoArmor: () => {
    const res = simCombat([
      piercer(3),
    ],[
      vanilla(4),
    ])
    tizzest(res.stateAfter.armies.invader[0].state.damage === 3)
  },
  underkillPiercing: () => {
    const res = simCombat([
      piercer(3),
    ],[
      vanilla(4, 0, {
        armor: 1,
      }),
    ])
    tizzest(res.stateAfter.armies.invader[0].state.damage === 3)
  },
  overkillPiercing: () => {
    const res = simCombat([
      piercer(3),
    ],[
      vanilla(4, 0, {
        armor: 9999,
      }),
    ])
    tizzest(res.stateAfter.armies.invader[0].state.damage === 3)
  },
  tramplePiercing: () => {
    const res = simCombat([
      piercer(3, { trample: true }),
    ],[
      vanilla(1, 0, {
        armor: 9999,
      }),
      vanilla(3),
    ])
    tizzest(res.stateAfter.armies.invader.length === 1)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 2)
  },
}

export default tests