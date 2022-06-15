// expressjs imports
import { Request, Response, NextFunction } from "express";

export const authenticateStudent = (
  _req: Request,
  _res: Response,
  _next: NextFunction
): void => {
  try {
    if ("accessToken" in _req.cookies) {
      _next();
    } else {
      throw new Error(`Unauthorized access!`);
    }
  } catch (error) {
    _res.status(500).send(`${error}!`);
  }
};
