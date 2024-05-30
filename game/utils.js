"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asSlotNumber = exports.isSlotNumber = exports.wait = exports.padArray = exports.toDisplayName = exports.uniqueID = exports.fillArray = exports.deepClone = void 0;
var uuid_1 = require("uuid");
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
exports.deepClone = deepClone;
function fillArray(length, cb) {
    return new Array(length).fill(1).map(cb);
}
exports.fillArray = fillArray;
function uniqueID() {
    return (0, uuid_1.v4)();
}
exports.uniqueID = uniqueID;
function toDisplayName(key) {
    return key.substring(0, 1).toUpperCase() + key.substring(1);
}
exports.toDisplayName = toDisplayName;
function padArray(arr, length) {
    var newArr = [];
    for (var i = 0; i < length; i++) {
        newArr[i] = arr[i];
    }
    return newArr;
}
exports.padArray = padArray;
function wait(ms) {
    return new Promise(function (res) {
        setTimeout(res, ms);
    });
}
exports.wait = wait;
function isSlotNumber(c) {
    return typeof c === 'number' && Number.isInteger(c) && c >= 0 && c < 8;
}
exports.isSlotNumber = isSlotNumber;
function asSlotNumber(n) {
    if (!isSlotNumber(n)) {
        return false;
    }
    return n;
}
exports.asSlotNumber = asSlotNumber;
