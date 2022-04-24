import { NextFunction, Request, Response } from "express";

export const asyncHandler = (callback: Function) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(callback(req, res, next)).catch(next);
};
