import type { UnitDef } from '../../../game/unit'
import { UnitFns } from '../../../game/unit'
import { blankGi, makeArmy, vanilla } from '../utils'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

function trampler(atk: number = 1, passives = {}): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk,
    },
    passives: {
      trample: true,
      ...passives,
    }
  }
}

const tests = {
  trampleOverOne: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        trampler(4)
      ]),
      invader: makeArmy([
        vanilla(1),
        vanilla(4),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 1)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 3)
  },
  trampleOverMany: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        trampler(4)
      ]),
      invader: makeArmy([
        vanilla(1),
        vanilla(1),
        vanilla(1),
        vanilla(1),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 0)
  },
  trampleToWall: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(1),
      ]),
      invader: makeArmy([
        trampler(4)
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 3)
  },
  armoredTarget: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        trampler(4),
      ]),
      invader: makeArmy([
        {
          name: 'Armored',
          stats: {
            armor: 3,
            hp: 2,
          }
        },
        vanilla(1),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 2)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 1)
    tizzest(res.stateAfter.armies.invader[1].state.damage === 0)
  },
  trampleWithBackTarget: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(1),
        vanilla(1),
        vanilla(1),
        vanilla(1),
      ]),
      invader: makeArmy([
        trampler(4, {
          target: 'back',
        })
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player.length === 3)
    tizzest(res.stateAfter.wallDamage === 3)
  },
}

export default tests