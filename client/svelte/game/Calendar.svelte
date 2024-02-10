<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { combatRounds } from '../../../game/combat'
  import { endDay, gameOver } from '../../../game/game'
</script>

<div class="flex-cols flex-centered">
  <span class="day-and-week">
    Week { $gameInstance.state.week }, Day { $gameInstance.state.day }
  </span>
  <span class="rounds">
    Rounds: { combatRounds($gameInstance) }
  </span>
  <button
    class="clickable-padded"
    disabled={gameOver($gameInstance)}
    on:click={() => {
      const after = endDay($gameInstance)
      if(after){
        gameInstance.set(after)
      }
    }}>End Day</button>
</div>

<style>
div {
  gap: 20px;
}
</style>