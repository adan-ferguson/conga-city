import { blankGi, vanilla } from '../utils'
import { gameUnit } from '../../../game/unit'
import { gameGame } from '../../../game/game'
import { tizzest } from '../tizzest'

const tests = {
  noNegativeArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: -5 }),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 1),
      ].map(gameUnit.toSerializedUnitInstance)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  zeroArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 0 }),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 1),
      ].map(gameUnit.toSerializedUnitInstance)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  oneArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 1 }),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 3),
      ].map(gameUnit.toSerializedUnitInstance)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 2)
  },
  twoArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 2 }),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 3),
      ].map(gameUnit.toSerializedUnitInstance)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  overkillArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 6 }),
      ].map(gameUnit.toSerializedUnitInstance),
      invader: [
        vanilla(1, 3),
      ].map(gameUnit.toSerializedUnitInstance)
    }
    const res = gameGame.endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 0)
  }
}

export default tests