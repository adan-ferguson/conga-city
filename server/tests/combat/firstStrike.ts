import type { UnitDef } from '../../../game/unit'
import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

function striker(hp: number = 1): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk: 1,
      hp,
    },
    passives: {
      firstStrike: true,
    }
  }
}

const tests = {
  meleeFirstStrikeKill: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        striker(),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 1),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.player[0].state.damage === 0, 'Player took no damage.')
    tizzest(res.stateAfter.armies.invader.length === 0, 'Invader is dead.')
  },
  meleeFirstStrikeTrade: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        striker(1),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        striker(1),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.player.length === 0, 'Player is dead.')
    tizzest(res.stateAfter.armies.invader.length === 0, 'Invader is dead.')
  },
  meleeFirstStrikeNoKill: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        striker(2)
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        striker(2)
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1, 'Player took 1 damage.')
    tizzest(res.stateAfter.armies.invader[0].state.damage === 1, 'Invader took 1 damage.')
  },
  meleeFirstStrikeNoShift: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        striker()
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 1),
        vanilla(1, 1),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.player[0].state.damage === 0, 'Player took no damage.')
    tizzest(res.stateAfter.armies.invader.length === 1, 'Invader is dead.')
  },
}

export default tests