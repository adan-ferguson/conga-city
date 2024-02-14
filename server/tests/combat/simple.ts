import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
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
      invader: [
        vanilla(5, 5),
      ].map(gameUnit.toInstanceDef)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 5, 'Wall dealt 5 damage')
  },
  vanillaMeleeCombat: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(4, 4)
      ].map(gameUnit.toInstanceDef),
      invader: [
        vanilla(5, 5)
      ].map(gameUnit.toInstanceDef),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 0, 'No wall damage')
    tizzest(res.stateAfter.armies.player.length === 0, 'Player unit destroyed')
    tizzest(res.stateAfter.armies.invader[0].state.damage === 4, 'Invader unit damaged')
  },
}

export default tests