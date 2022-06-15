"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editorPage = void 0;
const path_1 = __importDefault(require("path"));
const editorPage = (_req, _res) => {
    _res.render(path_1.default.join(__dirname, "../../pages/index"), {
        assignmentID: _req.params.assignmentID,
        modelID: _req.params.modelID,
    });
};
exports.editorPage = editorPage;
//# sourceMappingURL=index.js.map