import { UnitDef } from './unit'

export function vanilla(name: string, atk: number, hp: number = atk): UnitDef{
  return {
    name,
    stats: {
      atk,
      hp,
    }
  }
}