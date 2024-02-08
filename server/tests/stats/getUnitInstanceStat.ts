import { makeUnitInstance, tizzest, vanilla } from '../utils'
import { getUnitInstanceStatValue } from '../../../game/units/unitInstance'

const tests = {
  min: () => {
    const ui= makeUnitInstance(vanilla(-1, -1))
    tizzest(getUnitInstanceStatValue(ui, 'atk') === 0, 'No negative atk')
    tizzest(getUnitInstanceStatValue(ui, 'hp') === 1, 'Hp at least 1')
  }
}

export default tests