<script lang="ts">
  import { wallHealth } from '../../../game/game'
  import { gameInstanceStore } from '../../ts/game'
</script>

<div>
  [{wallHealth($gameInstanceStore)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>