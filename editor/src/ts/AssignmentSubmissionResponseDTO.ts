export default class AssignmentSubmissionResponseDTO {
  msg: string;

  constructor({ msg }: { msg: string }) {
    this.msg = msg;
  }
}
