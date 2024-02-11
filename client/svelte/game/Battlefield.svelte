<script lang="ts">
  import Army from './Army.svelte'
  import Wall from './Wall.svelte'
  import { previewStateStore, gameStateStore, gameDefStore } from '../../ts/stores/gameStores'
  import type { GameInstance } from '../../../game/game'

  let gameInstance: GameInstance
  $:{
    const def = $gameDefStore
    gameInstance = {
      def,
      state: $previewStateStore ?? $gameStateStore
    }
  }

</script>

<div>
  <Wall {gameInstance}></Wall>
  <span class="divider"/>
  <Army {gameInstance} team='player'/>
  <span class="divider"/>
  <Army {gameInstance} team='invader'/>
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 5vh 0.1vh 1fr 0.1vh 1fr;
    align-items: stretch;
    justify-content: center;
    gap: 1vh;
    padding: 0 0.5vh;
    & .divider {
      background-color: red;
    }
  }
</style>