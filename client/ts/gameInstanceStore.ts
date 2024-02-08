import { writable } from 'svelte/store'
import type { GameInstance } from '../../game/game'
import { createNewGameInstance } from '../../game/game'

export const gameInstance = writable<GameInstance>(undefined, set => {
  set(createNewGameInstance({
    scenario: 'test'
  }))
})