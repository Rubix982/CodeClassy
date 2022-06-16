"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// expressjs import
const express_1 = __importDefault(require("express"));
// middleware to authenticate users
const index_1 = require("./../middleware/index");
// controller logic
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.get("/:assignmentID/:modelID", index_1.authenticateStudent, controllers_1.editorPage);
router.use(controllers_1.errorPage);
exports.default = router;
//# sourceMappingURL=index.js.map