<script lang="ts">
  import UnitVisualization from './UnitVisualization.svelte'
  import type { UnitDef } from '../../../shared/units/unit'

  export let unitShopEntry: UnitDef
</script>

<UnitVisualization
        atk={unitShopEntry.stats.atk}
        hp={unitShopEntry.stats.hp}
/>