"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleStringify = void 0;
const simpleStringify = (object) => {
    var simpleObject = {};
    for (var prop in object) {
        if (!object.hasOwnProperty(prop)) {
            continue;
        }
        if (typeof object[prop] == "object") {
            continue;
        }
        if (typeof object[prop] == "function") {
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};
exports.simpleStringify = simpleStringify;
//# sourceMappingURL=index.js.map