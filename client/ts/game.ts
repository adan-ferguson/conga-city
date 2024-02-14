import { derived, writable } from 'svelte/store'
import type { GameDef, GameInstance, GameState } from '../../game/game'

const { subscribe, set } = writable<GameState>()
const history: GameState[] = []

subscribe(() => {
  console.log(history)
})

function undo(){
  if(!canUndo()){
    return
  }
  history.pop()
  set(history.at(-1)!)
}

function canUndo(){
  return history.length > 1
}

function push(state: GameState){
  history.push(state)
  set(state)
}

export const gameStateStore = {
  subscribe,
  set,
  undo,
  push,
}

export const gameDefStore = writable<GameDef>()

type S = [typeof gameStateStore, typeof gameDefStore]
export const gameInstanceStore = derived<S, GameInstance>(
  [gameStateStore, gameDefStore],
  ([state, def]) => {
    return { state, def }
  }
)