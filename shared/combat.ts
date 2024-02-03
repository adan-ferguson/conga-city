import type { GameInstance, SlotNumber } from './game'
import type { UnitInstance } from './units/unit'
import { getStat } from './stats'
import { getArmy, otherTeam, Team } from './game'
import { getSlot, wallHealth, wallMaxHealth } from './units/unitInstance'
import { deepClone } from './utils'

type Target = UnitInstance | 'wall'

interface Attack {
  attacker: UnitInstance,
  target: Target,
}

export function resolveCombat(g: GameInstance): GameInstance{
  const game = deepClone(g)
  for(let i = 0; i < combatRounds(game); i++){
    const atks: Attack[] = []
    for(let j = 0; j < 8; j++){
      tryAttack(game, atks, Team.Player, j as SlotNumber)
      tryAttack(game, atks, Team.Invader, j as SlotNumber)
    }
    resolveAttacks(atks)
    removeDestroyedUnits(game)
    if(combatEnded(game)){
      break
    }
  }
  return game
}

export function combatRounds(game: GameInstance){
  return game.state.day
}

function tryAttack(game: GameInstance, atks: Attack[], team: Team, slot: SlotNumber){
  const attacker = getUnit(game, team, slot)
  if(!attacker){
    return
  }
  const target = getAttackTarget(attacker)
  if(target === false){
    return
  }
  atks.push({
    attacker,
    target,
  })
}

function getAttackTarget(attacker: UnitInstance): Target | false{
  const range = getStat(attacker, 'range')
  const targetSlot = -getSlot(attacker) + range - 1
  if(targetSlot < 0){
    return false
  }
  const enemyArmy = attacker.game.state.armies[otherTeam(attacker.team)]
  if(!enemyArmy.length){
    if(attacker.team === Team.Player){
      return false
    }else{
      return 'wall'
    }
  }
  const slot =  Math.min(enemyArmy.length - 1, targetSlot)
  return {
    ...enemyArmy[slot],
    game: attacker.game,
    team: otherTeam(attacker.team),
  }
}

function resolveAttacks(atks: Attack[]){
  atks.forEach(atk => {
    dealDamage(
      atk.attacker,
      atk.target,
      getStat(atk.attacker, 'atk'),
    )
  })
}

function dealDamage(attacker: UnitInstance, target: UnitInstance | 'wall', damage: number){
  if(target === 'wall'){
    takeWallDamage(attacker.game, damage)
  }else{
    takeDamage(target, damage)
  }
}

function takeWallDamage(game: GameInstance, damage: number){
  game.state.wallDamage = Math.min(wallMaxHealth(game), game.state.wallDamage + damage)
}

function takeDamage(target: UnitInstance, damage: number){
  target.state.damage = Math.min(getStat(target, 'hp'), target.state.damage + damage)
}

function getUnit(game: GameInstance, team: Team, slot: SlotNumber): UnitInstance{
  return getArmy(game, team)[slot]
}

function removeDestroyedUnits(game: GameInstance){
  for(const team of [Team.Player, Team.Invader]){
    game.state.armies[team] = game.state.armies[team].filter(uid => {
      const ui: UnitInstance = {
        ...uid,
        game,
        team,
      }
      return ui.state.damage < getStat(ui, 'hp')
    })
  }
}

function combatEnded(game: GameInstance): boolean{
  if(!wallHealth(game)){
    return true
  }else if(!game.state.armies[Team.Invader].length){
    return true
  }
  return false
}