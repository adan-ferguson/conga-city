import { writable } from 'svelte/store'
import type { GameInstance } from '../../shared/game'
import { createNewGameInstance } from '../../shared/game'

export const gameInstance = writable<GameInstance>(undefined, set => {
  set(createNewGameInstance())
})