import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
import { fillArray } from '../../../game/utils'
import { tizzest } from '../tizzest'
import { gameChoices } from '../../../game/choices'

const tests = {
  autoWithNotFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = fillArray(2, () => vanilla(1)).map(gameUnit.toSerializedUnitInstance)
    tizzest(gameChoices.isValid(game, 'spawnSlot', 'auto'))
  },
  autoWithFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = fillArray(8, () => vanilla(1)).map(gameUnit.toSerializedUnitInstance)
    tizzest(!gameChoices.isValid(game, 'spawnSlot', 'auto'))
  },
  slotWithNotFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = fillArray(2, () => vanilla(1)).map(gameUnit.toSerializedUnitInstance)
    tizzest(gameChoices.isValid(game, 'spawnSlot', 1))
  },
  slotWithFilledArmy: () => {
    const game = blankGi()
    game.state.armies.player = fillArray(8, () => vanilla(1)).map(gameUnit.toSerializedUnitInstance)
    tizzest(!gameChoices.isValid(game, 'spawnSlot', 1))
  }
}

export default tests