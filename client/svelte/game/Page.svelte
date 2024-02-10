<script lang="ts">
  import Calendar from './Calendar.svelte'
  import Battlefield from './Battlefield.svelte'
  import Town from './Town.svelte'
  import { transactionStore } from '../../ts/transactionStore'

  $: console.log($transactionStore)
</script>

<div class="page">
  <Town></Town>
  <Battlefield></Battlefield>
  <Calendar></Calendar>
</div>

<style>
  div {
    display: grid;
    grid-template-rows: 80% 12% 8%;
    align-items: stretch;
  }
</style>