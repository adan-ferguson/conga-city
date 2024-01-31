<script lang="ts">
  import { gameInstance } from '../../ts/gameInstanceStore'
  import Unit from './Unit.svelte'
  import { getArmy, Team } from '../../../shared/game'
  export let team: Team
  const army = getArmy($gameInstance, team)
</script>

<div>
  {#each army as unitInstance}
    <Unit {unitInstance}/>
  {/each}
</div>