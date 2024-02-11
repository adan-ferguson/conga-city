import type { GameInstance, GameState, SlotNumber } from './game'
import { getUnitInstance, wallHealth, wallMaxHealth } from './game'
import { getSlot, getUnitInstanceStatValue, type UnitInstance } from './units/unitInstance'
import { deepClone } from './utils'
import { otherTeam, type Team, TeamTypes } from './team'

type Target = UnitInstance | 'wall'

interface Attack {
  attacker: UnitInstance,
  target: Target,
  damage: number,
}

export interface CombatEvent {

}

export interface CombatResult {
  stateAfter: GameState,
  round: number | 'precombat' | 'postcombat',
  events: CombatEvent[],
}

export function resolveCombat(g: GameInstance): CombatResult[]{
  const game = deepClone(g)
  const results: CombatResult[] = []
  for(let i = 0; i < combatRounds(game); i++){
    const atks: Attack[] = []
    for(let j = 0; j < 8; j++){
      tryAttack(game, atks, 'player', j as SlotNumber)
      tryAttack(game, atks, 'invader', j as SlotNumber)
    }
    resolveAttacks(atks)
    removeDestroyedUnits(game)
    results.push({
      stateAfter: deepClone(game.state),
      round: i + 1,
      events: [],
    })
    if(combatEnded(game)){
      break
    }
  }
  return results
}

export function combatRounds(game: GameInstance){
  return game.state.day
}

function tryAttack(game: GameInstance, atks: Attack[], team: Team, slot: SlotNumber){
  const attacker = getUnitInstance(game, team, slot)
  if(!attacker){
    return
  }
  const target = getAttackTarget(attacker)
  if(target === false){
    return
  }
  const armor = target === 'wall' ? 0 : getUnitInstanceStatValue(target, 'armor')
  const damage = Math.max(0, getUnitInstanceStatValue(attacker, 'atk') - armor)
  atks.push({
    attacker,
    target,
    damage,
  })
}

function getAttackTarget(attacker: UnitInstance): Target | false{
  const range = 1 //getUnitInstanceStatValue(attacker, 'range')
  const targetSlot = -getSlot(attacker) + range - 1
  if(targetSlot < 0){
    return false
  }
  const enemyArmy = attacker.game.state.armies[otherTeam(attacker.team)]
  if(!enemyArmy.length){
    if(attacker.team === 'player'){
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
      atk.damage,
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
  target.state.damage = Math.min(getUnitInstanceStatValue(target, 'hp'), target.state.damage + damage)
}

function removeDestroyedUnits(game: GameInstance){
  for(const team of TeamTypes){
    game.state.armies[team] = game.state.armies[team].filter(uid => {
      const ui: UnitInstance = {
        ...uid,
        game,
        team,
      }
      return ui.state.damage < getUnitInstanceStatValue(ui, 'hp')
    })
  }
}

function combatEnded(game: GameInstance): boolean{
  if(!wallHealth(game)){
    return true
  }else if(!game.state.armies.invader.length){
    return true
  }
  return false
}