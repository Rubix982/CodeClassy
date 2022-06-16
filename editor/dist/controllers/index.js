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
exports.errorPage = exports.editorPage = void 0;
const path_1 = __importDefault(require("path"));
const API_1 = __importDefault(require("../src/ts/API"));
const editorPage = (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    const api = new API_1.default();
    console.log(api);
    // const results = await api.get(
    //   `attempt/${_req.params.assignmentID}/${_req.params.modelID}`
    // );
    // console.log(results);
    _res.render(path_1.default.join(__dirname, "../../pages/index"), {
        assignmentID: _req.params.assignmentID,
        modelID: _req.params.modelID,
    });
});
exports.editorPage = editorPage;
const errorPage = (_req, _res, _next) => {
    _res.status(404);
    // respond with html page
    if (_req.accepts("html")) {
        _res.render(path_1.default.join(__dirname, "../../pages/error"), { url: _req.url });
        return;
    }
    // respond with json
    if (_req.accepts("json")) {
        _res.json({ error: "Not found" });
        return;
    }
    // default to plain-text. send()
    _res.type("txt").send("Not found");
};
exports.errorPage = errorPage;
//# sourceMappingURL=index.js.map