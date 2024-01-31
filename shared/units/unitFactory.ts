import { UnitDef } from './unit'

export function vanilla(name: string, atk: number, hp: number): UnitDef{
  return {
    name,
    stats: {
      atk,
      hp,
    }
  }
}