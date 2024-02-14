import type { GameInstance, GameState } from './game'
import type { Choice, ChoiceType } from './choices'
import { gameChoices } from './choices'

export type ActionType = 'buyUnit'

export type ActionDef = {
  type: ActionType,
  requiredChoices: ChoiceType[],
  fn: (game: GameInstance, choices: Choice[]) => ActionResult
}

export interface ActionResult {
  stateAfter: GameState,
}

function perform(actionDef: ActionDef, game: GameInstance, choices: Choice[] = []): ActionResult{
  if(!remaining(game)){
    throw 'Tried to perform action, but none are remaining.'
  }
  if(!gameChoices.areValid(game, actionDef.requiredChoices, choices)){
    throw 'Invalid choice(s)'
  }
  const actionResult = actionDef.fn(game, choices)
  actionResult.stateAfter.actionsTaken++ // TODO: unless the action is free?
  return actionResult
}

function remaining(game: GameInstance): number{
  return 1 - game.state.actionsTaken
}

export const gameActions=  {
  perform,
  remaining,
}