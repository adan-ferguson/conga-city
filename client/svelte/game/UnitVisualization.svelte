<script lang="ts">
  import Icon from '../Icon.svelte'

  export let atk: number
  export let hp: number


</script>

<div class="base flex-rows flex-centered">
  <div class="unit-image"></div>
  <div class="stats flex-cols flex-centered">
    <Icon val={atk} type="sword"/>
    <Icon val={hp} type="heart"/>
  </div>
</div>

<style>
  div.base {
    height: 3rem;
    width: 2rem;
  }
  .stats {
    font-size: 0.6em;
  }
  div.unit-image {
    border: 0.1rem solid white;
    height: 2em;
    width: 2rem;
  }
</style>