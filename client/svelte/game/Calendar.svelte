<script lang="ts">
  import { gameStateStore } from '../../ts/game'

  function undo(){
    gameStateStore.undo()
  }

</script>

<div class="flex-cols">
  <span class="day-and-week">
    Week { $gameStateStore.week }, Day { $gameStateStore.day }
  </span>
  <section class="buttons">
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
  font-size: 0.6em;
  align-items: center;
  justify-content: space-between;
}
</style>