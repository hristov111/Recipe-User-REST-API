import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("We have errors");
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
