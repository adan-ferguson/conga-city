import { writable } from 'svelte/store'
import type { GameInstance } from '../../game/game'
import { createNewGameInstance } from '../../game/game'

const { subscribe, set } = writable<GameInstance>(undefined)
const initialInstance = createNewGameInstance({ scenario: 'test' })
set(initialInstance)

let history: GameInstance[] = [initialInstance]

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

function push(game: GameInstance){
  history.push(game)
  set(game)
}

function newDay(game: GameInstance){
  history = []
  push(game)
}

export const gameInstanceStore = {
  subscribe,
  canUndo,
  undo,
  push,
  newDay,
}