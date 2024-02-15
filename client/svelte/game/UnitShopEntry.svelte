<script lang="ts">
  import UnitVisualization from './UnitVisualization.svelte'
  import type { UnitShopEntry } from '../../../game/shop'
  import { gameShop } from '../../../game/shop'

  export let unitShopEntry: UnitShopEntry
</script>

<UnitVisualization
  atk={gameShop.getStatValue(unitShopEntry, 'atk')}
  hp={gameShop.getStatValue(unitShopEntry, 'hp')}
  icon={unitShopEntry.def.name}
/>