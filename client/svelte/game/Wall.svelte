<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { wallHealth } from '../../../game/units/unitInstance'
</script>

<div>
  [{wallHealth($gameInstance)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>