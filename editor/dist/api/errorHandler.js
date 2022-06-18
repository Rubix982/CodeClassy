"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const path_1 = __importDefault(require("path"));
const errorHandler = ({ error, response, }) => {
    //! TODO: Use a logger library to log the errors from here
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if (error.response.status == 400) {
            response.render(path_1.default.join(__dirname, "../../pages/unauthorized"));
        }
    }
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
    }
    else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message);
    }
    // console.log(error.config);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map