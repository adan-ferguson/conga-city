import { blankGi, makeArmy, vanilla } from '../utils'
import { UnitFns, type UnitDef } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'
import { ArmyFns } from '../../../game/army'

function ranger(passives = {}): UnitDef{
  return {
    name: 'Ranger',
    stats: {
      atk: 1,
    },
    passives: {
      ...passives,
      ranged: true,
    }
  }
}

const tests = {
  standardRange: () => {
    const game = blankGi()
    game.state.armies = {
      player: makeArmy([
        vanilla(5),
        ranger(),
      ]),
      invader: makeArmy([
        vanilla(5),
        vanilla(5),
      ]),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 1, 'Front takes 1 damage.')
  },
}

export default tests