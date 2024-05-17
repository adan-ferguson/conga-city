"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameWall = void 0;
function maxHealth(_) {
    return 50;
}
function damage(game) {
    return Math.max(0, game.state.wallDamage);
}
function health(game) {
    return Math.max(maxHealth(game) - damage(game), 0);
}
exports.gameWall = {
    maxHealth: maxHealth,
    damage: damage,
    health: health,
};
