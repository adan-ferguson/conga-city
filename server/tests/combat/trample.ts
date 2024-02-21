import type { UnitDef } from '../../../game/unit'
import { gameUnit } from '../../../game/unit'
import { blankGi, vanilla } from '../utils'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

function trampler(atk: number = 1, passives = {}): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk,
    },
    passives: {
      trample: true,
      ...passives,
    }
  }
}

const tests = {
  trampleOverOne: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        trampler(4)
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1),
        vanilla(4),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 1)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 3)
  },
  trampleOverMany: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        trampler(4)
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1),
        vanilla(1),
        vanilla(1),
        vanilla(1),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 0)
  },
  trampleToWall: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(1),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        trampler(4)
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.wallDamage === 3)
  },
  armoredTarget: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        trampler(4),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        {
          name: 'Armored',
          stats: {
            armor: 3,
            hp: 2,
          }
        },
        vanilla(1),
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.invader.length === 2)
    tizzest(res.stateAfter.armies.invader[0].state.damage === 1)
    tizzest(res.stateAfter.armies.invader[1].state.damage === 0)
  },
  trampleWithBackTarget: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(1),
        vanilla(1),
        vanilla(1),
        vanilla(1),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        trampler(4, {
          target: 'back',
        })
      ].map(gameUnit.toSerializedUnitInstance),
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player.length === 3)
    tizzest(res.stateAfter.wallDamage === 3)
  },
}

export default tests