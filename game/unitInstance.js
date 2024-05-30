"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitInstanceFns = void 0;
var stats_1 = require("./stats");
function getSlot(ui) {
    var slotIndex = ui.game.state.armies[ui.team].findIndex(function (uid) { return uid.id === ui.id; });
    if (slotIndex === -1) {
        throw 'Huh?';
    }
    return slotIndex;
}
function getStatValue(unit, statName) {
    var _a;
    return stats_1.gameStats.getValue((_a = unit.def.stats) !== null && _a !== void 0 ? _a : {}, statName);
}
function getHp(ui) {
    return getStatValue(ui, 'hp') - ui.state.damage;
}
function toUnitInstance(sui, game, team) {
    return __assign(__assign({}, sui), { game: game, team: team });
}
exports.UnitInstanceFns = {
    getHp: getHp,
    getStatValue: getStatValue,
    getSlot: getSlot,
    toUnitInstance: toUnitInstance,
};
