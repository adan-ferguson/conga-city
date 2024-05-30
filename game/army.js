"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArmyFns = void 0;
var unitInstance_1 = require("./unitInstance");
var unit_1 = require("./unit");
function getInstances(game, team) {
    return game.state.armies[team].map(function (sui) { return unit_1.gameUnit.toInstance(sui, game, team); });
}
function nextTarget(game, team, currentTarget) {
    if (currentTarget === 'wall') {
        return false;
    }
    var nextTarget = { row: currentTarget.row, col: currentTarget.col + 1 };
    if (!getFromSlot(game.state.armies[team], nextTarget)) {
        return team === 'player' ? 'wall' : false;
    }
    return nextTarget;
}
function getFromSlot(army, nextTarget) {
}
exports.ArmyFns = {
    getInstances: getInstances,
    nextTarget: nextTarget,
    lowestHp: function (enemyInstances) {
        if (!enemyInstances.length) {
            return false;
        }
        var min = 0;
        for (var i = 1; i < enemyInstances.length; i++) {
            if (getHp(i) < getHp(min)) {
                min = i;
            }
        }
        return enemyInstances[min];
        function getHp(slot) {
            return unitInstance_1.UnitInstanceFns.getHp(enemyInstances[slot]);
        }
    }
};
