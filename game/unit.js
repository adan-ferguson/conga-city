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
exports.gameUnit = void 0;
var utils_1 = require("./utils");
function toSerializedUnitInstance(def, slot) {
    return { id: (0, utils_1.uniqueID)(), def: def, state: { damage: 0, slot: slot, } };
}
function toInstance(uid, game, team) {
    return __assign(__assign({}, uid), { game: game, team: team });
}
exports.gameUnit = {
    toSerializedUnitInstance: toSerializedUnitInstance,
    toInstance: toInstance,
};
