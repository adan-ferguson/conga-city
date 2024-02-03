<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import { getArmy, Team } from '../../../game/game'
  import UnitInstance from './UnitInstance.svelte'
  export let team: Team
  const army = getArmy($gameInstance, team)
</script>

<div class:left-side={team === Team.Player}>
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