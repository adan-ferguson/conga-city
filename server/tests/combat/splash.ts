import { simCombat, vanilla } from '../utils'
import { tizzest } from '../tizzest'

const tests = {
  splashOne: () => {
    const res = simCombat([
      {
        name: 'Splasher',
        stats: {
          atk: 1,
          attackArea: 1,
        }
      }
    ],[
      vanilla(1),
      vanilla(1),
      vanilla(5),
    ])
    tizzest(res.stateAfter.armies.invader.length === 1)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 0)
  },
  cleaveAll: () => {
  },
  trampleToWall: () => {
  },
  armoredTarget: () => {
  },
}

export default tests