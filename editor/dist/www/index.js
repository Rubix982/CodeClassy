"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../routes"));
const cache_1 = __importDefault(require("../cache"));
const ejs_1 = __importDefault(require("ejs"));
// expressjs app
const app = (0, express_1.default)();
ejs_1.default.cache = cache_1.default;
app.use((0, cookie_parser_1.default)());
app.set("view engine", "ejs");
app.use("/src", express_1.default.static("src"));
app.use("/node_modules", express_1.default.static("node_modules"));
app.use("/dist", express_1.default.static("dist"));
app.use("/", routes_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map