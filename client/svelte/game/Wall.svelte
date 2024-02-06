<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'

  import { wallHealth } from '../../../game/game'
</script>

<div>
  [{wallHealth($gameInstance)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>