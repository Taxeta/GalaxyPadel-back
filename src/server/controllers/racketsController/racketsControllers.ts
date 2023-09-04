import { type NextFunction, type Request, type Response } from "express";
import Racket from "../../../database/models/Racket.js";
import CustomError from "../../../CustomError/CustomError.js";

export const getRackets = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const rackets = await Racket.find().limit(10).exec();

    res.status(200).json({ rackets });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve rackets",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};
