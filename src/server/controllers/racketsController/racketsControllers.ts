import { type NextFunction, type Response } from "express";
import Racket from "../../../database/models/Racket.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type RacketStructure, type AuthRequest } from "../../types.js";

export const getRackets = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const _id = req.userId;

    const rackets = await Racket.find<RacketStructure[]>({ user: _id })
      .limit(10)
      .exec();

    res.status(200).json({ rackets });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve rackets",
    );

    next(customError);
  }
};

export const deleteRacket = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { racketId } = req.params;
    await Racket.findByIdAndDelete(racketId).exec();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not delete racket",
    );

    next(customError);
  }
};
