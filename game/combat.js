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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameCombat = void 0;
var utils_1 = require("./utils");
var team_1 = require("./team");
var wall_1 = require("./wall");
var unitInstance_1 = require("./unitInstance");
var game_1 = require("./game");
var abilities_1 = require("./abilities");
var army_1 = require("./army");
function resolve(g) {
    var game = (0, utils_1.deepClone)(g);
    var results = [];
    var playerAttacks = calcAttacks(game, 'player');
    var invaderAttacks = calcAttacks(game, 'invader');
    results.push.apply(results, resolveAttacks(__spreadArray(__spreadArray([], playerAttacks.firstStrike, true), invaderAttacks.firstStrike, true)));
    results.push.apply(results, removeDestroyedUnits(game));
    results.push.apply(results, resolveAttacks(__spreadArray(__spreadArray([], playerAttacks.normal, true), invaderAttacks.normal, true)));
    results.push.apply(results, removeDestroyedUnits(game));
    return {
        stateAfter: (0, utils_1.deepClone)(game.state),
        results: results,
    };
}
function calcAttacks(game, team) {
    var atks = {
        firstStrike: [],
        normal: [],
    };
    game.state.armies[team].forEach(function (sui) {
        var attacker = unitInstance_1.UnitInstanceFns.toUnitInstance(sui, game, team);
        if (unitInstance_1.UnitInstanceFns.getStatValue(attacker, 'atk') === 0) {
            return;
        }
        getAttackTargets(attacker).forEach(function (target) {
            var arr = abilities_1.AbilityFns.hasPassive(attacker, 'firstStrike') ? atks.firstStrike : atks.normal;
            arr.push({
                attacker: attacker,
                target: target,
                damage: Math.max(0, unitInstance_1.UnitInstanceFns.getStatValue(attacker, 'atk')),
            });
        });
    });
    return atks;
}
function getAttackTargets(attacker) {
    if (attacker.state.slot.col > 0 && !abilities_1.AbilityFns.hasPassive(attacker, 'ranged')) {
        return [];
    }
    var team = team_1.TeamFns.otherTeam(attacker.team);
    var targetType = abilities_1.AbilityFns.targeting(attacker);
    var enemyInstances = army_1.ArmyFns.getInstances(attacker.game, team);
    var row = attacker.state.slot.row;
    if (!enemyInstances.length || targetType === 'wall') {
        if (attacker.team === 'player') {
            return [];
        }
        return ['wall'];
    }
    else if (targetType === 'normal') {
        return [{ col: 0, row: row }];
    }
    else if (targetType === 'back') {
        return [{ col: 0, row: row }]; // FIXME
    }
    else if (targetType === 'lowHp') {
        var lhp = army_1.ArmyFns.lowestHp(enemyInstances);
        return lhp ? [lhp.state.slot] : [];
    }
    return [];
}
function resolveAttacks(atks) {
    atks.forEach(function (atk) {
        if (atk.attacker.state.destroyed) {
            return;
        }
        var atkr = atk.attacker;
        var trample = abilities_1.AbilityFns.hasPassive(atkr, 'trample');
        var damageLeft = atk.damage;
        var currentTarget = atk.target;
        // eslint-disable-next-line no-constant-condition
        var loopz = 0;
        while (loopz < 9) {
            loopz++;
            var result = dealDamage(atk.attacker, currentTarget, damageLeft);
            if (!trample) {
                break;
            }
            currentTarget = army_1.ArmyFns.nextTarget.apply(army_1.ArmyFns, __spreadArray(__spreadArray([], attackerGameTeam(atkr), false), [currentTarget], false));
            if (!currentTarget) {
                break;
            }
            damageLeft = result.excess;
            if (!damageLeft) {
                break;
            }
        }
        if (loopz >= 9) {
            throw 'Too many loops';
        }
    });
    return [];
}
function attackerGameTeam(atkr) {
    return [atkr.game, team_1.TeamFns.otherTeam(atkr.team)];
}
function dealDamage(attacker, target, damage) {
    if (target === 'wall') {
        return takeWallDamage(attacker.game, damage);
    }
    else {
        var dmgTaker = game_1.gameGame.getUnitInstance.apply(game_1.gameGame, __spreadArray(__spreadArray([], attackerGameTeam(attacker), false), [target], false));
        if (!dmgTaker) {
            return {
                blocked: 0,
                dealt: 0,
                excess: damage,
                total: damage,
            };
        }
        return takeDamage(dmgTaker, {
            damage: damage,
            ignoreArmor: abilities_1.AbilityFns.hasPassive(attacker, 'piercing'),
        });
    }
}
function takeWallDamage(game, total) {
    var left = wall_1.gameWall.health(game);
    var dealt = Math.min(left, total);
    game.state.wallDamage += dealt;
    return {
        blocked: 0,
        dealt: dealt,
        excess: total - dealt,
        total: total,
    };
}
function takeDamage(taker, info) {
    var total = info.damage;
    var max = unitInstance_1.UnitInstanceFns.getStatValue(taker, 'hp');
    var armor = info.ignoreArmor ? 0 : unitInstance_1.UnitInstanceFns.getStatValue(taker, 'armor');
    var remaining = max - taker.state.damage;
    var dealt = Math.min(remaining, Math.max(0, total - armor));
    var blocked = Math.min(armor, total);
    taker.state.damage += dealt;
    return {
        blocked: blocked,
        dealt: dealt,
        excess: total - dealt - blocked,
        total: total,
    };
}
function removeDestroyedUnits(game) {
    var _loop_1 = function (team) {
        game.state.armies[team] = game.state.armies[team].filter(function (uid) {
            var ui = __assign(__assign({}, uid), { game: game, team: team });
            var destroyed = ui.state.damage >= unitInstance_1.UnitInstanceFns.getStatValue(ui, 'hp');
            if (destroyed) {
                uid.state.destroyed = true;
            }
            return !destroyed;
        });
    };
    for (var _i = 0, _a = team_1.TeamFns.names; _i < _a.length; _i++) {
        var team = _a[_i];
        _loop_1(team);
    }
    return [];
}
exports.gameCombat = {
    resolve: resolve,
};
