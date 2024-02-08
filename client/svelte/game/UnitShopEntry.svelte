<script lang="ts">
  import UnitVisualization from './UnitVisualization.svelte'
  import type { UnitShopEntry } from '../../../game/shop'
  import { getUnitShopEntryStatValue } from '../../../game/shop'

  export let unitShopEntry: UnitShopEntry
</script>

<UnitVisualization
        atk={getUnitShopEntryStatValue(unitShopEntry, 'atk')}
        hp={getUnitShopEntryStatValue(unitShopEntry, 'hp')}
        icon={unitShopEntry.def.name}
/>