import { Handler, NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ResponseCodes } from "../../config/responses";

export const validateInputHandler = (): Handler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationErrors = validationResult(req);
  
    if (validationErrors.isEmpty()) {
      next();
    } else {
      res.status(ResponseCodes.BAD_REQUEST)
        .json({ errors: validationErrors.array() });
    }
  };
};
