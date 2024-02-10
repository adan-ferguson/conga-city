<script lang="ts">
  import { gameInstanceStore } from '../../ts/gameInstanceStore'
  import { combatRounds } from '../../../game/combat'
  import { endDay } from '../../../game/game'

  function endDayClicked(){
    const after = endDay($gameInstanceStore)
    if(after){
      gameInstanceStore.newDay(after)
    }
  }

  function undo(){
    gameInstanceStore.undo()
  }

</script>

<div class="flex-cols flex-centered">
  <span class="day-and-week">
    Week { $gameInstanceStore.state.week }, Day { $gameInstanceStore.state.day }
  </span>
  <span class="rounds">
    Rounds: { combatRounds($gameInstanceStore) }
  </span>
  <section class="buttons">
    <button
      class="clickable-padded"
      on:click={endDayClicked}
    >End Day
    </button>
    <button class="clickable-padded">
      Preview
    </button>
    <button
      class="clickable-padded"
      on:click={undo}
    >
      Undo
    </button>
  </section>
</div>

<style>
div {
  gap: 20px;
}
</style>