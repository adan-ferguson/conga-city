import { readable } from 'svelte/store'
import type { GameInstance } from '../../shared/game'
import { createNewGameInstance } from '../../shared/game'

export const gameInstance = readable<GameInstance>(undefined, set => {
  set(createNewGameInstance())
})