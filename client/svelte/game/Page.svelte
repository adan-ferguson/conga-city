<script lang="ts">
  import Calendar from './Calendar.svelte'
  import Battlefield from './Battlefield.svelte'
  import Town from './Town.svelte'
  import { combatReenactment } from '../../ts/combatReenactment'
</script>

{#if $combatReenactment !== undefined}
  <button class="input-blocker" on:click={combatReenactment.skip}/>
{/if}
<div class="page">
  <Town></Town>
  <Battlefield></Battlefield>
  <Calendar></Calendar>
</div>

<style>
  div {
    display: grid;
    grid-template-rows: 83% 12% 5%;
    align-items: stretch;
  }
  .input-blocker{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    opacity: 0.000001;
    background-color: white;
  }
</style>