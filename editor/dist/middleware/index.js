"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateStudent = void 0;
const authenticateStudent = (_req, _res, _next) => {
    try {
        if ("accessToken" in _req.cookies) {
            _next();
        }
        else {
            throw new Error(`Unauthorized access!`);
        }
    }
    catch (error) {
        _res.status(500).send(`${error}!`);
    }
};
exports.authenticateStudent = authenticateStudent;
//# sourceMappingURL=index.js.map