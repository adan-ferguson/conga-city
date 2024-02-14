import { gameStateStore } from './game'
import type { CombatResult } from '../../game/combat'
import { wait } from '../../game/utils'
import { writable } from 'svelte/store'
import type { GameDef, GameState } from '../../game/game'

interface CombatReenactment {
  def: GameDef,
  before: GameState,
  after: GameState,
  results: CombatResult[],
}

let currentReenactment: CombatReenactment | null
let cancelled = false

function skip(){
  if(!currentReenactment){
    return
  }
  stop()
  finish()
}

function play(ce: CombatReenactment){
  if(currentReenactment){
    stop()
  }
  currentReenactment = ce
  gameStateStore.set(ce.before)
  run().then(finish)
}

const store = writable<CombatResult|undefined>(undefined)

function finish(){
  if(!currentReenactment){
    return
  }
  store.set(undefined)
  gameStateStore.push(currentReenactment.after)
}

async function run(){
  if(!currentReenactment){
    return
  }
  cancelled = false
  for(const result of currentReenactment.results){
    store.set(result)
    await wait(1000)
    if(cancelled){
      return
    }
    gameStateStore.set(result.stateAfter)
  }
}

function stop(){
  cancelled = true
}

export const combatReenactment = {
  skip,
  play,
  ...store,
}