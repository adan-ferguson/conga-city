import { blankGi, vanilla } from '../utils'
import { gameUnit, type UnitDef } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

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
      player: [
        vanilla(5),
        ranger(),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(5),
        vanilla(5),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 1, 'Front takes 1 damage.')
  },
}

export default tests