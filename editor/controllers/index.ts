import path from "path";
import { Request, Response, NextFunction } from "express";
import ejs from "ejs";
import EditorResponseDataDTO from "../src/ts/EditorResponseDataDTO";
import { getCodingPageData } from "./../api/index";
import { simpleStringify } from "../utils";

export const editorPage = async (_req: Request, _res: Response) => {
  const data: EditorResponseDataDTO = await getCodingPageData({
    request: _req,
    response: _res,
  });

  if (new Date() > new Date(data.assignmentDueDate)) {
    _res.render(path.join(__dirname, "../../pages/late"));
  } else {
    _res.send(
      await ejs.renderFile(
        path.join(__dirname, "../../pages/index.ejs"),
        {
          assignmentID: _req.params.assignmentID,
          modelID: _req.params.modelID,
          data: data,
          _res: simpleStringify(_res),
          _req: simpleStringify(_req),
        },
        { async: true }
      )
    );
  }
};

export const errorPage = (
  _req: Request,
  _res: Response,
  _next: NextFunction
): void => {
  _res.status(404);

  if (_req.accepts("html")) {
    _res.render(path.join(__dirname, "../../pages/error"), { url: _req.url });
    return;
  }

  if (_req.accepts("json")) {
    _res.json({ error: "Not found" });
    return;
  }

  _res.type("txt").send("Not found");
};
