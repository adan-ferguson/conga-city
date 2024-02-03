<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { wallHealth } from '../../../shared/units/unitInstance'
</script>

<div>
  [{wallHealth($gameInstance)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>