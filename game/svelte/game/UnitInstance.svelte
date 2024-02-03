<script lang="ts">
    import UnitVisualization from './UnitVisualization.svelte'
    import { getStat } from '../../../shared/stats'
    import type { UnitInstance } from '../../../shared/units/unit'
    import { getHp } from '../../../shared/units/unitInstance'

    export let unitInstance: UnitInstance
</script>

<UnitVisualization
  atk={getStat(unitInstance, 'atk')}
  hp={getHp(unitInstance)}
/>