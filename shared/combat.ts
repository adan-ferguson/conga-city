import { GameInstance, SlotNumber } from './game'
import { UnitInstance } from './unit'
import { getStat } from './stats'

interface Attack {
  isPlayer: boolean,
  slot: SlotNumber,
  target: SlotNumber,
  damage: number,
}

export function resolveCombat(game: GameInstance){
  const rounds = game.state.day
  const atks: Attack[] = []
  for(let i = 0; i < rounds; i++){
    for(let j = 0; j < 8; j++){
      tryAttack(game, atks, true, i as SlotNumber)
      tryAttack(game, atks, false, i as SlotNumber)
    }
    resolveAttacks(game, atks)
    removeDestroyedUnits(game)
    if(combatEnded(game)){
      break
    }
  }
}

function tryAttack(game: GameInstance, atks: Attack[], isPlayer: boolean, slot: SlotNumber){
  const unit = getUnit(game, isPlayer, slot)
  if(!unit){
    return
  }
  if(slot > 0){
    // TODO: range
    return
  }
  atks.push({
    isPlayer,
    slot,
    target: 0,
    damage: getStat(game, unit, 'atk')
  })
}

function resolveAttacks(game: GameInstance, atks: Attack[]){
  atks.forEach(atk => {
    dealDamage(
      game,
      getUnit(game, atk.isPlayer, atk.slot),
      getUnit(game, atk.isPlayer, atk.target),
      atk.damage,
    )
  })
}

function dealDamage(game: GameInstance, unit: UnitInstance, target: UnitInstance, damage: number){
  takeDamage(game, target, damage)
}

function takeDamage(game: GameInstance, target: UnitInstance, damage: number){
  target.state.hp = Math.max(0, target.state.hp -= damage)
}

function getUnit(game: GameInstance, isPlayer: boolean, slot: SlotNumber): UnitInstance{
  return game.state[isPlayer ? 'playerArmy' : 'invaderArmy'][slot]
}

function removeDestroyedUnits(game: GameInstance){
  game.state.playerArmy = game.state.playerArmy.filter(ui => {
    return ui.state.hp > 0
  })
  game.state.invaderArmy = game.state.invaderArmy.filter(ui => {
    return ui.state.hp > 0
  })
}