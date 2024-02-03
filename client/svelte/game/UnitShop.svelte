<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import UnitShopEntry from './UnitShopEntry.svelte'
  import { getUnitShopEntries } from '../../../game/shop'

  const unitShopEntries = getUnitShopEntries($gameInstance)
</script>

<ul>
  {#each unitShopEntries as unitShopEntry}
    <UnitShopEntry {unitShopEntry}/>
  {/each}
</ul>