import { type NextFunction, type Response } from "express";
import firebaseApp from "../../server/firebase.js";
import CustomError from "../../CustomError/CustomError.js";
import admin from "firebase-admin";
import User from "../../database/models/User.js";
import { type AuthRequest } from "../../server/types.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Not token provider", 401, "Unauthorized");

      next(error);

      return;
    }

    const { uid, name } = await admin.auth(firebaseApp).verifyIdToken(token);

    let user = await User.findOne({ authId: uid }).exec();

    if (!user) {
      const displayName = name ? (name as string) : "DefaultName";

      const newUser = new User({
        authId: uid,
        displayName,
      });
      await newUser.save();
      user = newUser;
    } else if (name) {
      user.displayName = name as string;

      await user.save();
    }

    req.userId = user?._id;
    req.displayName = user?.displayName;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      403,
      "Invalid token",
    );

    next(customError);
  }
};

export default auth;
