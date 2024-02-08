<script lang="ts">
    import UnitVisualization from './UnitVisualization.svelte'
    import { getHp, getUnitInstanceStatValue, type UnitInstance } from '../../../game/units/unitInstance'

    export let unitInstance: UnitInstance
</script>

<UnitVisualization
  atk={getUnitInstanceStatValue(unitInstance, 'atk')}
  hp={getHp(unitInstance)}
  icon={unitInstance.def.name}
/>