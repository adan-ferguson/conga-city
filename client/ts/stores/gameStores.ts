import { get, writable } from 'svelte/store'
import type { GameInstance, GameState } from '../../../game/game'
import type { GameDef } from '../../../game/game'

const { subscribe, set } = writable<GameState>()
let history: GameState[] = []

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

function newDay(state: GameState){
  history = []
  push(state)
}

export const gameStateStore = {
  subscribe,
  set,
  undo,
  push,
  newDay,
}

export const previewStateStore = writable<GameState|undefined>(undefined)

export const gameDefStore = writable<GameDef>()

export function getGameInstance(): GameInstance{
  return { def: get(gameDefStore), state: get(gameStateStore) }
}

export function setGameInstance(game: GameInstance){
  gameDefStore.set(game.def)
  set(game.state)
}