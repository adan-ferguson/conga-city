import { createNewGameInstance, endDay, instantiateUnitDef } from '../../../game/game'
import { vanilla } from '../../../game/units/unitFactory'
import { tizzest } from '../utils'

const tests = {
  wallDamageIfNoPlayer: () => {
    const gi = createNewGameInstance()
    gi.state.armies = {
      player: [],
      invader: [
        vanilla('a', 5),
      ].map(instantiateUnitDef)
    }
    const newGi = endDay(gi)
    if(newGi === false){
      return tizzest(false, 'endDay returned false')
    }
    tizzest(newGi.state.wallDamage === 5, 'Wall dealt 5 damage')
  }
}

export default tests