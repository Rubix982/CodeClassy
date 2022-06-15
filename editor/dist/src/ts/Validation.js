"use strict";
/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the Monaco Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
/**
 * A helper class to aid in input validation.
 *
 * @internal
 */
class Validation {
    static assertString(val, name) {
        if (typeof val !== "string") {
            throw new Error(`${name} must be a string but was: ${val}`);
        }
    }
    static assertNumber(val, name) {
        if (typeof val !== "number") {
            throw new Error(`${name} must be a number but was: ${val}`);
        }
    }
    static assertDefined(val, name) {
        if (val === undefined || val === null) {
            throw new Error(`${name} must be a defined but was: ${val}`);
        }
    }
    static assertFunction(val, name) {
        if (typeof val !== "function") {
            throw new Error(`${name} must be a function but was: ${typeof val}`);
        }
    }
    static assertPosition(val, name) {
        Validation.assertDefined(val, name);
        if (typeof val.lineNumber !== "number" || typeof val.column !== "number") {
            throw new Error(`${name} must be an Object like {lineNumber: number, column: number}: ${JSON.stringify(val)}`);
        }
    }
}
exports.Validation = Validation;
//# sourceMappingURL=Validation.js.map