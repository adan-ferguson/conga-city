import { createNewGameInstance, endDay, GameInstance, instantiateUnitDef } from '../../../game/game'
import { tizzest, vanilla } from '../utils'

const tests = {
  simpleRanged: () => {
    const gi = createNewGameInstance()
    gi.state.armies = {
      player: [
        vanilla(5)
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 1),
        vanilla(1, 1, {
          range: 2,
        })
      ].map(instantiateUnitDef)
    }
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.armies.player[0].state.damage === 2, 'Both should hit player[0]')
  },
  minimumRange1: () => {
    const gi = createNewGameInstance()
    gi.state.armies = {
      player: [
        vanilla(2, 1, {
          range: 0,
        })
      ].map(instantiateUnitDef),
      invader: [
        vanilla(2, 1, {
          range: -9999,
        })
      ].map(instantiateUnitDef)
    }
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.armies.player[0].state.damage === 1)
    tizzest(newGi.state.armies.invader[0].state.damage === 1)
  },
  noUndershoot: () => {
    const gi = createNewGameInstance()
    gi.state.armies = {
      player: [
        vanilla(5),
        vanilla(5),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(1, 1, {
          range: 2,
        })
      ].map(instantiateUnitDef)
    }
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.armies.player[0].state.damage === 0)
    tizzest(newGi.state.armies.player[1].state.damage === 1)
  },
  noOvershoot: () => {
    const gi = createNewGameInstance()
    gi.state.armies = {
      player: [
        vanilla(5),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(5),
        vanilla(1, 1, {
          range: 9993,
        })
      ].map(instantiateUnitDef)
    }
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.wallDamage === 0)
    tizzest(newGi.state.armies.player[0].state.damage === 1)
  }
}

export default tests