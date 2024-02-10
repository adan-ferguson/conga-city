<script lang="ts">
  import { gameInstanceStore } from '../../ts/gameInstanceStore'

  import { wallHealth } from '../../../game/game'
</script>

<div>
  [{wallHealth($gameInstanceStore)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>