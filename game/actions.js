"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameActions = void 0;
var choices_1 = require("./choices");
function perform(actionDef, game, choices) {
    if (choices === void 0) { choices = []; }
    if (!remaining(game)) {
        throw 'Tried to perform action, but none are remaining.';
    }
    if (!choices_1.gameChoices.areValid(game, actionDef.requiredChoices, choices)) {
        throw 'Invalid choice(s)';
    }
    var actionResult = actionDef.fn(game, choices);
    actionResult.stateAfter.actionsTaken++; // TODO: unless the action is free?
    return actionResult;
}
function remaining(game) {
    return 1 - game.state.actionsTaken;
}
exports.gameActions = {
    perform: perform,
    remaining: remaining,
};
