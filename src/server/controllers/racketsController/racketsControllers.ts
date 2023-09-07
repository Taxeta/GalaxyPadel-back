import { type NextFunction, type Response } from "express";
import Racket from "../../../database/models/Racket.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type RacketStructure, type AuthRequest } from "../../type.js";

export const getRackets = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const _id = req.userId;

    const rackets = await Racket.find<RacketStructure[]>({ user: _id })
      .limit(10)
      .exec();

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
