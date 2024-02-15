<script lang="ts">
  import { gameInstanceStore } from '../../ts/game'
  import { gameWall } from '../../../game/wall'
</script>

<div>
  [{gameWall.health($gameInstanceStore)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>