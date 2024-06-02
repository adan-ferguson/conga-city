import { blankGi, makeArmy, vanilla } from '../utils'
import { UnitFns } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

const tests = {
  enemyHasNoUnits: () => {
    // ?? end day should work, but nothing should happen
  },
  wallDamageIfNoPlayer: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [],
      invader: makeArmy([
        vanilla(5, 5),
      ])
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 5, 'Wall dealt 5 damage')
  },
  vanillaMeleeCombat: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: makeArmy([
        vanilla(4, 4)
      ]),
      invader: makeArmy([
        vanilla(5, 5)
      ]),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 0, 'No wall damage')
    tizzest(res.stateAfter.armies.player.length === 0, 'Player unit destroyed')
    tizzest(res.stateAfter.armies.invader[0].state.damage === 4, 'Invader unit damaged')
  },
}

export default tests