import type { UnitDef } from '../../game/unit'
import type { Stats } from '../../game/stats'
import type { SerializedUnitInstance } from '../../game/unitInstance'
import { UnitFns } from '../../game/unit'
import { gameGame } from '../../game/game'

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

  if(typeof atkOrStats === 'number'){
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

export function blankGi(){
  return gameGame.createNewInstance({
    scenario: 'blank'
  })
}

export function simCombat(playerArmy: UnitDef[] = [], invaderArmy: UnitDef[] = []){
  const gi = blankGi()
  gi.state.armies = {
    player: makeArmy(playerArmy),
    invader: makeArmy(invaderArmy),
  }
  return gameGame.endDay(gi)
}

export function makeArmy(defs1: UnitDef[], defs2: UnitDef[] = []): SerializedUnitInstance[]{
  const defs = [defs1, defs2]
  const uis: SerializedUnitInstance[] = []
  for(let row = 0; row < defs.length; row++){
    for(let col = 0; col < defs.length; col++){
      uis.push(UnitFns.toSerializedUnitInstance(defs[row][col], { row, col }))
    }
  }
  return uis
}