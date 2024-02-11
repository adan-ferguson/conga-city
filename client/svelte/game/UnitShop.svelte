<script lang="ts">
  import { gameStateStore } from '../../ts/stores/gameStores'
  import { getUnitShopEntries, type UnitShopEntry } from '../../../game/shop'
  import { performTransaction, transactionStore } from '../../ts/stores/transactionStore'
  import UnitShopEntryC from './UnitShopEntry.svelte'

  const unitShopEntries = getUnitShopEntries($gameStateStore)

  function startTransaction(unitShopEntry: UnitShopEntry){
    if($transactionStore?.data === unitShopEntry){
      performTransaction()
    }else{
      // TODO: Test if this transaction is valid
      transactionStore.set({
        type: 'unit',
        data: unitShopEntry,
      })
    }
  }

</script>

<ul>
  {#each Object.entries(unitShopEntries) as [key, unitShopEntry] (key)}
    <li class="flex-cols flex-centered">
      <UnitShopEntryC {unitShopEntry}/>
      <button class='clickable-padded' on:click|stopPropagation={() => startTransaction(unitShopEntry)}>
        Buy
      </button>
    </li>
  {/each}
</ul>

<style>
  ul {
    gap: 0.2rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 4rem;
    & li {
      border: 0.1rem solid #797979;
      padding: 0.3rem 0.6rem;
      flex: 0 0 30%;
      gap: 0.2rem;
      justify-content: start;
      border-radius: 0.5rem;
    }
  }
</style>