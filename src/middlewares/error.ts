import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../CustomError/CustomError.js";

export const endpointNotFound = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newCustomError = new CustomError(
    "Error, endpoint not found",
    404,
    "Error, endpoint not found",
  );

  next(newCustomError);
};

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorMessage = error.message || "Internal server error";
  const errorStatusCode = error.statusCode || 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
