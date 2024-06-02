import { blankGi, makeArmy, vanilla } from '../utils'
import { UnitFns } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

const tests = {
  noNegativeArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(5, { armor: -5 }),
      ]),
      invader: makeArmy([
        vanilla(1, 1),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  zeroArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(5, { armor: 0 }),
      ]),
      invader: makeArmy([
        vanilla(1, 1),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  oneArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(5, { armor: 1 }),
      ]),
      invader: makeArmy([
        vanilla(1, 3),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 2)
  },
  twoArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(5, { armor: 2 }),
      ]),
      invader: makeArmy([
        vanilla(1, 3),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  overkillArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(5, { armor: 6 }),
      ]),
      invader: makeArmy([
        vanilla(1, 3),
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 0)
  }
}

export default tests