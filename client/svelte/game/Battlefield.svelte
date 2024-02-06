<script lang="ts">
  import Army from './Army.svelte'
  import Wall from './Wall.svelte'
</script>

<div>
  <Wall></Wall>
  <Army team='player'/>
  <Army team='invader'/>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 5vh 1fr 1fr;
    align-items: stretch;
    justify-content: center;
    gap: 0.5vh;
    padding: 0 0.5vh;
  }
</style>