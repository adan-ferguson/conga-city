<script lang="ts">
  import { icons } from '../ts/icons'

  export let val: string | number | undefined
  export let type: keyof typeof icons
</script>

<style>
  span.base {
    display: inline-flex;
    align-items: center;
    gap: 0.1em;
    overflow: hidden;
    max-width: 2em;
    & svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
</style>

<span class="base">
  {#if val}
    <span>{val}</span>
  {/if}
  {@html icons[type].svg}
</span>