<script lang="ts">
  import Calendar from './Calendar.svelte'
  import Battlefield from './Battlefield.svelte'
  import Town from './Town.svelte'
</script>

<div>
  <Town></Town>
  <Battlefield></Battlefield>
  <Calendar></Calendar>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    background-color: #424242;
    display: grid;
    grid-template-rows: auto min(6rem, 18%) min(4rem, 12%);
    align-items: center;
  }
</style>