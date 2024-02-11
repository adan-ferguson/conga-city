import { endDay, type GameInstance, instantiateUnitDef } from '../../../game/game'
import { blankGi, tizzest, vanilla } from '../utils'

const tests = {
  noNegativeArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: -5 }),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 1),
      ].map(instantiateUnitDef)
    }
    const res = endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  zeroArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 0 }),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 1),
      ].map(instantiateUnitDef)
    }
    const res = endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  oneArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 1 }),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 3),
      ].map(instantiateUnitDef)
    }
    const res = endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 2)
  },
  twoArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 2 }),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 3),
      ].map(instantiateUnitDef)
    }
    const res = endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 1)
  },
  overkillArmor: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(5, { armor: 6 }),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 3),
      ].map(instantiateUnitDef)
    }
    const res = endDay(gi)
    tizzest(res.stateAfter.armies.player[0].state.damage === 0)
  }
}

export default tests