import path from "path";
import { Request, Response, NextFunction } from "express";
import API from "../src/ts/API";

export const editorPage = async (_req: Request, _res: Response) => {
  const api = new API();
  console.log(api);
  // const results = await api.get(
  //   `attempt/${_req.params.assignmentID}/${_req.params.modelID}`
  // );
  // console.log(results);

  _res.render(path.join(__dirname, "../../pages/index"), {
    assignmentID: _req.params.assignmentID,
    modelID: _req.params.modelID,
  });
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
