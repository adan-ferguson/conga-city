import type { GameInstance, Slot } from './game'
import { isSlot } from './utils'

type ValidatorFn = (g: GameInstance, c: Choice) => boolean

const CHOICE_VALIDATORS: Record<string, ValidatorFn> = {
  spawnSlot: (game, choice) => {
    const playerArmy = game.state.armies.player
    if(playerArmy.length >= 8){
      return false
    }
    if(choice === 'auto'){
      return true
    }
    if(isSlot(choice)){
      return true
    }
    return false
  },
  someNonsense: (game, choice) => {
    return false
  }
}

export type ChoiceType = keyof typeof CHOICE_VALIDATORS
export type SpawnSlot = Slot | 'auto'
export type Choice = SpawnSlot

function isValid(game: GameInstance, choiceType: ChoiceType, choice: Choice): boolean{
  return CHOICE_VALIDATORS[choiceType](game, choice)
}

function areValid(game: GameInstance, requiredChoices: ChoiceType[], choices: Choice[]){
  return requiredChoices.length === choices.length && requiredChoices.every((rc, i) => {
    return isValid(game, rc, choices[i])
  })
}

export const gameChoices = {
  isValid,
  areValid,
}