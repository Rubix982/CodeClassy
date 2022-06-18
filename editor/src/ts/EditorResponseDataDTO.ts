export default class EditorResponseDataDTO {
  assignmentName: string;
  assignmentDueDate: string;
  assignmentCreatedOn: string;
  codingQuestionTitle: string;
  codingQuestionBody: string;

  constructor({
    assignmentName,
    assignmentDueDate,
    assignmentCreatedOn,
    codingQuestionTitle,
    codingQuestionBody,
  }: {
    assignmentName: string;
    assignmentDueDate: string;
    assignmentCreatedOn: string;
    codingQuestionTitle: string;
    codingQuestionBody: string;
  }) {
    this.assignmentName = assignmentName;
    this.assignmentDueDate = assignmentDueDate;
    this.assignmentCreatedOn = assignmentCreatedOn;
    this.codingQuestionBody = codingQuestionBody;
    this.codingQuestionTitle = codingQuestionTitle;
  }
}
