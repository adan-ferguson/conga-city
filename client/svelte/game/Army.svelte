<script lang="ts">
  import { type GameInstance, gameUnitInstances, type SlotNumber } from '../../../game/game'
  import { fly, fade } from 'svelte/transition'
  import UnitInstanceC from './UnitInstance.svelte'
  import type { Team } from '../../../game/team'
  import { performTransaction, transactionStore } from '../../ts/stores/transactionStore'
  import { padArray } from '../../../game/utils'
  import type { UnitInstance } from '../../../game/units/unitInstance'
  import { cubicOut } from 'svelte/easing'

  export let team: Team
  export let gameInstance: GameInstance

  let army: UnitInstance[]
  let paddedArmy: (UnitInstance | undefined)[]
  $:{
    army = gameUnitInstances(gameInstance, team)
    paddedArmy = padArray(army, Math.min(army.length + 1, 8))
  }

  let pendingTransaction: boolean = false
  $: pendingTransaction = !!$transactionStore && team === 'player'

  function clicked(slot: SlotNumber){
    if(!pendingTransaction || !$transactionStore){
      return
    }
    performTransaction(slot)
  }

  function spawnAnim(node){
    const o = +getComputedStyle(node).opacity
    return {
      easing: cubicOut,
      css: t => `
opacity: ${t * o};
flex-basis: ${12.5 * t}%;
      `
    }
  }

  function deathAnim(node){
    const o = +getComputedStyle(node).opacity
    return {
      easing: cubicOut,
      css: t => `
opacity: ${t * o};
flex-basis: ${12.5 * t}%;
      `
    }
  }

</script>

<div
  class="base"
  class:left-side={team === 'player'}
>
  {#each paddedArmy as unitInstance, i (unitInstance?.id ?? 0)}
    <button
      in:spawnAnim
      out:deathAnim
      class="army-slot center-contents"
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
    flex: 0 0 12.5%;
    height: 100%;
  }
</style>