<script>
  import { gameInstance } from '../../ts/gameInstanceStore.js'
  import { getUnitShopEntries } from '../../../shared/shop.js'
  import UnitShopEntry from './UnitShopEntry.svelte'

  const unitShopEntries = getUnitShopEntries($gameInstance)
</script>

<ul>
  {#each unitShopEntries as unitShopEntry}
    <UnitShopEntry {unitShopEntry}/>
  {/each}
</ul>