<script lang="ts">
  import { gameInstanceStore } from '../../ts/game'
  import { gameShop, type UnitShopKey } from '../../../game/shop'
  import { addChoice, setupAction, pendingActionStore } from '../../ts/pendingAction'
  import UnitShopEntryC from './UnitShopEntry.svelte'
  import { buyUnitAction } from '../../../game/actionDefs/buyUnitAction'

  const unitShopEntries = gameShop.getEntries($gameInstanceStore)

  function startTransaction(key: UnitShopKey){
    if($pendingActionStore?.key === key){
      addChoice('auto')
    }else{
      const action = buyUnitAction($gameInstanceStore, key)
      if(action){
        setupAction(action, key)
      }
    }
  }

</script>

<ul>
  {#each Object.entries(unitShopEntries) as [key, unitShopEntry] (key)}
    <li class="flex-cols flex-centered">
      <UnitShopEntryC {unitShopEntry}/>
      <button class='clickable-padded' on:click|stopPropagation={() => startTransaction(unitShopEntry.key)}>
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