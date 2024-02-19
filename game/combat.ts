import type { GameInstance, GameState, SlotNumber, Team } from './game'
import { deepClone } from './utils'
import { TeamFns } from './team'
import { gameWall } from './wall'
import { UnitInstanceFns, type UnitInstance } from './unitInstance'
import { gameGame } from './game'
import { AbilityFns } from './abilities'
import { ArmyFns } from './army'

type Target = UnitInstance | 'wall'

interface Attack {
  attacker: UnitInstance,
  target: Target,
  damage: number,
}

interface Attacks {
  firstStrike: Attack[],
  normal: Attack[],
}

export interface CombatResult {
  stateAfter: GameState,
}

function resolve(g: GameInstance): CombatResult{
  const game = deepClone(g)
  const atks: Attacks = {
    firstStrike: [],
    normal: [],
  }
  for(let j = 0; j < 8; j++){
    tryAttack(game, atks, 'player', j as SlotNumber)
    tryAttack(game, atks, 'invader', j as SlotNumber)
  }
  resolveAttacks(atks.firstStrike)
  removeDestroyedUnits(game)
  resolveAttacks(atks.normal)
  removeDestroyedUnits(game)
  return {
    stateAfter: deepClone(game.state),
  }
}

function tryAttack(game: GameInstance, atks: Attacks, team: Team, slot: SlotNumber){
  const attacker = gameGame.getInstance(game, team, slot)
  if(!attacker || UnitInstanceFns.getStatValue(attacker, 'atk') === 0){
    return
  }
  const targets = getAttackTargets(attacker)
  targets.forEach(target => {
    const armor = target === 'wall' ? 0 : UnitInstanceFns.getStatValue(target, 'armor')
    const damage = Math.max(0, UnitInstanceFns.getStatValue(attacker, 'atk') - armor)
    const arr = AbilityFns.hasFirstStrike(attacker) ? atks.firstStrike : atks.normal
    arr.push({
      attacker,
      target,
      damage,
    })
  })
}

function getAttackTargets(attacker: UnitInstance): Target[]{
  if(UnitInstanceFns.getSlot(attacker) > 0 && !AbilityFns.isRanged(attacker)){
    return []
  }
  const targetType = AbilityFns.targeting(attacker)
  const enemyInstances = ArmyFns.getInstances(attacker.game, TeamFns.otherTeam(attacker.team))
  if(!enemyInstances.length || targetType === 'wall'){
    if(attacker.team === 'player'){
      return []
    }
    return ['wall']
  }
  if(targetType === 'normal'){
    return [enemyInstances[0]]
  }else if(targetType === 'back'){
    return [enemyInstances.at(-1)!]
  }else if(targetType === 'lowHp'){
    return [ArmyFns.lowestHp(enemyInstances)]
  }
  return []
}

function resolveAttacks(atks: Attack[]){
  atks.forEach(atk => {
    if(atk.attacker.state.destroyed){
      return
    }
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
  game.state.wallDamage = Math.min(gameWall.maxHealth(game), game.state.wallDamage + damage)
}

function takeDamage(target: UnitInstance, damage: number){
  target.state.damage = Math.min(UnitInstanceFns.getStatValue(target, 'hp'), target.state.damage + damage)
}

function removeDestroyedUnits(game: GameInstance){
  for(const team of TeamFns.names){
    game.state.armies[team] = game.state.armies[team].filter(uid => {
      const ui: UnitInstance = {
        ...uid,
        game,
        team,
      }
      const destroyed = ui.state.damage >= UnitInstanceFns.getStatValue(ui, 'hp')
      if(destroyed){
        uid.state.destroyed = true
      }
      return !destroyed
    })
  }
}

function combatEnded(game: GameInstance): boolean{
  if(!gameWall.health(game)){
    return true
  }else if(!game.state.armies.invader.length){
    return true
  }
  return false
}

export const gameCombat = {
  resolve,
}