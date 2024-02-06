<script lang="ts">
  import type { ComponentType } from 'svelte'
  import { loadCoolPage } from '../ts/coolRouter'

  let currentPage: ComponentType | undefined

  loadCoolPage().then(page => {
    currentPage = page
  })

</script>

<div>
  <svelte:component this="{currentPage}"/>
</div>

<style>

div {
  background-color: #424242;
}

</style>