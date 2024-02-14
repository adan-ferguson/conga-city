<script lang="ts">
  import { gameUnitInstances } from '../../../game/game'
  import UnitInstanceC from './UnitInstance.svelte'
  import type { Team } from '../../../game/team'
  import { performTransaction, pendingActionStore } from '../../ts/pendingAction'
  import { padArray } from '../../../game/utils'
  import type { UnitInstance } from '../../../game/unit'
  import { cubicOut } from 'svelte/easing'
  import { gameInstanceStore } from '../../ts/game'
  import type { SlotNumber } from '../../../game/types'

  export let team: Team

  let army: UnitInstance[]
  let paddedArmy: (UnitInstance | undefined)[]
  $:{
    army = gameUnitInstances($gameInstanceStore, team)
    paddedArmy = padArray(army, Math.min(army.length + 1, 8))
  }

  let pendingTransaction: boolean = false
  $: pendingTransaction = !!$pendingActionStore && team === 'player'

  function clicked(slot: SlotNumber){
    if(!pendingTransaction || !$pendingActionStore){
      return
    }
    performTransaction(slot)
  }

  function spawnAnim(node: HTMLElement){
    const o = +getComputedStyle(node).opacity
    return {
      easing: cubicOut,
      css: (t: number) => `
opacity: ${t * o};
flex-basis: ${12.5 * t}%;
      `
    }
  }

  function deathAnim(node: HTMLElement){
    const o = +getComputedStyle(node).opacity
    return {
      easing: cubicOut,
      css: (t: number) => `
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