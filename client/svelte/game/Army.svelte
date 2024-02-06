<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { gameUnitInstances } from '../../../game/game'
  import UnitInstance from './UnitInstance.svelte'
  import type { Team } from '../../../game/team'
  export let team: Team
  const army = gameUnitInstances($gameInstance, team)
</script>

<div class:left-side={team === 'player'}>
  {#each army as unitInstance}
    <UnitInstance {unitInstance}/>
  {/each}
</div>

<style>
  div {
    display: flex;
    overflow: hidden;
    gap: 0.5vh;
    align-items: center;
    & > * {
      flex: 0 1 12.5%;
    }
    &.left-side {
      flex-direction: row-reverse;
    }
  }
</style>