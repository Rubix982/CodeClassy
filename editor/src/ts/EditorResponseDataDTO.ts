class TestCase {
  in: string;
  out: string;
}

export default class EditorResponseDataDTO {
  assignmentName: string;
  assignmentDueDate: string;
  assignmentCreatedOn: string;
  isAssignmentSubmitted: boolean;
  codingQuestionTitle: string;
  codingQuestionBody: string;
  fullName: string;
  testCases: TestCase[];

  constructor({
    assignmentName,
    assignmentDueDate,
    assignmentCreatedOn,
    isAssignmentSubmitted,
    codingQuestionTitle,
    codingQuestionBody,
    fullName,
    testCases,
  }: {
    assignmentName: string;
    assignmentDueDate: string;
    assignmentCreatedOn: string;
    isAssignmentSubmitted: boolean;
    codingQuestionTitle: string;
    codingQuestionBody: string;
    fullName: string;
    testCases: TestCase[];
  }) {
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
