<script lang="ts">
  import { type GameInstance, wallHealth } from '../../../game/game'
  export let gameInstance: GameInstance
</script>

<div>
  [{wallHealth(gameInstance)}]
</div>

<style>
  div {
    font-size: 0.7em;
  }
</style>