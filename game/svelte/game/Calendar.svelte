<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { combatRounds } from '../../../shared/combat'
  import { endDay } from '../../../shared/game'

</script>

<div class="flex-cols flex-centered">
  <span class="day-and-week">
    Day { $gameInstance.state.day }, Week { $gameInstance.state.week }
  </span>
  <span class="rounds">
    Rounds: { combatRounds($gameInstance) }
  </span>
  <button on:click={() => endDay($gameInstance)}>End Day</button>
</div>

<style>
div {
  gap: 20px;
}
</style>