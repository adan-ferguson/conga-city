import { blankGi, vanilla } from '../utils'
import { gameUnit, type UnitDef } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'
import type { TargetType } from '../../../game/abilities'

function t(target: TargetType): UnitDef{
  return {
    name: 'T',
    stats: {
      atk: 1,
    },
    passives: {
      target: target,
    }
  }
}

const tests = {
  backTarget: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        t('back')
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(5),
        vanilla(5),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 0, 'Front takes 0 damage.')
    tizzest(res.stateAfter.armies.invader[1].state.damage === 1, 'Back takes 1 damage.')
  },
  lowHp: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        t('lowHp')
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(5),
        vanilla(4),
        vanilla(5),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.armies.invader[1].state.damage === 1, 'Front takes 0 damage.')
  },
  wall: () => {
    const game = blankGi()
    game.state.armies = {
      player: [
        t('wall')
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        t('wall')
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(game)
    tizzest(res.stateAfter.wallDamage === 1, 'Wall hit.')
    tizzest(res.stateAfter.armies.player[0].state.damage === 0, 'Invader attack did not hit unit.')
    tizzest(res.stateAfter.armies.invader[0].state.damage === 0, 'Player attack did nothing.')
  },
}

export default tests