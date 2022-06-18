import { errorHandler } from "./errorHandler";
import API from "../src/ts/API";
import { Request, Response } from "express";
import EditorResponseDataDTO from "../src/ts/EditorResponseDataDTO";

export const getCodingPageData = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}): Promise<EditorResponseDataDTO> => {
  try {
    const api = new API();
    const results = await api.get(
      `attempt/${request.params.assignmentID}/${request.params.modelID}`,
      request
    );

    return new EditorResponseDataDTO({
      assignmentName: results.data.results[0].assignmentName,
      assignmentDueDate: results.data.results[0].assignmentDueDate,
      assignmentCreatedOn: results.data.results[0].assignmentCreatedOn,
      codingQuestionTitle: results.data.results[0].codingQuestionTitle,
      codingQuestionBody: results.data.results[0].codingQuestionBody,
    });
  } catch (error) {
    errorHandler({ error: error, response: response });
    return undefined;
  }
};
