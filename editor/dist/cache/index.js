"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lru_cache_1 = __importDefault(require("lru-cache"));
// At least one of 'max', 'ttl', or 'maxSize' is required, to prevent
// unsafe unbounded storage.
//
// In most cases, it's best to specify a max for performance, so all
// the required memory allocation is done up-front.
//
// All the other options are optional, see the sections below for
// documentation on what each one does.  Most of them can be
// overridden for specific items in get()/set()
// See https://www.npmjs.com/package/lru-cache for more information
const options = {
    max: 500,
};
const lruCache = new lru_cache_1.default(options);
exports.default = lruCache;
//# sourceMappingURL=index.js.map