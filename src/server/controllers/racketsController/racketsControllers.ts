import { type NextFunction, type Response } from "express";
import Racket from "../../../database/models/Racket.js";
import CustomError from "../../../CustomError/CustomError.js";
import {
  type RacketStructure,
  type AuthRequest,
  type AuthRequestWithBody,
} from "../../types.js";

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
  res: Response,
  next: NextFunction,
) => {
  try {
    const { racketId } = req.params;

    await Racket.findByIdAndDelete(racketId).exec();

    res.status(200).json({ message: "Success, racket deleted!" });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not delete racket",
    );

    next(customError);
  }
};

export const addRacket = async (
  req: AuthRequestWithBody,
  res: Response,
  next: NextFunction,
) => {
  try {
    const racket = req.body;
    const _id = req.userId;

    const newRacket = await Racket.create({
      ...racket,
      user: _id,
    });

    res.status(201).json({ racket: newRacket });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Could not create the racket",
    );

    next(customError);
  }
};

export const getRacketById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const { racketId } = req.params;

  try {
    const racket = await Racket.findById(racketId).exec();

    res.status(200).json({ racket });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      404,
      "Can't retrieve the racket",
    );

    next(customError);
  }
};
