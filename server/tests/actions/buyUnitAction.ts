import { blankGi, makeArmy, vanilla } from '../utils'
import { type ActionDef, gameActions } from '../../../game/actions'
import { buyUnitAction } from '../../../game/actionDefs/buyUnitAction'
import { tizzest, tizzestMustError } from '../tizzest'
import { fillArray } from '../../../game/utils'

const tests = {
  buyWithNoChoice: () => {
    const game = blankGi()
    const def = buyUnitAction(game, 'archer')
    tizzest(def !== false, 'Buy action is possible, should not return false.')
    tizzestMustError(() => {
      gameActions.perform(<ActionDef>def, game)
    }, 'Did not throw error even though choices were invalid.')
  },
  buyWithFullParty: () => {
    const game = blankGi()
    game.state.armies.player = makeArmy(fillArray(8, () => vanilla(1)))
    const def = buyUnitAction(game, 'archer')
    tizzest(def === false, 'Buy unit action was invalid so should return false.')
  },
  buyWithAuto: () => {
    const game = blankGi()
    const def = buyUnitAction(game, 'archer')
    game.state.armies.player = makeArmy(fillArray(3, () => vanilla(1)))
    const result = gameActions.perform(<ActionDef>def, game, ['auto'])
    tizzest(result.stateAfter.armies.player.length === 4, '4th unit now')
    tizzest(result.stateAfter.armies.player[3].def.name === 'Archer')
  },
  buyWithSlotNumber: () => {
    const game = blankGi()
    const def = buyUnitAction(game, 'archer')
    game.state.armies.player = makeArmy(fillArray(3, () => vanilla(1)))
    const result = gameActions.perform(<ActionDef>def, game, [{ row: 0, col: 0 }])
    tizzest(result.stateAfter.armies.player.length === 4, '2nd unit now')
    tizzest(result.stateAfter.armies.player[1].def.name === 'Archer')
  },
  buyWithSlotNumberTooHigh: () => {
    const game = blankGi()
    const def = buyUnitAction(game, 'archer')
    game.state.armies.player = makeArmy(fillArray(3, () => vanilla(1)))
    const result = gameActions.perform(<ActionDef>def, game, [{ row: 0, col: 0 }])
    tizzest(result.stateAfter.armies.player.length === 4, '4th unit now')
    tizzest(result.stateAfter.armies.player[3].def.name === 'Archer')
  },
}

export default tests