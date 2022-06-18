import path from "path";
import { Request, Response, NextFunction } from "express";
import EditorResponseDataDTO from "../src/ts/EditorResponseDataDTO";
import { getCodingPageData } from "./../api/index";

export const editorPage = async (_req: Request, _res: Response) => {
  const data: EditorResponseDataDTO = await getCodingPageData({
    request: _req,
    response: _res,
  });

  if (new Date() > new Date(data.assignmentDueDate)) {
    _res.render(path.join(__dirname, "../../pages/late"));
  } else {
    _res.render(path.join(__dirname, "../../pages/index"), {
      assignmentID: _req.params.assignmentID,
      modelID: _req.params.modelID,
      data: data,
    });
  }
};

export const errorPage = (
  _req: Request,
  _res: Response,
  _next: NextFunction
): void => {
  _res.status(404);

  // respond with html page
  if (_req.accepts("html")) {
    _res.render(path.join(__dirname, "../../pages/error"), { url: _req.url });
    return;
  }

  // respond with json
  if (_req.accepts("json")) {
    _res.json({ error: "Not found" });
    return;
  }

  // default to plain-text. send()
  _res.type("txt").send("Not found");
};
