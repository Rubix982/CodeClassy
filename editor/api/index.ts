import { errorHandler } from "./errorHandler";
import API from "../src/ts/API";
import { Request, Response } from "express";
import EditorResponseDataDTO from "../src/ts/EditorResponseDataDTO";
import AssignmentSubmissionResponseDTO from "../src/ts/AssignmentSubmissionResponseDTO";

export const getCodingPageData = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}): Promise<EditorResponseDataDTO> => {
  try {
    const api = API.getInstance({ _req: request });
    const results = await api.get(
      `attempt/${request.params.assignmentID}/${request.params.modelID}`
    );

    return new EditorResponseDataDTO({
      assignmentName: results.data.results[0].assignmentName,
      assignmentDueDate: results.data.results[0].assignmentDueDate,
      assignmentCreatedOn: results.data.results[0].assignmentCreatedOn,
      isAssignmentSubmitted: results.data.results[0].isAssignmentSubmitted,
      codingQuestionTitle: results.data.results[0].codingQuestionTitle,
      codingQuestionBody: results.data.results[0].codingQuestionBody,
      fullName: results.data.fullName,
      testCases: results.data.results[0].testCases,
    });
  } catch (error) {
    errorHandler({ error: error, response: response });
    return undefined;
  }
};

export const makeAssignmentSubmission = async ({
  request,
  response,
  code,
  language = "c",
}: {
  request: Request;
  response: Response;
  code: string;
  language: string;
}): Promise<any> => {
  try {
    const api = API.getInstance({ _req: request });
    const results = await api.post(`attempt/${request.params.assignmentID}`, {
      code,
      language,
    });

    return new AssignmentSubmissionResponseDTO({ msg: results.data.msg });
  } catch (error) {
    errorHandler({ error: error, response: response });
    return undefined;
  }
};
