"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// expressjs app
const www_1 = __importDefault(require("./www"));
const dotenv = require("dotenv");
dotenv.config();
// port number
const port = process.env.PORT;
// socket io conf
const http = require("http").Server(www_1.default);
const io = require("socket.io")(http);
var countUserPresence = 0;
io.on("connection", (socket) => {
    console.log("A user connected");
    countUserPresence += 1;
    socket.on("disconnect", () => {
        console.log("user disconnected");
        countUserPresence -= 1;
        if (countUserPresence == 0) {
            console.log("Zero users present");
        }
    });
});
www_1.default.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map