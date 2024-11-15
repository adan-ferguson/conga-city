import type { GameInstance, GameState, Team } from './game'
import { deepClone } from './utils'
import { TeamFns } from './team'
import { gameWall } from './wall'
import { UnitInstanceFns, type UnitInstance } from './unitInstance'
import { gameGame } from './game'
import { AbilityFns } from './abilities'
import { ArmyFns, type Target } from './army'
import { UnitFns } from './unit'

interface Attack {
  attacker: UnitInstance,
  target: Target,
  damage: number,
}

interface Attacks {
  firstStrike: Attack[],
  normal: Attack[],
}

interface DamageResult {
  blocked: number,
  dealt: number,
  excess: number,
  total: number,
}

interface DamageInfo {
  ignoreArmor: boolean,
  damage: number,
}

interface CombatResolution {
  stateAfter: GameState,
  results: Result[],
}

interface AttackResult {
  stateAfter: GameState,
}

export type Result = AttackResult

function resolve(g: GameInstance): CombatResolution{
  const game = deepClone(g)
  const results: Result[] = []
  const playerAttacks = calcAttacks(game, 'player')
  const invaderAttacks = calcAttacks(game, 'invader')
  results.push(...resolveAttacks([...playerAttacks.firstStrike, ...invaderAttacks.firstStrike]))
  results.push(...removeDestroyedUnits(game))
  results.push(...resolveAttacks([...playerAttacks.normal, ...invaderAttacks.normal]))
  results.push(...removeDestroyedUnits(game))
  return {
    stateAfter: deepClone(game.state),
    results,
  }
}

function calcAttacks(game: GameInstance, team: Team): Attacks{
  const atks: Attacks = {
    firstStrike: [],
    normal: [],
  }
  game.state.armies[team].forEach(sui => {
    const attacker = UnitFns.toInstance(sui, game, team)
    if(UnitInstanceFns.getStatValue(attacker, 'atk') === 0){
      return
    }
    getAttackTargets(attacker).forEach(target => {
      const arr = AbilityFns.hasPassive(attacker, 'firstStrike') ? atks.firstStrike : atks.normal
      arr.push({
        attacker,
        target,
        damage: Math.max(0, UnitInstanceFns.getStatValue(attacker, 'atk')),
      })
    })
  })
  return atks
}

function getAttackTargets(attacker: UnitInstance): Target[]{
  if(attacker.state.slot.col > 0 && !AbilityFns.hasPassive(attacker, 'ranged')){
    return []
  }
  const team = TeamFns.otherTeam(attacker.team)
  const targetType = AbilityFns.targeting(attacker)
  const enemyInstances = ArmyFns.getArmy(attacker.game, team)
  const row = attacker.state.slot.row
  if(!enemyInstances.length || targetType === 'wall'){
    if(attacker.team === 'player'){
      return []
    }
    return ['wall']
  }else if(targetType === 'normal'){
    return [{ col: 0, row }]
  }else if(targetType === 'back'){
    return [{ col: 0, row }] // FIXME
  }else if(targetType === 'lowHp'){
    const lhp = ArmyFns.lowestHp(enemyInstances)
    return lhp ? [lhp.state.slot] : []
  }
  return []
}

function resolveAttacks(atks: Attack[]): AttackResult[]{
  atks.forEach(atk => {
    if(atk.attacker.state.destroyed){
      return
    }
    const atkr = atk.attacker
    const trample = AbilityFns.hasPassive(atkr, 'trample')
    let damageLeft = atk.damage
    let currentTarget: Target | false = atk.target
    // eslint-disable-next-line no-constant-condition
    let loopz = 0
    while(loopz < 9){
      loopz++
      const result = dealDamage(
        atk.attacker,
        currentTarget,
        damageLeft,
      )
      if(!trample){
        break
      }
      currentTarget = ArmyFns.nextTarget(...agot(atkr), currentTarget)
      if(!currentTarget){
        break
      }
      damageLeft = result.excess
      if(!damageLeft){
        break
      }
    }
    if(loopz >= 9){
      throw 'Too many loops'
    }
  })
  return []
}

function agot(atkr: UnitInstance): [GameInstance, Team]{
  // attacker's game/otherTeam
  return [atkr.game, TeamFns.otherTeam(atkr.team)]
}

function dealDamage(attacker: UnitInstance, target: Target, damage: number): DamageResult{
  if(target === 'wall'){
    return takeWallDamage(attacker.game, damage)
  }else{
    const dmgTaker = ArmyFns.getFromSlot(ArmyFns.getArmy(...agot(attacker)), target)
    if(!dmgTaker){
      return {
        blocked: 0,
        dealt: 0,
        excess: damage,
        total: damage,
      }
    }
    return takeDamage(dmgTaker, {
      damage,
      ignoreArmor: AbilityFns.hasPassive(attacker, 'piercing'),
    })
  }
}

function takeWallDamage(game: GameInstance, total: number): DamageResult{
  const left = gameWall.health(game)
  const dealt = Math.min(left, total)
  game.state.wallDamage += dealt
  return {
    blocked: 0,
    dealt,
    excess: total - dealt,
    total,
  }
}

function takeDamage(taker: UnitInstance, info: DamageInfo): DamageResult{
  const total = info.damage
  const max = UnitInstanceFns.getStatValue(taker, 'hp')
  const armor = info.ignoreArmor ? 0 : UnitInstanceFns.getStatValue(taker, 'armor')
  const remaining = max - taker.state.damage
  const dealt = Math.min(remaining, Math.max(0, total - armor))
  const blocked = Math.min(armor, total)
  taker.state.damage += dealt
  return {
    blocked,
    dealt,
    excess: total - dealt - blocked,
    total,
  }
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
  return []
}

export const gameCombat = {
  resolve,
}