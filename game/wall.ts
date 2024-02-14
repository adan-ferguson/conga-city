import type { GameInstance } from './game'

function maxHealth(_: GameInstance){
  return 50
}

function damage(game: GameInstance){
  return Math.max(0, game.state.wallDamage)
}

function health(game: GameInstance){
  return Math.max(maxHealth(game) - damage(game), 0)
}

export const gameWall = {
  maxHealth,
  damage,
  health,
}