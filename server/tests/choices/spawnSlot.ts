import { blankGi, makeArmy, vanilla } from '../utils'
import { fillArray } from '../../../game/utils'
import { tizzest } from '../tizzest'
import { gameChoices } from '../../../game/choices'

const tests = {
  autoWithNotFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = makeArmy(fillArray(2, () => vanilla(1)))
    tizzest(gameChoices.isValid(game, 'spawnSlot', 'auto'))
  },
  autoWithFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = makeArmy(
      fillArray(4, () => vanilla(1)),
      fillArray(4, () => vanilla(1)),
    )
    tizzest(!gameChoices.isValid(game, 'spawnSlot', 'auto'))
  },
  slotWithNotFilledRow: () => {
    const game = blankGi()
    game.state.armies.player = makeArmy(fillArray(2, () => vanilla(1)))
    tizzest(gameChoices.isValid(game, 'spawnSlot', {
      row: 0,
      col: 0,
    }))
  },
  slotWithFilledRow: () => {
    const game = blankGi()
    game.state.armies.player = makeArmy(
      fillArray(4, () => vanilla(1)),
    )
    tizzest(!gameChoices.isValid(game, 'spawnSlot', {
      row: 0,
      col: 0,
    }))
  }
}

export default tests