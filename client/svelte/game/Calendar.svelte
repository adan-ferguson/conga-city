<script lang="ts">
  import { gameStateStore, getGameInstance, previewStateStore } from '../../ts/stores/gameStores'
  import { combatRounds } from '../../../game/combat'
  import { endDay } from '../../../game/game'
  import Icon from '../Icon.svelte'
  import { combatReenactment } from '../../ts/combatReenactment'

  let previewing = false

  function endDayClicked(){
    const gameInstance = getGameInstance()
    const ret = endDay(gameInstance)
    if(!ret){
      return
    }
    combatReenactment.play({
      def: gameInstance.def,
      before: gameInstance.state,
      after: ret.stateAfter,
      results: ret.results,
    })
  }

  function undo(){
    gameStateStore.undo()
  }

  function preview(){
    const result = endDay(getGameInstance())
    previewing = true
    previewStateStore.set(result.stateAfter)
  }

  function unpreview(){
    if(!previewing){
      return
    }
    previewStateStore.set(undefined)
    previewing = false
  }

</script>

<div class="flex-cols">
  <span class="day-and-week">
    Week { $gameStateStore.week }, Day { $gameStateStore.day }
  </span>
  <span class="rounds">
    Rounds:
    {#each { length: combatRounds(getGameInstance()) } as _, i}
      <Icon type="sword" --color="{i > 0 ? 'red' : 'white'}"/>
    {/each}
  </span>
  <section class="buttons">
    <button
      class="clickable-padded"
      on:click={endDayClicked}
    >End Day
    </button>
    <button
      class="clickable-padded"
      on:pointerdown={preview}
      on:pointerup={unpreview}
      on:pointerleave={unpreview}
      on:pointercancel={unpreview}
    >
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
  font-size: 0.6em;
  align-items: center;
  justify-content: space-between;
}
.rounds {

}
</style>