<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { gameUnitInstances, type SlotNumber } from '../../../game/game'
  import UnitInstanceC from './UnitInstance.svelte'
  import type { Team } from '../../../game/team'
  import { performTransaction, transactionStore } from '../../ts/transactionStore'
  import { padArray } from '../../../game/utils'
  export let team: Team
  
  let army
  let paddedArmy
  gameInstance.subscribe(val => {
    army = gameUnitInstances(val, team)
    paddedArmy = padArray(army, 8)
  })

  let pendingTransaction: boolean = false
  $: pendingTransaction = !!$transactionStore && team === 'player'

  function clicked(slot: SlotNumber){
    if(!pendingTransaction || !$transactionStore){
      return
    }
    performTransaction(slot)
  }

</script>

<div
  class="base"
  class:left-side={team === 'player'}
>
  {#each paddedArmy as unitInstance, i}
    <button
      class="army-slot"
      on:click={() => clicked(i)}
      class:clickable={pendingTransaction && (unitInstance || i === army.length)}
    >
      {#if unitInstance}
        <UnitInstanceC {unitInstance}/>
      {/if}
    </button>
  {/each}
</div>

<style>
  div.base {
    display: flex;
    overflow: hidden;
    gap: 0.5vh;
    align-items: center;
    &.left-side {
      flex-direction: row-reverse;
    }
  }
  button.army-slot {
    flex: 0 1 12.5%;
    height: 100%;
  }
</style>