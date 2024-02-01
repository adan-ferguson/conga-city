<script lang="ts">
  import type { UnitInstance } from '../../../shared/units/unit'
  import { getStat } from '../../../shared/stats'
  import Icon from '../Icon.svelte'

  export let unitInstance: UnitInstance
</script>

<div class="base flex-rows flex-centered">
  <div class="unit-image"></div>
  <div class="stats flex-cols flex-centered">
    <Icon val={getStat(unitInstance, 'atk')} type="sword"/>
    <Icon val={getStat(unitInstance, 'hp')} type="heart"/>
  </div>
</div>

<style>
  div.base {
    height: 100%;
  }
  .stats {
    font-size: 0.6em;
  }
  div.unit-image {
    border: 0.1rem solid white;
    aspect-ratio: 1/1;
  }
</style>