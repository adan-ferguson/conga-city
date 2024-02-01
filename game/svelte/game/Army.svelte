<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import Unit from './Unit.svelte'
  import { getArmy, Team } from '../../../shared/game'
  export let team: Team
  const army = getArmy($gameInstance, team)
</script>

<div class:left-side={team === Team.Player}>
  {#each army as unitInstance}
    <Unit {unitInstance}/>
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