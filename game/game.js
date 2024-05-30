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
exports.gameGame = void 0;
var combat_1 = require("./combat");
var utils_1 = require("./utils");
var wall_1 = require("./wall");
var scenario_1 = require("./scenario");
var unit_1 = require("./unit");
function createNewInstance(def) {
    return {
        def: def,
        state: {
            day: 1,
            week: 1,
            wallDamage: 0,
            actionsTaken: 0,
            armies: {
                player: [],
                invader: loadInvaderArmy(def.scenario, 1),
            }
        }
    };
}
function endDay(g) {
    if (gameOver(g)) {
        throw 'Could not end day';
    }
    var _a = combat_1.gameCombat.resolve(g), combatStateAfter = _a.stateAfter, results = _a.results;
    var stateAfter = (0, utils_1.deepClone)(combatStateAfter);
    // TODO: Cleanup
    if (stateAfter.day === 7) {
        stateAfter.week += 1;
    }
    stateAfter.day = 1 + (stateAfter.day % 7);
    return { stateAfter: stateAfter, results: results };
}
function gameOver(game) {
    if (wall_1.gameWall.health(game) <= 0) {
        return true;
    }
    return false;
}
function unitInstance(game, team, slot) {
    var val = game.state.armies[team][slot];
    if (!val) {
        return val;
    }
    return unit_1.gameUnit.toInstance(val, game, team);
}
function unitInstances(game, team) {
    return game.state.armies[team].map(function (uid) { return unit_1.gameUnit.toInstance(uid, game, team); });
}
function loadInvaderArmy(scenario, week) {
    var _a;
    var def = scenario_1.gameScenario.getInfo(scenario);
    var army = (_a = def.weeks[week - 1]) === null || _a === void 0 ? void 0 : _a.army;
    if (!army) {
        throw 'No army!';
    }
    return army.map(unit_1.gameUnit.toSerializedUnitInstance);
}
function getUnitInstance(game, team, index) {
    if (!game.state.armies[team][index]) {
        return undefined;
    }
    return __assign(__assign({}, game.state.armies[team][index]), { game: game, team: team });
}
exports.gameGame = {
    endDay: endDay,
    unitInstance: unitInstance,
    unitInstances: unitInstances,
    createNewInstance: createNewInstance,
    getUnitInstance: getUnitInstance,
    isArmyFull: function (army) {
        return army.length === 8;
    }
};
