import { endDay, type GameInstance, instantiateUnitDef } from '../../../game/game'
import { blankGi, tizzest, vanilla } from '../utils'

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
      ].map(instantiateUnitDef)
    }
    const newGi = endDay(gi)
    if(newGi === false){
      return tizzest(false, 'endDay returned false')
    }
    tizzest(newGi.state.wallDamage === 5, 'Wall dealt 5 damage')
  },
  vanillaMeleeCombat: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(4, 4)
      ].map(instantiateUnitDef),
      invader: [
        vanilla(5, 5)
      ].map(instantiateUnitDef),
    }
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.wallDamage === 0, 'No wall damage')
    tizzest(newGi.state.armies.player.length === 0, 'Player unit destroyed')
    tizzest(newGi.state.armies.invader[0].state.damage === 4, 'Invader unit damaged')
  },
  multiRoundCombat: () => {
    const gi = blankGi()
    gi.state.armies = {
      player: [
        vanilla(3, 3),
        vanilla(3, 3),
        vanilla(3, 3),
      ].map(instantiateUnitDef),
      invader: [
        vanilla(5, 5),
        vanilla(5, 5),
      ].map(instantiateUnitDef),
    }
    gi.state.day = 4
    const newGi = <GameInstance>endDay(gi)
    tizzest(newGi.state.wallDamage === 5)
    tizzest(newGi.state.armies.player.length === 0)
    tizzest(newGi.state.armies.invader[0].state.damage === 3)
  },
}

export default tests