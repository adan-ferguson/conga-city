<script lang="ts">
    import UnitVisualization from './UnitVisualization.svelte'
    import { type UnitInstance } from '../../../game/unit'
    import { UnitInstanceFns } from '../../../game/unitInstance'

    export let unitInstance: UnitInstance
</script>

<UnitVisualization
  atk={UnitInstanceFns.getStatValue(unitInstance, 'atk')}
  hp={UnitInstanceFns.getHp(unitInstance)}
  icon={unitInstance.def.name}
/>