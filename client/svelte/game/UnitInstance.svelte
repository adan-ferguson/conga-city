<script lang="ts">
    import UnitVisualization from './UnitVisualization.svelte'
    import { getStat } from '../../../game/stats'
    import { getHp, type UnitInstance } from '../../../game/units/unitInstance'

    export let unitInstance: UnitInstance
</script>

<UnitVisualization
  atk={getStat(unitInstance, 'atk')}
  hp={getHp(unitInstance)}
/>