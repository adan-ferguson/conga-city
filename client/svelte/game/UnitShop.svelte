<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { getUnitShopEntries } from '../../../game/shop'
  import { transactionStore } from '../../ts/transactionStore'
  import UnitShopEntry from './UnitShopEntry.svelte'

  const unitShopEntries = getUnitShopEntries($gameInstance)

  function startTransaction(key: keyof typeof unitShopEntries){
    transactionStore.set({
      type: 'unit',
      data: unitShopEntries[key]
    })
  }

</script>

<ul>
  {#each Object.entries(unitShopEntries) as [key, unitShopEntry] (key)}
    <li class="flex-cols flex-centered">
      <UnitShopEntry {unitShopEntry}/>
      <button class='clickable-padded' on:click|stopPropagation={() => startTransaction(key)}>
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