import type { UnitDef } from '../../../game/unit'

function trampler(hp: number = 1): UnitDef{
  return {
    name: 'Striker',
    stats: {
      atk: 1,
      hp,
    },
    passives: {
      trample: true,
    }
  }
}

const tests = {
  trampleOverOne: () => {
  },
  trampleOverMany: () => {
  },
  trampleToWall: () => {
  },
  armoredTarget: () => {
  },
  trampleWithBackTarget: () => {
  },
}

export default tests