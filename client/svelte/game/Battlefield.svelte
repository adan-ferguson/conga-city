<script lang="ts">
  import Army from './Army.svelte'
  import Wall from './Wall.svelte'
</script>

<div>
  <Wall></Wall>
  <span class="divider"/>
  <Army team='player'/>
  <span class="divider"/>
  <Army team='invader'/>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 5vh 0.1vh 1fr 0.1vh 1fr;
    align-items: stretch;
    justify-content: center;
    gap: 1vh;
    padding: 0 0.5vh;
    & .divider {
      background-color: red;
    }
  }
</style>