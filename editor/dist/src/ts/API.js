"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
class APIOptions {
    constructor(withCredentials) {
        this.withCredentials = withCredentials;
    }
}
class API {
    constructor() {
        this.options = new APIOptions(true);
        this.baseURL = "http://localhost:5000";
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new API();
        }
        return this.instance;
    }
    getFullRequestUrl(__requestUrl) {
        return `${this.baseURL}/${__requestUrl}`;
    }
    get(__requestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
            const response = yield axios_1.default.get(fullRequestUrl, this.options);
            return response;
        });
    }
    post(__requestUrl, __data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
            const response = yield axios_1.default.post(fullRequestUrl, __data, this.options);
            return response;
        });
    }
    delete(__requestUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
            const response = yield axios_1.default.delete(fullRequestUrl, this.options);
            return response;
        });
    }
    put(__requestUrl, __data) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullRequestUrl = this.getFullRequestUrl(__requestUrl);
            const response = yield axios_1.default.put(fullRequestUrl, __data, this.options);
            return response;
        });
    }
}
exports.default = API;
//# sourceMappingURL=API.js.map