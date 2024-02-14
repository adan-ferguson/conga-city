import { gameStats } from '../../../game/stats'
import { tizzest } from '../tizzest'

const gv = gameStats.getValue

const tests = {
  min: () => {
    tizzest(gv({ atk: -5 }, 'atk') === 0, 'No negative atk')
    tizzest(gv({ hp: 0 }, 'hp') === 1, 'Hp at least 1')
  },
  default: () => {
    tizzest(gv({}, 'atk') === 0, 'Atk default 0')
    tizzest(gv({}, 'hp') === 1, 'Hp default 1')
  },
  integer: () => {
    tizzest(gv({ atk: 1.5 }, 'atk') === 2, 'Round up to 2')
    tizzest(gv({ atk: 1.1 }, 'atk') === 1, 'Round down to 1')
  }
}

export default tests