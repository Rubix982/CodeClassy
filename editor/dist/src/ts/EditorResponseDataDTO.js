"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCase {
}
class EditorResponseDataDTO {
    constructor({ assignmentName, assignmentDueDate, assignmentCreatedOn, isAssignmentSubmitted, codingQuestionTitle, codingQuestionBody, fullName, testCases, }) {
        this.assignmentName = assignmentName;
        this.assignmentDueDate = assignmentDueDate;
        this.assignmentCreatedOn = assignmentCreatedOn;
        this.isAssignmentSubmitted = isAssignmentSubmitted;
        this.codingQuestionBody = codingQuestionBody;
        this.codingQuestionTitle = codingQuestionTitle;
        this.fullName = fullName;
        this.testCases = testCases;
    }
}
exports.default = EditorResponseDataDTO;
//# sourceMappingURL=EditorResponseDataDTO.js.map