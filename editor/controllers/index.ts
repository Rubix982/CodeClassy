import path from "path";
import { Request, Response } from "express";

export const editorPage = (_req: Request, _res: Response) => {
  _res.render(path.join(__dirname, "../../pages/index"), {
    assignmentID: _req.params.assignmentID,
    modelID: _req.params.modelID,
  });
};
