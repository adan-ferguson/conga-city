import type { UnitDef } from '../../game/units/unit'
import type { Stats } from '../../game/stats'
import { createNewGameInstance, getUnitInstance, instantiateUnitDef } from '../../game/game'
import type { UnitInstance } from '../../game/units/unitInstance'

export function tizzest(result: boolean, message: string = ''){
  if(!result){
    throw new TizzestError(message)
  }
}

export class TizzestError{
  message: string
  constructor(message: string){
    this.message = message
  }
}

export function vanilla(hp: number): UnitDef;
export function vanilla(hp: number, atk: number): UnitDef;
export function vanilla(hp: number, stats: Stats): UnitDef;
export function vanilla(hp: number, atk: number, stats: Stats): UnitDef;
export function vanilla(hp: number, atkOrStats?: Stats | number, stats?: Stats): UnitDef{

  const def: UnitDef = {
    name: 'test',
    stats: {
      atk: 0,
      hp,
    }
  }

  if(typeof atkOrStats === 'number' ){
    // @ts-expect-error This error is nonsense
    def.stats.atk = atkOrStats
    if(stats){
      def.stats = {
        ...stats,
        ...def.stats,
      }
    }
  }else if(atkOrStats && typeof atkOrStats === 'object'){
    def.stats = {
      ...atkOrStats,
      ...def.stats,
    }
  }

  return def
}

export function makeUnitInstance(unitDef: UnitDef): UnitInstance{
  const gi = blankGi()
  gi.state.armies.player = [instantiateUnitDef(unitDef)]
  return getUnitInstance(gi, 'player', 0)!
}

export function blankGi(){
  return createNewGameInstance({
    scenario: 'blank'
  })
}