import { type NextFunction, type Response } from "express";
import firebaseApp from "../server/firebase";
import CustomError from "../CustomError/CustomError.js";
import admin from "firebase-admin";
import User from "../database/models/User.js";
import { type AuthRequest, type UserStructure } from "../server/type.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Unauthorized", 401, "Not token provider");
      next(error);

      return;
    }

    const { uid } = await admin.auth(firebaseApp).verifyIdToken(token);

    const user = await User.findOne<UserStructure>({ authId: uid });

    if (!user) {
      const userError = new CustomError("Id not found", 404, "Id not found");
      next(userError);

      return;
    }

    req.userId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      "Invalid token",
      401,
      (error as Error).message,
    );
    next(customError);
  }
};

export default auth;
