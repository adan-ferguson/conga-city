import { writable, get } from 'svelte/store'
import { gameInstanceStore, gameStateStore } from './game'
import type { ActionDef } from '../../game/actions'
import { gameActions } from '../../game/actions'
import { gameGame } from '../../game/game'
import { type Choice, gameChoices } from '../../game/choices'

type PendingAction = {
  actionDef: ActionDef,
  choices: Choice[],
  key: string,
}

export const pendingActionStore = writable<PendingAction | undefined>(undefined)

export function addChoice(choice: Choice){
  const pendingAction = get(pendingActionStore)
  if(!pendingAction){
    return
  }
  const currentIndex = pendingAction.choices.length
  const currentChoiceType = pendingAction.actionDef.requiredChoices[currentIndex]
  if(!currentChoiceType){
    throw 'Can not add choice, none left to make.'
  }
  if(!gameChoices.isValid(get(gameInstanceStore), currentChoiceType, choice)){
    throw 'Choice not valid.'
  }
  pendingAction.choices.push(choice)
  performOrUpdateStore(pendingAction)
}

export function setupAction(actionDef: ActionDef, key: string){
  const pendingAction: PendingAction = {
    actionDef,
    choices: [],
    key,
  }
  performOrUpdateStore(pendingAction)
}

function performOrUpdateStore(pendingAction: PendingAction){
  if(!isReady(pendingAction)){
    return pendingActionStore.set(pendingAction)
  }
  pendingActionStore.set(undefined)
  const result = gameActions.perform(
    pendingAction.actionDef,
    get(gameInstanceStore),
    pendingAction.choices,
  )
  // TODO: reenact
  gameStateStore.set(result.stateAfter)
  if(!gameActions.remaining(get(gameInstanceStore))){
    const result = gameGame.endDay(get(gameInstanceStore))
    // TODO: reenact
    gameStateStore.push(result.stateAfter)
  }
}

function isReady(pendingAction: PendingAction): boolean{
  return gameChoices.areValid(
    get(gameInstanceStore),
    pendingAction.actionDef.requiredChoices,
    pendingAction.choices
  )
}