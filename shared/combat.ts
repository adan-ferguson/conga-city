import type { GameInstance, SlotNumber } from './game'
import type { UnitInstance } from './units/unit'
import { getStat } from './stats'
import { getArmy, otherTeam, Team } from './game'

interface Attack {
  team: Team,
  slot: SlotNumber,
  target: SlotNumber,
  damage: number,
}

export function resolveCombat(game: GameInstance){
  const atks: Attack[] = []
  for(let i = 0; i < combatRounds(game); i++){
    for(let j = 0; j < 8; j++){
      tryAttack(game, atks, Team.Player, j as SlotNumber)
      tryAttack(game, atks, Team.Invader, j as SlotNumber)
    }
    resolveAttacks(game, atks)
    removeDestroyedUnits(game)
    if(combatEnded(game)){
      break
    }
  }
}

export function combatRounds(game: GameInstance){
  return game.state.day
}

function tryAttack(game: GameInstance, atks: Attack[], team: Team, slot: SlotNumber){
  const unit = getUnit(game, team, slot)
  if(!unit){
    return
  }
  if(slot > 0){
    // TODO: range
    return
  }
  atks.push({
    team: otherTeam(team),
    slot,
    target: 0,
    damage: getStat(unit, 'atk')
  })
}

function resolveAttacks(game: GameInstance, atks: Attack[]){
  atks.forEach(atk => {
    dealDamage(
      getUnit(game, atk.team, atk.slot),
      getUnit(game, otherTeam(atk.team), atk.target),
      atk.damage,
    )
  })
}

function dealDamage(_: UnitInstance, target: UnitInstance, damage: number){
  takeDamage(target, damage)
}

function takeDamage(target: UnitInstance, damage: number){
  target.state.damage = Math.min(getStat(target, 'hp'), target.state.damage + damage)
}

function getUnit(game: GameInstance, team: Team, slot: SlotNumber): UnitInstance{
  return getArmy(game, team)[slot]
}

function removeDestroyedUnits(game: GameInstance){
  for(const v in Team){
    const team = parseInt(v) as Team

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

export function wallMaxHealth(_: GameInstance){
  return 50
}

export function wallDamage(game: GameInstance){
  return Math.max(0, game.state.wallDamage)
}

export function wallHealth(game: GameInstance){
  return Math.max(wallMaxHealth(game) - wallDamage(game), 0)
}