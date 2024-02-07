import { UnitDef } from '../../game/units/unit'
import { Stats } from '../../game/stats'

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