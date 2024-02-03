<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { combatRounds } from '../../../shared/combat'
  import { endDay, gameOver } from '../../../shared/game'
</script>

<div class="flex-cols flex-centered">
  <span class="day-and-week">
    Week { $gameInstance.state.week }, Day { $gameInstance.state.day }
  </span>
  <span class="rounds">
    Rounds: { combatRounds($gameInstance) }
  </span>
  <button
    disabled={gameOver($gameInstance)}
    on:click={() => gameInstance.set(endDay($gameInstance))}>End Day</button>
</div>

<style>
div {
  gap: 20px;
}
</style>