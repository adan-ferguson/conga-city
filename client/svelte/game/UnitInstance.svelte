<script lang="ts">
    import UnitVisualization from './UnitVisualization.svelte'
    import { type UnitInstance } from '../../../game/unit'
    import { gameUnitInstance } from '../../../game/unitInstance'

    export let unitInstance: UnitInstance
</script>

<UnitVisualization
  atk={gameUnitInstance.getStatValue(unitInstance, 'atk')}
  hp={gameUnitInstance.getHp(unitInstance)}
  icon={unitInstance.def.name}
/>