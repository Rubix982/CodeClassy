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
exports.makeAssignmentSubmission = exports.getCodingPageData = void 0;
const errorHandler_1 = require("./errorHandler");
const API_1 = __importDefault(require("../src/ts/API"));
const EditorResponseDataDTO_1 = __importDefault(require("../src/ts/EditorResponseDataDTO"));
const AssignmentSubmissionResponseDTO_1 = __importDefault(require("../src/ts/AssignmentSubmissionResponseDTO"));
const getCodingPageData = ({ request, response, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api = API_1.default.getInstance({ _req: request });
        const results = yield api.get(`attempt/${request.params.assignmentID}/${request.params.modelID}`);
        return new EditorResponseDataDTO_1.default({
            assignmentName: results.data.results[0].assignmentName,
            assignmentDueDate: results.data.results[0].assignmentDueDate,
            assignmentCreatedOn: results.data.results[0].assignmentCreatedOn,
            isAssignmentSubmitted: results.data.results[0].isAssignmentSubmitted,
            codingQuestionTitle: results.data.results[0].codingQuestionTitle,
            codingQuestionBody: results.data.results[0].codingQuestionBody,
            fullName: results.data.fullName,
            testCases: results.data.results[0].testCases,
        });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error: error, response: response });
        return undefined;
    }
});
exports.getCodingPageData = getCodingPageData;
const makeAssignmentSubmission = ({ request, response, code, language = "c", }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api = API_1.default.getInstance({ _req: request });
        const results = yield api.post(`attempt/${request.params.assignmentID}`, {
            code,
            language,
        });
        return new AssignmentSubmissionResponseDTO_1.default({ msg: results.data.msg });
    }
    catch (error) {
        (0, errorHandler_1.errorHandler)({ error: error, response: response });
        return undefined;
    }
});
exports.makeAssignmentSubmission = makeAssignmentSubmission;
//# sourceMappingURL=index.js.map