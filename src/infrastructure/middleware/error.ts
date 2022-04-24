import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { NODE_ENV_STRING, PRODUCTION } from "../../config/const";

export const errorHandler: ErrorRequestHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: NODE_ENV_STRING === PRODUCTION ? null : err.stack,
  });
};
