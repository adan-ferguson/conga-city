<script lang="ts">
  import Army from './Army.svelte'
</script>

<div class="flex-cols">
  <Army team="player"/>
  <Army team="invader"/>
</div>

<style>
  div {
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
</style>