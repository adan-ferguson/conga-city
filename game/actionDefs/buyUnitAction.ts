import type { UnitShopKey } from '../shop'
import type { Choice, SpawnSlot } from '../choices'
import type { GameInstance } from '../game'
import type { ActionDef } from '../actions'
import { gameShop } from '../shop'
import { gameGame } from '../game'

export function buyUnitAction(game: GameInstance, key: UnitShopKey): ActionDef | false{
  if(gameGame.isArmyFull(game.state.armies.player)){
    return false
  }
  const unit = gameShop.getEntry(game, key)
  return {
    type: 'buyUnit',
    requiredChoices: ['spawnSlot'],
    fn(game: GameInstance, choices: Choice[]){
      return {
        stateAfter:  gameShop.buyUnit(game, unit, <SpawnSlot>choices[0]),
      }
    }
  }
}