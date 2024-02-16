import type { GameInstance, GameState, SlotNumber, Team } from './game'
import { deepClone, isSlotNumber } from './utils'
import { gameTeam } from './team'
import { gameWall } from './wall'
import { gameUnitInstance, type UnitInstance } from './unitInstance'
import { gameGame } from './game'
import { gameAbilities } from './abilities'
import { gameUnit } from './unit'

type Target = UnitInstance | 'wall'

interface Attack {
  attacker: UnitInstance,
  target: Target,
  damage: number,
}

export interface CombatResult {
  stateAfter: GameState,
}

function resolve(g: GameInstance): CombatResult{
  const game = deepClone(g)
  const atks: Attack[] = []
  for(let j = 0; j < 8; j++){
    tryAttack(game, atks, 'player', j as SlotNumber)
    tryAttack(game, atks, 'invader', j as SlotNumber)
  }
  resolveAttacks(atks)
  removeDestroyedUnits(game)
  return {
    stateAfter: deepClone(game.state),
  }
}

function tryAttack(game: GameInstance, atks: Attack[], team: Team, slot: SlotNumber){
  const attacker = gameGame.getInstance(game, team, slot)
  if(!attacker || gameUnitInstance.getStatValue(attacker, 'atk') === 0){
    return
  }
  const targets = getAttackTargets(attacker)
  targets.forEach(target => {
    const armor = target === 'wall' ? 0 : gameUnitInstance.getStatValue(target, 'armor')
    const damage = Math.max(0, gameUnitInstance.getStatValue(attacker, 'atk') - armor)
    atks.push({
      attacker,
      target,
      damage,
    })
  })
}

function getAttackTargets(attacker: UnitInstance): Target[]{
  if(gameUnitInstance.getSlot(attacker) > 0 && !gameAbilities.isRanged(attacker)){
    return []
  }
  const targetType = gameAbilities.targeting(attacker)
  const enemyArmy = attacker.game.state.armies[gameTeam.otherTeam(attacker.team)]
  if(!enemyArmy.length || targetType === 'wall'){
    if(attacker.team === 'player'){
      return []
    }
    return ['wall']
  }
  if(targetType === 'normal'){
    return toInstances(0)
  }else if(targetType === 'back'){
    return toInstances(enemyArmy.length - 1)
  }else if(targetType === 'lowHp'){
    throw 'Booo'
  }
  return []

  function toInstances(...slots: number[]): UnitInstance[]{
    return slots
      .filter(s => isSlotNumber(s))
      .map<UnitInstance | undefined>(s => {
        return gameGame.getInstance(attacker.game, gameTeam.otherTeam(attacker.team), s as SlotNumber)
      })
      .filter<UnitInstance>((s): s is UnitInstance => !!s)
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
  game.state.wallDamage = Math.min(gameWall.maxHealth(game), game.state.wallDamage + damage)
}

function takeDamage(target: UnitInstance, damage: number){
  target.state.damage = Math.min(gameUnitInstance.getStatValue(target, 'hp'), target.state.damage + damage)
}

function removeDestroyedUnits(game: GameInstance){
  for(const team of gameTeam.names){
    game.state.armies[team] = game.state.armies[team].filter(uid => {
      const ui: UnitInstance = {
        ...uid,
        game,
        team,
      }
      return ui.state.damage < gameUnitInstance.getStatValue(ui, 'hp')
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